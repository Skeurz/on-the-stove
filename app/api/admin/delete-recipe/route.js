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

  const { title, dryRun } = await request.json()

  if (!title?.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  const found = await client.fetch(
    `*[_type == "recipe" && lower(title) == lower($title)]{ _id, title }`,
    { title: title.trim() }
  )

  // Dry run — just return what was found
  if (dryRun) {
    return NextResponse.json({ found })
  }

  // Delete recipes
  for (const recipe of found) {
    await client.delete(recipe._id)
  }

  // Delete associated ratings
  const ratings = await client.fetch(
    `*[_type == "rating" && recipe._ref in $ids]{ _id }`,
    { ids: found.map(r => r._id) }
  )
  for (const rating of ratings) {
    await client.delete(rating._id)
  }

  return NextResponse.json({
    deleted: found.length,
    ratingsDeleted: ratings.length,
  })
}