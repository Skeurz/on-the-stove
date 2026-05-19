import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { searchRecipeSuggestions } from '@/sanity/lib/queries'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim() || ''

  if (query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  const suggestions = await client.fetch(searchRecipeSuggestions, {
    term: `*${query}*`,
  })

  return NextResponse.json({
    suggestions: suggestions.map((suggestion) => ({
      _id: suggestion._id,
      title: suggestion.title,
      slug: suggestion.slug,
      category: suggestion.category,
      imageUrl: suggestion.mainImage
        ? urlFor(suggestion.mainImage).width(80).height(80).url()
        : null,
    })),
  })
}
