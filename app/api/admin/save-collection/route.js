import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function POST(req) {
  const host = req.headers.get('host') || ''
  if (!host.includes('localhost')) return Response.json({ error: 'Forbidden' }, { status: 403 })

  const { _id, title, slug, description, recipeIds } = await req.json()

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
  }

  if (_id) {
    const { _type, ...patch } = { _type: 'collection', ...doc }
    await client.patch(_id).set(patch).commit()
  } else {
    await client.create({ _type: 'collection', ...doc })
  }

  return Response.json({ ok: true })
}