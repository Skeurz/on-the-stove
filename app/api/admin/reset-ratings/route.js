import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

function isLocalhost(request) {
  const host = request.headers.get('host') || ''
  return host.startsWith('localhost') || host.startsWith('127.0.0.1')
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function POST(request) {
  if (!isLocalhost(request)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Delete all rating documents
  const ratings = await client.fetch(`*[_type == "rating"]{ _id }`)
  for (const rating of ratings) await client.delete(rating._id)

  // Reset rating fields on all recipes
  const recipes = await client.fetch(`*[_type == "recipe" && ratingCount > 0]{ _id }`)
  for (const recipe of recipes) {
    await client.patch(recipe._id).set({
      ratingTotal: 0,
      ratingCount: 0,
      ratingBreakdown: { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 },
    }).commit()
  }

  return NextResponse.json({
    ratingsDeleted: ratings.length,
    recipesReset: recipes.length,
  })
}