import { client } from '@/sanity/lib/client'

export async function GET(req) {
  const host = req.headers.get('host') || ''
  if (!host.includes('localhost')) return Response.json({ error: 'Forbidden' }, { status: 403 })

  const recipes = await client.fetch(`
  *[_type == "recipe"] | order(publishedAt desc) {
    _id, title, publishedAt, featured,
    ratingTotal, ratingCount,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url
  }
`)
console.log('first recipe slug:', recipes[0]?.slug)
return Response.json({ recipes })
}