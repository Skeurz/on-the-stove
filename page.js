import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import RecipeCard from '../components/RecipeCard'
import Link from 'next/link'

export default async function CollectionsPage() {
  // Fetch up to 12 recipes tagged with 'collections'
  const recipes = await client.fetch(`
    *[_type == "recipe" && category == "collections"] | order(_createdAt desc)[0...12]
  `)

  return (
    <div style={{ background: 'var(--cream-light)', minHeight: '100vh' }}>
      <header style={{
        background: '#1E0E05',
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
        color: 'white',
        marginTop: '-68px'
      }}>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          marginBottom: '1.1rem'
        }}>
          My <span style={{ color: '#E8622A' }}>Collections</span>
        </h1>
        <p style={{
          fontFamily: '"Lato", sans-serif',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '550px',
          margin: '0 auto',
          fontSize: '1.05rem',
          lineHeight: '1.6'
        }}>
          A hand-picked selection of our top-rated recipes and kitchen favorites, curated just for you.
        </p>
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '4rem auto',
        padding: '0 1.5rem'
      }}>
        {recipes.length > 0 ? (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                imageUrl={recipe.mainImage ? urlFor(recipe.mainImage).width(400).height(200).url() : null}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍳</div>
            <p style={{ 
              color: 'var(--brown-light)', 
              fontFamily: '"Lato", sans-serif', 
              fontSize: '1.1rem',
              marginBottom: '2rem' 
            }}>
              This collection is currently empty.
            </p>
            <Link href="/recipes" style={{
              background: '#E8622A',
              color: 'white',
              padding: '0.8rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '700'
            }}>
              Browse All Recipes
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}