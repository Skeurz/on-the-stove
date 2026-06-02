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

  const { title } = await request.json()
  if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 })

  const results = await client.fetch(
    `*[_type == "recipe" && lower(title) == lower($title)]{
  _id, title, "slug": slug.current, description, category, cuisine, tags,
  featured, publishedAt, difficulty, prepTime, cookTime, servings, calories,
  "caloriesPerServing": coalesce(caloriesPerServing, calories),
  videoUrl, ingredients,
  "steps": steps[]{ _key, title, description, "text": coalesce(text, description) },
  "helpfulTips": helpfulTips[]{ _key, title, description, "text": coalesce(text, description) },
  "variations": select(defined(easyVariations) => easyVariations[]{ _key, title, description, "text": coalesce(text, description) }, variations[]{ _key, title, description, "text": coalesce(text, description) }),
  "veganAdaptation": coalesce(veganAdaptation, select(defined(howToMakeVegan) => [howToMakeVegan], [])),
  storageTips, faqs,
  "preparationImages": select(defined(preparationImages) => preparationImages[]{ _key, stepNumber, caption }, prepPhotos[]{ _key, stepNumber, caption }),
  seoTitle, seoDescription
}`,
    { title: title.trim() }
  )

  if (results.length === 0) return NextResponse.json({ found: null })
  return NextResponse.json({ found: results[0] })
}
