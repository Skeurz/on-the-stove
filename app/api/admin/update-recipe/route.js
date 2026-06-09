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

async function resolveImage(val) {
  if (!val) return null
  if (typeof val === 'object' && val.assetId) {
    return { _type: 'image', asset: { _type: 'reference', _ref: val.assetId } }
  }
  if (typeof val === 'string' && val.startsWith('http')) {
    const res = await fetch(val)
    if (!res.ok) throw new Error(`Failed to fetch image: ${val}`)
    const buffer = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const asset = await client.assets.upload('image', Buffer.from(buffer), { contentType })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  }
  return null
}

export async function POST(request) {
  if (!isLocalhost(request)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const body = await request.json()
    const variations = body.variations || body.easyVariations || []
    const preparationImages = body.preparationImages || body.prepPhotos || []

    const [mainImage, secondaryImage] = await Promise.all([
      resolveImage(body.mainImageUrl),
      resolveImage(body.secondaryImageUrl),
    ])

    const doc = {
      _type: 'recipe',
      title: body.title,
      slug: { _type: 'slug', current: body.slug },
      description: body.description || body.shortDescription,
      categories: body.categories || [],
      cuisine: body.cuisine,
      tags: body.tags || [],
      featured: body.featured || false,
      publishedAt: body.publishedAt || new Date().toISOString(),
      difficulty: body.difficulty,
      prepTime: body.prepTime ? Number(body.prepTime) : undefined,
      cookTime: body.cookTime ? Number(body.cookTime) : undefined,
      servings: body.servings ? Number(body.servings) : undefined,
      calories: body.calories ? Number(body.calories) : body.caloriesPerServing ? Number(body.caloriesPerServing) : undefined,
      videoUrl: body.videoUrl,
      ...(mainImage && { mainImage }),
      ...(secondaryImage && { secondaryImage }),
      ingredients: body.ingredients || [],
      steps: (body.steps || []).map((s, i) => ({
        _type: 'object', _key: s._key || `step_${i}`,
        title: s.title, description: s.description || s.text,
      })),
      helpfulTips: (body.helpfulTips || []).map((t, i) => ({
        _type: 'object', _key: t._key || `tip_${i}`,
        title: t.title, description: t.description || t.text,
      })),
      variations: variations.map((v, i) => ({
        _type: 'object', _key: v._key || `var_${i}`,
        title: v.title, description: v.description || v.text,
      })),
      veganAdaptation: body.veganAdaptation || (body.howToMakeVegan ? [body.howToMakeVegan] : []),
      storageTips: (body.storageTips || []).map((s, i) => ({
        _type: 'object', _key: `storage_${i}`,
        method: s.method, duration: s.duration, notes: s.notes,
      })),
      faqs: (body.faqs || []).map((f, i) => ({
        _type: 'object', _key: `faq_${i}`,
        question: f.question, answer: f.answer,
      })),
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      preparationImages: await Promise.all(preparationImages.map(async (p, i) => {
        const image = await resolveImage(p.imageUrl)
        return {
          _type: 'object', _key: p._key || `prep_${i}`,
          stepNumber: p.stepNumber ? Number(p.stepNumber) : undefined,
          caption: p.caption,
          ...(image && { image }),
        }
      })),
    }

    Object.keys(doc).forEach(k => doc[k] === undefined && delete doc[k])
    const { _type, ...patch } = doc
    const result = await client.patch(body._id).set(patch).commit()
    return NextResponse.json({ success: true, id: result._id, slug: body.slug })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}