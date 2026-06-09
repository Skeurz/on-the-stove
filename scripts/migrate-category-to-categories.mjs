// scripts/migrate-category-to-categories.js
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

const docs = await client.fetch(`*[_type == "recipe" && defined(category)]{ _id, category }`)
for (const doc of docs) {
  await client.patch(doc._id).set({ categories: [doc.category] }).unset(['category']).commit()
  console.log(`Migrated: ${doc._id}`)
}
console.log('Done')