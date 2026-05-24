import { writeClient } from '@/sanity/lib/write-client'

export async function POST(request) {
  try {
    const { email, source } = await request.json()

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Check if already subscribed
    const existing = await writeClient.fetch(
      `*[_type == "subscriber" && email == $email][0]{ _id }`,
      { email }
    )

    if (existing) {
      return Response.json({ message: 'Already subscribed!' }, { status: 200 })
    }

    // Create subscriber
    await writeClient.create({
      _type: 'subscriber',
      email,
      source: source || 'website',
      subscribedAt: new Date().toISOString(),
    })

    return Response.json({ success: true, message: 'Thanks for subscribing!' })
  } catch (error) {
    console.error('Subscribe error:', error)
    return Response.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}