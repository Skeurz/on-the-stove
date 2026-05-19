import { createHash } from 'crypto'
import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/write-client'
import { defineQuery } from 'next-sanity'

const RATING_SALT = process.env.RATING_SALT || 'on-the-stove-rating-salt-v1'

function hashIP(ip) {
  return createHash('sha256').update(ip + RATING_SALT).digest('hex')
}

function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIP = request.headers.get('x-real-ip')
  if (realIP) return realIP
  return '127.0.0.1'
}

async function getExistingVote(recipeId, ipHash) {
  const result = await client.fetch(
    defineQuery(`*[_type == "rating" && recipe._ref == $recipeId && ipHash == $ipHash][0]{
      _id,
      value
    }`),
    { recipeId, ipHash }
  )
  return result
}

async function getRecipeRatings(slug) {
  const result = await client.fetch(
    defineQuery(`*[_type == "recipe" && slug.current == $slug][0]{
      "ratingCount": coalesce(ratingCount, 0),
      "ratingTotal": coalesce(ratingTotal, 0)
    }`),
    { slug }
  )
  return result
}

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const ipHash = hashIP(getClientIP(request))

    const recipe = await getRecipeBySlug(slug)
    if (!recipe) {
      return Response.json({ error: 'Recipe not found' }, { status: 404 })
    }

    const ratings = await getRecipeRatings(slug)
    const existingVote = await getExistingVote(recipe._id, ipHash)

    const average = ratings.ratingCount > 0
      ? Math.round((ratings.ratingTotal / ratings.ratingCount) * 10) / 10
      : 0

    return Response.json({
      average,
      count: ratings.ratingCount,
      userVote: existingVote ? existingVote.value : null,
    })
  } catch (error) {
    console.error('Error fetching rating:', error)
    return Response.json({ error: 'Failed to fetch rating' }, { status: 500 })
  }
}

async function getRecipeBySlug(slug) {
  return client.fetch(
    defineQuery(`*[_type == "recipe" && slug.current == $slug][0]{ _id }`),
    { slug }
  )
}

export async function POST(request, { params }) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { value } = body

    // Validate rating value
    if (!value || !Number.isInteger(value) || value < 1 || value > 5) {
      return Response.json(
        { error: 'Rating must be an integer between 1 and 5' },
        { status: 400 }
      )
    }

    const ipHash = hashIP(getClientIP(request))
    const recipe = await getRecipeBySlug(slug)

    if (!recipe) {
      return Response.json({ error: 'Recipe not found' }, { status: 404 })
    }

    // Check if this IP has already voted
    const existingVote = await getExistingVote(recipe._id, ipHash)
    if (existingVote) {
      return Response.json(
        { error: 'You have already rated this recipe' },
        { status: 409 }
      )
    }

    // Create the rating document
    const ratingDoc = await writeClient.create({
      _type: 'rating',
      recipe: { _ref: recipe._id, _type: 'reference' },
      value,
      ipHash,
      createdAt: new Date().toISOString(),
    })

    // Update recipe aggregate fields
    const recipeDoc = await client.fetch(
      defineQuery(`*[_type == "recipe" && _id == $id][0]{ ratingTotal, ratingCount }`),
      { id: recipe._id }
    )

    await writeClient
      .patch(recipe._id)
      .set({
        ratingTotal: (recipeDoc.ratingTotal || 0) + value,
        ratingCount: (recipeDoc.ratingCount || 0) + 1,
      })
      .commit()

    // Calculate new average
    const newTotal = (recipeDoc.ratingTotal || 0) + value
    const newCount = (recipeDoc.ratingCount || 0) + 1
    const newAverage = Math.round((newTotal / newCount) * 10) / 10

    return Response.json({
      success: true,
      average: newAverage,
      count: newCount,
      userVote: value,
    })
  } catch (error) {
    console.error('Error submitting rating:', error)
    return Response.json({ error: 'Failed to submit rating' }, { status: 500 })
  }
}