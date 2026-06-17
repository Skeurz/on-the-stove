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

  const { id } = await req.json()
  await client.delete(id)
  return Response.json({ ok: true })
}