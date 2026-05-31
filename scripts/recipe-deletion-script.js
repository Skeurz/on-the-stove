import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import readline from 'readline'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(question, (answer) => { rl.close(); resolve(answer.trim()) })
  })
}

async function deleteByTitle(title) {
  console.log(`\n🔍  Searching for recipe: "${title}"...`)

  const results = await client.fetch(
    `*[_type == "recipe" && lower(title) == lower($title)]{ _id, title }`,
    { title }
  )

  if (results.length === 0) {
    console.log(`\n⚠️  No recipe found with the title "${title}".`)
    console.log('    Tip: title matching is case-insensitive but must be exact.\n')
    process.exit(0)
  }

  if (results.length > 1) {
    console.log(`\n⚠️  Found ${results.length} recipes with that title:`)
    results.forEach((r, i) => console.log(`    ${i + 1}. [${r._id}] ${r.title}`))
    console.log('    Deleting all of them...\n')
  } else {
    console.log(`\n✅  Found: [${results[0]._id}] ${results[0].title}`)
  }

  const confirm = await prompt(`\n   Delete ${results.length === 1 ? 'this recipe' : 'these ' + results.length + ' recipes'}? (yes/no): `)
  if (confirm.toLowerCase() !== 'yes') {
    console.log('\n   Aborted. Nothing was deleted.\n')
    process.exit(0)
  }

  for (const recipe of results) {
    await client.delete(recipe._id)
    console.log(`   🗑️  Deleted: ${recipe.title} (${recipe._id})`)
  }

  // Also delete associated rating documents
  const ratings = await client.fetch(
    `*[_type == "rating" && recipe._ref in $ids]{ _id }`,
    { ids: results.map((r) => r._id) }
  )
  for (const rating of ratings) {
    await client.delete(rating._id)
  }
  if (ratings.length > 0) {
    console.log(`   🗑️  Deleted ${ratings.length} associated rating document(s).`)
  }

  console.log(`\n✅  Done. ${results.length} recipe(s) deleted.\n`)
}

async function deleteAll() {
  console.log('\n🔍  Fetching all recipes...')

  const recipes = await client.fetch(`*[_type == "recipe"]{ _id, title }`)

  if (recipes.length === 0) {
    console.log('\n⚠️  No recipes found in the database.\n')
    process.exit(0)
  }

  console.log(`\n   Found ${recipes.length} recipe(s):`)
  recipes.forEach((r) => console.log(`    • ${r.title} (${r._id})`))

  const confirm = await prompt(
    `\n⚠️  This will PERMANENTLY delete all ${recipes.length} recipes and their ratings.\n   Type "DELETE ALL" to confirm: `
  )

  if (confirm !== 'DELETE ALL') {
    console.log('\n   Aborted. Nothing was deleted.\n')
    process.exit(0)
  }

  const ratings = await client.fetch(`*[_type == "rating"]{ _id }`)
  for (const rating of ratings) {
    await client.delete(rating._id)
  }
  if (ratings.length > 0) {
    console.log(`   🗑️  Deleted ${ratings.length} rating document(s).`)
  }

  for (const recipe of recipes) {
    await client.delete(recipe._id)
    console.log(`   🗑️  Deleted: ${recipe.title}`)
  }

  console.log(`\n✅  Done. All ${recipes.length} recipes deleted.\n`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)

  if (args.includes('--all')) {
    await deleteAll()
    return
  }

  const titleFlagIndex = args.indexOf('--title')
  if (titleFlagIndex !== -1) {
    const title = args[titleFlagIndex + 1]
    if (!title) {
      console.error('\n❌  Provide a title after --title, e.g.: --title "Pasta Bake"\n')
      process.exit(1)
    }
    await deleteByTitle(title)
    return
  }

  // Interactive mode
  console.log('\n🍳  On The Stove — Recipe Deletion Tool')
  console.log('────────────────────────────────────────')
  const mode = await prompt('\n   Delete (1) a single recipe by name, or (2) all recipes? [1/2]: ')

  if (mode === '1') {
    const title = await prompt('   Recipe title: ')
    if (!title) { console.error('\n❌  No title entered.\n'); process.exit(1) }
    await deleteByTitle(title)
  } else if (mode === '2') {
    await deleteAll()
  } else {
    console.log('\n❌  Invalid choice. Enter 1 or 2.\n')
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('\n❌  Error:', err.message, '\n')
  process.exit(1)
})

// to run it (bash):
// node scripts/recipe-deletion-script.js --title "Creamy Buffalo Ranch Dip"
// node scripts/recipe-deletion-script.js --all
// node scripts/recipe-deletion-script.js   ← interactive