import fetch from 'node-fetch'
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import xml2js from 'xml2js'
import fs from 'fs'

dotenv.config({ path: '.env.local' })

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function downloadImage(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch image: ${url}`)
  const buffer = await response.buffer()
  return buffer
}

async function uploadImageToSanity(buffer, filename) {
  const asset = await sanity.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  })
  return asset
}

async function run() {
  // Parse WordPress XML to get post images
  const xml = fs.readFileSync('./scripts/wordpress-export.xml', 'utf8')
  const parsed = await xml2js.parseStringPromise(xml)
  const items = parsed.rss.channel[0].item

  const posts = items.filter(item =>
    item['wp:post_type']?.[0] === 'post' &&
    item['wp:status']?.[0] === 'publish'
  )

  console.log(`Processing ${posts.length} posts for images`)

  for (const post of posts) {
    const slug = post['wp:post_name']?.[0]
    const title = post.title?.[0]
    const content = post['content:encoded']?.[0] || ''

    // Find the first image in the post content
    const imgMatch = content.match(/https?:\/\/onthestove\.com\/wp-content\/uploads\/[^\s"')]+\.(jpg|jpeg|png|webp)/i)

    if (!imgMatch) {
      console.log(`⚠️ No image found for: ${title}`)
      continue
    }

    const imageUrl = imgMatch[0]
    const filename = imageUrl.split('/').pop()

    try {
      // Find the matching recipe in Sanity
      const recipe = await sanity.fetch(
        `*[_type == "recipe" && slug.current == $slug][0]{ _id, title }`,
        { slug }
      )

      if (!recipe) {
        console.log(`⚠️ Recipe not found in Sanity: ${title}`)
        continue
      }

      // Download image from WordPress
      console.log(`⬇️ Downloading: ${filename}`)
      const buffer = await downloadImage(imageUrl)

      // Upload to Sanity
      console.log(`⬆️ Uploading to Sanity: ${filename}`)
      const asset = await uploadImageToSanity(buffer, filename)

      // Attach image to recipe
      await sanity.patch(recipe._id).set({
        mainImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          }
        }
      }).commit()

      console.log(`✅ Image migrated for: ${title}`)

      // Small delay
      await new Promise(r => setTimeout(r, 300))

    } catch (err) {
      console.error(`❌ Failed for ${title}:`, err.message)
    }
  }

  console.log('Image migration complete!')
}

run()