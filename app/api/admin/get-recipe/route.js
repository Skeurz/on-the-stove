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
  videoUrl, ingredients, steps, helpfulTips, variations, veganAdaptation,
  storageTips, faqs,
  "mainImageUrl": mainImage.asset->url,
  "secondaryImageUrl": secondaryImage.asset->url,
  "preparationImages": preparationImages[]{
    stepNumber, caption, _key,
    "imageUrl": image.asset->url
  },
  seoTitle, seoDescription
       }`,
    { title: title.trim() }
  )

  if (results.length === 0) return NextResponse.json({ found: null })
  return NextResponse.json({ found: results[0] })
}
