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

  const recipes = await client.fetch(`*[_type == "recipe"]{ _id }`)
  const ratings = await client.fetch(`*[_type == "rating"]{ _id }`)

  for (const rating of ratings) await client.delete(rating._id)
  for (const recipe of recipes) await client.delete(recipe._id)

  return NextResponse.json({
    deleted: recipes.length,
    ratingsDeleted: ratings.length,
  })
}