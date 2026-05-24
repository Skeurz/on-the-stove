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

async function migrate() {
  const recipes = await client.fetch(`
    *[_type == "recipe" && defined(tips) && count(tips) > 0]{
      _id, title, tips
    }
  `)

  console.log(`Found ${recipes.length} recipes with tips`)

  for (const recipe of recipes) {
    const firstTip = recipe.tips[0]
    
    // Check if tips are already in the new object format
    if (typeof firstTip === 'object' && firstTip.title !== undefined) {
      console.log(`✅ Already migrated: ${recipe.title}`)
      continue
    }

    // Convert string tips to objects
    const newTips = recipe.tips.map(tip => ({
      _type: 'object',
      _key: Math.random().toString(36).slice(2),
      title: tip,
      description: '',
    }))

    await client.patch(recipe._id).set({ tips: newTips }).commit()
    console.log(`✅ Migrated: ${recipe.title} (${newTips.length} tips)`)
  }

  console.log('Done!')
}

migrate()