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
    const { _id, ...body } = await request.json()
    if (!_id) return NextResponse.json({ error: 'Missing _id' }, { status: 400 })
    const variations = body.variations || body.easyVariations || []
    const preparationImages = body.preparationImages || body.prepPhotos || []

    const patch = {
      title: body.title,
      slug: { _type: 'slug', current: body.slug },
      description: body.description || body.shortDescription,
      category: body.category,
      cuisine: body.cuisine,
      tags: body.tags || [],
      featured: body.featured || false,
      publishedAt: body.publishedAt,
      difficulty: body.difficulty,
      prepTime: body.prepTime ? Number(body.prepTime) : undefined,
      cookTime: body.cookTime ? Number(body.cookTime) : undefined,
      servings: body.servings ? Number(body.servings) : undefined,
      calories: body.calories ? Number(body.calories) : body.caloriesPerServing ? Number(body.caloriesPerServing) : undefined,
      videoUrl: body.videoUrl,
      ingredients: body.ingredients || [],
      steps: (body.steps || []).map((s, i) => ({
        _type: 'object', _key: s._key || `step_${i}`, title: s.title, description: s.description || s.text,
      })),
      helpfulTips: (body.helpfulTips || []).map((t, i) => ({
        _type: 'object', _key: t._key || `tip_${i}`, title: t.title, description: t.description || t.text,
      })),
      variations: variations.map((v, i) => ({
        _type: 'object', _key: v._key || `var_${i}`, title: v.title, description: v.description || v.text,
      })),
      veganAdaptation: body.veganAdaptation || (body.howToMakeVegan ? [body.howToMakeVegan] : []),
      storageTips: (body.storageTips || []).map((s, i) => ({
        _type: 'storageTip', _key: s._key || `storage_${i}`, method: s.method, duration: s.duration, notes: s.notes,
      })),
      faqs: (body.faqs || []).map((f, i) => ({
        _type: 'faq', _key: f._key || `faq_${i}`, question: f.question, answer: f.answer,
      })),
      preparationImages: preparationImages.map((p, i) => ({
        _type: 'object', _key: p._key || `prep_${i}`, stepNumber: p.stepNumber ? Number(p.stepNumber) : undefined, caption: p.caption,
      })),
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
    }

    // Remove undefined
    Object.keys(patch).forEach(k => patch[k] === undefined && delete patch[k])

    await client.patch(_id).set(patch).commit()

    return NextResponse.json({ success: true, id: _id, slug: body.slug })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
