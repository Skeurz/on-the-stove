import { client } from '@/sanity/lib/client'
import { getAllRecipes } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import RecipeCard from './components/RecipeCard'

export default async function Home() {
  const recipes = await client.fetch(getAllRecipes)

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, #1E0E05 0%, #5C2810 60%, #E8622A 100%)',
        color: 'white',
        padding: '7rem 2rem 6rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(232,98,42,0.12)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(232,98,42,0.08)', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(232,98,42,0.2)',
            border: '1px solid rgba(232,98,42,0.4)',
            color: '#F4946A',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.78rem',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            padding: '0.35rem 1rem',
            borderRadius: '50px',
            marginBottom: '1.5rem',
          }}>
            From My Kitchen, To Yours
          </span>

          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: '700',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            letterSpacing: '-0.5px',
          }}>
            Simple Recipes for<br />
            <em style={{ color: '#F4946A' }}>Real Life</em>
          </h1>

          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '480px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8,
            fontWeight: '300',
          }}>
            Good food doesn't have to be complicated. Join Adelaide on a tasteful journey through comforting, approachable cooking.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/category/dinner" style={{
              background: '#E8622A',
              color: 'white',
              padding: '0.85rem 2.2rem',
              borderRadius: '50px',
              fontFamily: '"Lato", sans-serif',
              fontWeight: '700',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
              display: 'inline-block',
              boxShadow: '0 4px 20px rgba(232,98,42,0.4)',
            }}>
              Browse Recipes
            </Link>
            <Link href="/about" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              padding: '0.85rem 2.2rem',
              borderRadius: '50px',
              fontFamily: '"Lato", sans-serif',
              fontWeight: '400',
              fontSize: '0.95rem',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'inline-block',
            }}>
              About Adelaide
            </Link>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section style={{
        background: '#FDF6EE',
        borderBottom: '1px solid #F0EBE3',
        padding: '1.25rem 2rem',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          maxWidth: '1200px',
          margin: '0 auto',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            { label: '🍱 Lunch', href: '/category/lunch' },
            { label: '🍝 Dinner', href: '/category/dinner' },
            { label: '🥞 Breakfast', href: '/category/breakfastnbrunch' },
            { label: '🥨 Snacks', href: '/category/snacksnsides' },
            { label: '🍰 Desserts', href: '/category/desserts' },
            { label: '🥤 Drinks', href: '/category/drinks-shakes' },
          ].map(cat => (
            <Link key={cat.href} href={cat.href} style={{
              background: 'white',
              border: '1px solid #E8D5C4',
              color: '#7A4528',
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.85rem',
              fontWeight: '700',
              padding: '0.45rem 1.1rem',
              borderRadius: '50px',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}>
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Recipes Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '4rem auto',
        padding: '0 2rem',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '2rem',
            color: '#3D2010',
          }}>
            Recent Recipes
          </h2>
          <Link href="/category/dinner" style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.85rem',
            color: '#E8622A',
            fontWeight: '700',
            letterSpacing: '0.3px',
          }}>
            View all →
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              imageUrl={recipe.mainImage ? urlFor(recipe.mainImage).width(400).height(200).url() : null}
            />
          ))}
        </div>
      </section>

      {/* About Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #3D2010, #7A4528)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
        margin: '2rem 0 0',
      }}>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '2rem',
          marginBottom: '1rem',
        }}>
          Meet Adelaide
        </h2>
        <p style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.75)',
          maxWidth: '500px',
          margin: '0 auto 1.5rem',
          lineHeight: 1.8,
        }}>
          Home cook and big believer that good food doesn't have to be complicated.
        </p>
        <Link href="/about" style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.4)',
          color: 'white',
          padding: '0.75rem 2rem',
          borderRadius: '50px',
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.9rem',
          display: 'inline-block',
        }}>
          Read My Story
        </Link>
      </section>
    </div>
  )
}