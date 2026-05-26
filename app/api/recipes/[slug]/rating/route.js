import { createHash } from 'crypto'
import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/write-client'
import { defineQuery } from 'next-sanity'

const RATING_SALT = process.env.RATING_SALT || 'on-the-stove-rating-salt-v1'

function hashIP(ip) {
  return createHash('sha256').update(ip + RATING_SALT).digest('hex')
}

function hashBrowserId(browserId) {
  if (!browserId || typeof browserId !== 'string') return null
  return createHash('sha256').update(browserId + RATING_SALT).digest('hex')
}

function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIP = request.headers.get('x-real-ip')
  if (realIP) return realIP
  return '127.0.0.1'
}

async function getExistingVote(recipeId, ipHash, browserHash) {
  const result = await client.fetch(
    defineQuery(`*[
      _type == "rating" &&
      recipe._ref == $recipeId &&
      (ipHash == $ipHash || ($browserHash != null && browserHash == $browserHash))
    ][0]{
      _id,
      value
    }`),
    { recipeId, ipHash, browserHash }
  )
  return result
}

async function getRecipeRatings(slug) {
  const result = await client.fetch(
    defineQuery(`*[_type == "recipe" && slug.current == $slug][0]{
      "ratingCount": coalesce(ratingCount, 0),
      "ratingTotal": coalesce(ratingTotal, 0),
      "ratingBreakdown": coalesce(ratingBreakdown, {})
    }`),
    { slug }
  )
  return result
}

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const ipHash = hashIP(getClientIP(request))
    const browserHash = hashBrowserId(request.headers.get('x-rating-browser-id'))

    const recipe = await getRecipeBySlug(slug)
    if (!recipe) {
      return Response.json({ error: 'Recipe not found' }, { status: 404 })
    }

    const ratings = await getRecipeRatings(slug)
    const existingVote = await getExistingVote(recipe._id, ipHash, browserHash)

    const average = ratings.ratingCount > 0
      ? Math.round((ratings.ratingTotal / ratings.ratingCount) * 10) / 10
      : 0

    return Response.json({
  average,
  count: ratings.ratingCount,
  userVote: existingVote ? existingVote.value : null,
  ratingBreakdown: ratings.ratingBreakdown || {},
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
    const { value, browserId } = body
    

    // Validate rating value
    if (!value || !Number.isInteger(value) || value < 1 || value > 5) {
      return Response.json(
        { error: 'Rating must be an integer between 1 and 5' },
        { status: 400 }
      )
    }

    const ipHash = hashIP(getClientIP(request))
    const browserHash = hashBrowserId(browserId)
    const recipe = await getRecipeBySlug(slug)

    if (!recipe) {
      return Response.json({ error: 'Recipe not found' }, { status: 404 })
    }

    // Check if this IP has already voted
    const existingVote = await getExistingVote(recipe._id, ipHash, browserHash)
    if (existingVote) {
      return Response.json(
        { error: 'You have already rated this recipe' },
        { status: 409 }
      )
    }

    // Create the rating document
    await writeClient.create({
      _type: 'rating',
      recipe: { _ref: recipe._id, _type: 'reference' },
      value,
      ipHash,
      browserHash,
      createdAt: new Date().toISOString(),
    })

    // Single atomic operation
    const updatedRecipe = await writeClient
      .patch(recipe._id)
      .setIfMissing({ 
        ratingTotal: 0,
        ratingCount: 0,
        ratingBreakdown: { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 }
      })
      .inc({
        ratingTotal: value,
        ratingCount: 1,
        [`ratingBreakdown.star${value}`]: 1,
      })
      .commit({ visibility: 'sync' })

    console.log('Updated recipe:', updatedRecipe.ratingCount, updatedRecipe.ratingTotal)

    const newAverage = Math.round(((updatedRecipe.ratingTotal || 0) / (updatedRecipe.ratingCount || 1)) * 10) / 10

    return Response.json({
      success: true,
      average: newAverage || 0,
      count: updatedRecipe.ratingCount || 0,
      userVote: value,
    })
  } catch (error) {
    console.error('Error submitting rating:', error)
    return Response.json({ 
      error: 'Failed to submit rating',
      details: error.message,
    }, { status: 500 })
  }
}