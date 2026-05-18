import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function extractStructure(title, bodyBlocks) {
  // Convert body blocks to plain text
  const plainText = bodyBlocks
    .map(block => block.children?.map(c => c.text).join('') || '')
    .join('\n')

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `You are a recipe parser. Extract structured data from this recipe post.

Title: ${title}
Content: ${plainText}

Return ONLY a JSON object with these fields (no markdown, no backticks):
{
  "description": "A 2-3 sentence enticing description of the dish",
  "prepTime": number (minutes, or null if not found),
  "cookTime": number (minutes, or null if not found),
  "servings": number (or null if not found),
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "steps": ["step 1", "step 2", ...]
}

If ingredients or steps are not clearly present in the content, return empty arrays.`
    }]
  })

  const text = response.content[0].text.trim()
  return JSON.parse(text)
}

async function run() {
  // Fetch all recipes that have body content but no ingredients
  const recipes = await sanity.fetch(`
    *[_type == "recipe" && defined(body) && (!defined(ingredients) || count(ingredients) == 0)] {
      _id, title, body
    }
  `)

  console.log(`Found ${recipes.length} recipes to process`)

  for (const recipe of recipes) {
    console.log(`Processing: ${recipe.title}`)
    try {
      const structured = await extractStructure(recipe.title, recipe.body)

      await sanity.patch(recipe._id).set({
        description: structured.description || '',
        prepTime: structured.prepTime || null,
        cookTime: structured.cookTime || null,
        servings: structured.servings || null,
        ingredients: structured.ingredients || [],
        steps: structured.steps || [],
      }).commit()

      console.log(`✅ Structured: ${recipe.title}`)
      console.log(`   → ${structured.ingredients.length} ingredients, ${structured.steps.length} steps`)

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500))

    } catch (err) {
      console.error(`❌ Failed: ${recipe.title}`, err.message)
    }
  }

  console.log('Done!')
}

run()