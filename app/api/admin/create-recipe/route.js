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

  try {
    const body = await request.json()

    // Build the Sanity document
    const doc = {
      _type: 'recipe',
      title: body.title,
      slug: { _type: 'slug', current: body.slug },
      shortDescription: body.shortDescription,
      category: body.category,
      cuisine: body.cuisine,
      tags: body.tags || [],
      featured: body.featured || false,
      publishedAt: body.publishedAt || new Date().toISOString(),
      difficulty: body.difficulty,
      prepTime: body.prepTime ? Number(body.prepTime) : undefined,
      cookTime: body.cookTime ? Number(body.cookTime) : undefined,
      servings: body.servings ? Number(body.servings) : undefined,
      caloriesPerServing: body.caloriesPerServing ? Number(body.caloriesPerServing) : undefined,
      videoUrl: body.videoUrl,
      ingredients: body.ingredients || [],
      steps: (body.steps || []).map((s, i) => ({
        _type: 'step',
        _key: `step_${i}`,
        title: s.title,
        text: s.text,
      })),
      helpfulTips: (body.helpfulTips || []).map((t, i) => ({
        _type: 'tip',
        _key: `tip_${i}`,
        title: t.title,
        text: t.text,
      })),
      easyVariations: (body.easyVariations || []).map((v, i) => ({
        _type: 'variation',
        _key: `var_${i}`,
        title: v.title,
        text: v.text,
      })),
      howToMakeVegan: body.howToMakeVegan,
      storageTips: (body.storageTips || []).map((s, i) => ({
        _type: 'storageTip',
        _key: `storage_${i}`,
        method: s.method,
        duration: s.duration,
        notes: s.notes,
      })),
      faqs: (body.faqs || []).map((f, i) => ({
        _type: 'faq',
        _key: `faq_${i}`,
        question: f.question,
        answer: f.answer,
      })),
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      // Images are handled separately via Sanity asset upload
      // prepPhotos referenced by URL strings for now
      prepPhotos: (body.prepPhotos || []).map((p, i) => ({
        _type: 'prepPhoto',
        _key: `prep_${i}`,
        stepNumber: p.stepNumber,
        caption: p.caption,
      })),
    }

    // Remove undefined fields
    Object.keys(doc).forEach(k => doc[k] === undefined && delete doc[k])

    const result = await client.create(doc)

    return NextResponse.json({ success: true, id: result._id, slug: body.slug })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}