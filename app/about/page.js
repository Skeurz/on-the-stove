import { client } from '@/sanity/lib/client'
import { getAuthor } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About Me – On The Stove',
  description: 'From My Kitchen To Yours. Meet Adelaide, the home cook behind On The Stove.',
}

export default async function AboutPage() {
  const author = await client.fetch(getAuthor)

  return (
    <div>
      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(160deg, #1E0E05 0%, #5C2810 60%, #E8622A 100%)',
        color: 'white',
        padding: '5rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.78rem',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          color: '#F4946A',
          marginBottom: '1rem',
        }}>
          The Story Behind The Stove
        </p>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: '700',
          lineHeight: 1.2,
        }}>
          Join me on my <em style={{ color: '#F4946A' }}>Tasty Journey!</em>
        </h1>
      </section>

      {/* Main content */}
      <div style={{
        maxWidth: '1100px',
        margin: '5rem auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1.6fr',
        gap: '4rem',
        alignItems: 'start',
      }}>

        {/* LEFT: Photo */}
        <div style={{ position: 'sticky', top: '88px' }}>
          {author?.photo ? (
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '4px solid #F0E6DC',
              boxShadow: '0 20px 60px rgba(61,32,16,0.15)',
            }}>
              <Image
                src={urlFor(author.photo).width(500).height(700).url()}
                alt={author?.name || 'Adelaide'}
                width={500}
                height={700}
                style={{ objectFit: 'cover', display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
          ) : (
            <div style={{
              background: '#FDF6EE',
              borderRadius: '24px',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5rem',
              border: '1px solid #F0E6DC',
            }}>
              👩‍🍳
            </div>
          )}

          {/* Social links under photo */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.5rem',
            justifyContent: 'center',
          }}>
            {author?.pinterest && (
              <a href={author.pinterest} target="_blank" rel="noopener noreferrer" style={{
                background: '#E60023',
                color: 'white',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.85rem',
                fontWeight: '700',
                padding: '0.6rem 1.5rem',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}>
                📌 Pinterest
              </a>
            )}
            {author?.instagram && (
              <a href={author.instagram} target="_blank" rel="noopener noreferrer" style={{
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366)',
                color: 'white',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.85rem',
                fontWeight: '700',
                padding: '0.6rem 1.5rem',
                borderRadius: '50px',
              }}>
                📷 Instagram
              </a>
            )}
          </div>
        </div>

        {/* RIGHT: Content */}
        <div>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '2rem',
            color: '#2C1A0E',
            marginBottom: '1.5rem',
          }}>
            From My Kitchen To Yours…
          </h2>

          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '1.05rem',
            color: '#6B5244',
            lineHeight: 1.9,
            marginBottom: '1.5rem',
          }}>
            For me, cooking has always been more than "what's for dinner." It's comfort, creativity, and care, served on a plate. After years of testing, tweaking, and sharing, this little kitchen hobby grew into a full-time recipe blog for busy home cooks who still want food that feels special.
          </p>

          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '1.05rem',
            color: '#6B5244',
            lineHeight: 1.9,
            marginBottom: '2.5rem',
            fontWeight: '700',
            color: '#3D2010',
          }}>
            Follow along: new recipes, daily meal ideas, and simple tips to make everyday cooking easier.
          </p>

          {/* Divider */}
          <div style={{
            borderTop: '2px solid #E8622A',
            margin: '2rem 0',
            width: '60px',
          }} />

          <h3 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.5rem',
            color: '#2C1A0E',
            marginBottom: '1.25rem',
          }}>
            I have been cooking and writing blogs for almost 12 years.
          </h3>

          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '1rem',
            color: '#6B5244',
            lineHeight: 1.9,
            marginBottom: '1.25rem',
          }}>
            It started with handwritten notes, messy counters, and family favorites I didn't want to lose. Then I began sharing recipes online, one after another, learning what real life needs: dependable meals, clear steps, and ingredients you can actually find.
          </p>

          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '1rem',
            color: '#6B5244',
            lineHeight: 1.9,
            marginBottom: '1.25rem',
          }}>
            Today, I create approachable recipes for women juggling work, family, and everything in between. Think: cozy dinners, smarter shortcuts, and meal prep that doesn't feel like a second job. Every recipe is tested, re-tested, and written the way I'd explain it to a friend in my kitchen.
          </p>

          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '1rem',
            color: '#6B5244',
            lineHeight: 1.9,
            marginBottom: '2.5rem',
          }}>
            If you're here for simple, satisfying food, welcome. Grab a cup of tea, pick a recipe, and let's make something you'll be proud to serve (even on a busy weeknight).
          </p>

          {/* Promise box */}
          <div style={{
            background: '#FDF6EE',
            border: '1px solid #F0E6DC',
            borderLeft: '4px solid #E8622A',
            borderRadius: '16px',
            padding: '1.75rem',
            marginBottom: '2.5rem',
          }}>
            <h4 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.2rem',
              color: '#2C1A0E',
              marginBottom: '1rem',
            }}>
              Quick promise from my kitchen to yours
            </h4>
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.9rem',
              color: '#6B5244',
              marginBottom: '0.75rem',
            }}>
              You'll always find:
            </p>
            {[
              '✅ Clear instructions (no guesswork)',
              '✅ Practical swaps and time-savers',
              '✅ Balanced comfort food you\'ll actually crave',
              '✅ Recipes that work the first time',
            ].map((item, i) => (
              <p key={i} style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.95rem',
                color: '#3D2010',
                lineHeight: 1.7,
                marginBottom: '0.4rem',
              }}>
                {item}
              </p>
            ))}
          </div>

          {/* CTA */}
          <Link href="/" style={{
            background: '#E8622A',
            color: 'white',
            fontFamily: '"Lato", sans-serif',
            fontWeight: '700',
            fontSize: '0.95rem',
            padding: '0.9rem 2.2rem',
            borderRadius: '50px',
            display: 'inline-block',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 20px rgba(232,98,42,0.3)',
          }}>
            Browse My Recipes →
          </Link>
        </div>
      </div>
    </div>
  )
}