import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function reset() {
  // Delete all rating documents
  const ratings = await client.fetch(`*[_type == "rating"]{ _id }`)
  console.log(`Found ${ratings.length} rating documents`)

  for (const rating of ratings) {
    await client.delete(rating._id)
  }
  console.log(`✅ Deleted ${ratings.length} rating documents`)

  // Reset all recipe rating fields
  const recipes = await client.fetch(`*[_type == "recipe" && ratingCount > 0]{ _id, title }`)
  console.log(`Found ${recipes.length} recipes with ratings`)

  for (const recipe of recipes) {
    await client.patch(recipe._id).set({
      ratingTotal: 0,
      ratingCount: 0,
      ratingBreakdown: { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 }
    }).commit()
    console.log(`✅ Reset: ${recipe.title}`)
  }

  console.log('All ratings reset to 0!')
}

reset()

// to run it (bash): node scripts/reset-ratings.js