import { client } from '@/sanity/lib/client'

const BASE_URL = 'https://onthestove.com'

export default async function sitemap() {
  // Fetch all published recipes
  const recipes = await client.fetch(`
    *[_type == "recipe"] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }
  `)

  const recipeUrls = recipes.map(recipe => ({
    url: `${BASE_URL}/${recipe.slug}`,
    lastModified: recipe._updatedAt || recipe.publishedAt || new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/category/lunch`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/category/dinner`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/category/breakfastnbrunch`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/category/snacksnsides`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/category/desserts`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/category/drinks-shakes`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  return [...staticPages, ...recipeUrls]
}