const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

async function fetchDocs() {
  const query = encodeURIComponent(`*[_type == "recipe" && (defined(storageTips) || defined(faqs))]{_id, storageTips, faqs}`)
  const url = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${DATASET}?query=${query}`
  console.log('Fetching from:', url.replace(TOKEN, '***'))
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  })
  const json = await res.json()
  console.log('Raw response:', JSON.stringify(json).slice(0, 300))
  return json.result || []
}

async function patchDoc(id, patch) {
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations: [{ patch: { id, set: patch } }] })
  })
  return res.json()
}

async function run() {
  console.log('PROJECT_ID:', PROJECT_ID)
  console.log('TOKEN set:', !!TOKEN)

  const docs = await fetchDocs()
  console.log(`Found ${docs.length} docs to fix`)

  for (const doc of docs) {
    const patch = {}
    if (doc.storageTips?.length) patch.storageTips = doc.storageTips.map(item => ({ ...item, _type: 'object' }))
    if (doc.faqs?.length) patch.faqs = doc.faqs.map(item => ({ ...item, _type: 'object' }))
    const result = await patchDoc(doc._id, patch)
    console.log(`Patched ${doc._id}:`, result)
  }

  console.log('Done.')
}

run().catch(console.error)