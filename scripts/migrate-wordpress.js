import fs from 'fs'
import xml2js from 'xml2js'
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

const categoryMap = {
  'lunch': 'lunch',
  'dinner': 'dinner',
  'breakfastnbrunch': 'breakfastnbrunch',
  'breakfast-brunch': 'breakfastnbrunch',
  'snacksnsides': 'snacksnsides',
  'snacks-sides': 'snacksnsides',
  'desserts': 'desserts',
  'drinks-shakes': 'drinks-shakes',
}

async function migrate() {
  // Read the XML file — update the filename to match yours
  const xml = fs.readFileSync('./scripts/wordpress-export.xml', 'utf8')
  const parsed = await xml2js.parseStringPromise(xml)
  const items = parsed.rss.channel[0].item

  const posts = items.filter(item =>
    item['wp:post_type']?.[0] === 'post' &&
    item['wp:status']?.[0] === 'publish'
  )

  console.log(`Found ${posts.length} published posts`)

  for (const post of posts) {
    const title = post.title?.[0] || 'Untitled'
    const slug = post['wp:post_name']?.[0] || title.toLowerCase().replace(/\s+/g, '-')
    const content = post['content:encoded']?.[0] || ''
    const description = post['excerpt:encoded']?.[0]?.replace(/<[^>]*>/g, '').trim() || ''
    const publishedAt = post['wp:post_date']?.[0] || new Date().toISOString()

    // Get category
    const categories = post.category || []
    let category = 'dinner'
    for (const cat of categories) {
      const slug_ = cat?.$?.nicename || cat?._ || ''
      if (categoryMap[slug_]) {
        category = categoryMap[slug_]
        break
      }
    }

    // Convert HTML content to plain paragraphs for body
    const paragraphs = content
      .split(/\n+/)
      .map(p => p.replace(/<[^>]*>/g, '').trim())
      .filter(p => p.length > 0)
      .map(p => ({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'normal',
        children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: p }],
        markDefs: [],
      }))

    const doc = {
      _type: 'recipe',
      title,
      slug: { _type: 'slug', current: slug },
      category,
      description,
      body: paragraphs,
      publishedAt: new Date(publishedAt).toISOString(),
    }

    try {
      await client.create(doc)
      console.log(`✅ Imported: ${title}`)
    } catch (err) {
      console.error(`❌ Failed: ${title}`, err.message)
    }
  }

  console.log('Migration complete!')
}

migrate()