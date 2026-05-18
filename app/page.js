import { client } from '@/sanity/lib/client'
import { getAllRecipes } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import RecipeCard from './components/RecipeCard'

export default async function Home() {
  const recipes = await client.fetch(getAllRecipes)

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #3D2010 0%, #7A4528 100%)',
        color: 'white',
        padding: '5rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Lato, sans-serif',
          letterSpacing: '3px',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          color: '#F4946A',
          marginBottom: '1rem',
        }}>
          From My Kitchen, To Yours
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: '700',
          lineHeight: 1.2,
          marginBottom: '1.5rem',
        }}>
          Simple Recipes for<br />
          <em>Real Life</em>
        </h1>
        <p style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '500px',
          margin: '0 auto 2rem',
          lineHeight: 1.7,
        }}>
          Good food doesn't have to be complicated. Join Adelaide on a tasteful journey.
        </p>
        <Link href="/category/dinner" style={{
          background: '#E8622A',
          color: 'white',
          padding: '0.9rem 2.5rem',
          borderRadius: '50px',
          fontFamily: 'Lato, sans-serif',
          fontWeight: '700',
          fontSize: '0.95rem',
          letterSpacing: '1px',
          display: 'inline-block',
        }}>
          Browse Recipes
        </Link>
      </section>

      {/* Recipes Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '4rem auto',
        padding: '0 2rem',
      }}>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2rem',
          marginBottom: '2rem',
          color: '#3D2010',
        }}>
          Recent Recipes
        </h2>

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
    </div>
  )
}