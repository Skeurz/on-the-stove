import { createClient } from '@sanity/client'

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

export async function POST(req) {
  const host = req.headers.get('host') || ''
  if (!host.includes('localhost')) return Response.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json().catch(() => null)
  if (!body) return Response.json({ error: 'Invalid JSON body' }, { status: 400 })

  const { _id, title, slug, description, recipeIds, coverImageUrl } = body

  const coverImage = await resolveImage(coverImageUrl)

  const doc = {
    title,
    slug: { _type: 'slug', current: slug },
    description,
    publishedAt: new Date().toISOString(),
    recipes: (recipeIds || []).map(id => ({
      _type: 'reference',
      _ref: id,
      _key: id,
    })),
    ...(coverImage && { coverImage }),
  }

  if (_id) {
    const { _type, ...patch } = { _type: 'collection', ...doc }
    await client.patch(_id).set(patch).commit()
  } else {
    await client.create({ _type: 'collection', ...doc })
  }

  return Response.json({ ok: true })
}