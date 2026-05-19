import RecipeCard from '@/app/components/RecipeCard'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { searchRecipes } from '@/sanity/lib/queries'
import Link from 'next/link'

export const metadata = {
  title: 'Search Recipes - On The Stove',
  description: 'Search On The Stove recipes by title, description, or category.',
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams
  const query = params?.q?.trim() || ''
  const recipes = query
    ? await client.fetch(searchRecipes, { term: `*${query}*` })
    : []

  return (
    <div>
      <section className="page-hero" style={{
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
          Find something delicious
        </p>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: '700',
          lineHeight: 1.2,
          marginBottom: '1rem',
        }}>
          Search Recipes
        </h1>
        <form action="/search" style={{
          display: 'flex',
          gap: '0.75rem',
          maxWidth: '560px',
          margin: '0 auto',
        }}>
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search by recipe, ingredient, or category"
            aria-label="Search recipes"
            style={{
              flex: 1,
              minWidth: 0,
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '50px',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.95rem',
              padding: '0.85rem 1.1rem',
              outlineColor: '#F4946A',
            }}
          />
          <button type="submit" className="button" style={{
            background: '#E8622A',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontFamily: '"Lato", sans-serif',
            fontWeight: '700',
            fontSize: '0.95rem',
            padding: '0.85rem 1.4rem',
            cursor: 'pointer',
            flexShrink: 0,
          }}>
            Search
          </button>
        </form>
      </section>

      <section className="content-section" style={{
        maxWidth: '1200px',
        margin: '4rem auto',
      }}>
        <div className="section-heading-row" style={{ marginBottom: '2rem' }}>
          <div>
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#E8622A',
              marginBottom: '0.5rem',
            }}>
              Results
            </p>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '2rem',
              color: '#3D2010',
            }}>
              {query ? `"${query}"` : 'Search the kitchen'}
            </h2>
          </div>
          {query && (
            <p style={{
              fontFamily: '"Lato", sans-serif',
              color: '#7A6555',
            }}>
              {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {!query ? (
          <EmptyState message="Type a word above to search recipes." />
        ) : recipes.length === 0 ? (
          <EmptyState message="No matching recipes yet. Try another search term." />
        ) : (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                imageUrl={recipe.mainImage ? urlFor(recipe.mainImage).width(400).height(200).url() : null}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 1.5rem',
      fontFamily: '"Lato", sans-serif',
      color: '#7A6555',
      background: 'white',
      border: '1px solid #F0E6DC',
      borderRadius: '20px',
    }}>
      <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Search</p>
      <p style={{ marginBottom: '1.5rem' }}>{message}</p>
      <Link href="/" style={{
        color: '#E8622A',
        fontWeight: '700',
      }}>
        Back to recipes
      </Link>
    </div>
  )
}
