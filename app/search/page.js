import RecipeCard from '@/app/components/RecipeCard'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { defineQuery } from 'next-sanity'
import SearchFilters from '@/app/components/SearchFilters'

export const metadata = {
  title: 'Search Recipes - On The Stove',
  description: 'Search On The Stove recipes by title, description, or category.',
}

const searchWithFilters = defineQuery(`
  *[
    _type == "recipe" &&
    ($term == "" || title match $term || description match $term || category match $term) &&
    ($category == "" || category == $category) &&
    ($difficulty == "" || difficulty == $difficulty) &&
    ($cuisine == "" || cuisine == $cuisine)
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    calories,
    publishedAt,
    ratingTotal,
    ratingCount,
    difficulty,
    cuisine
  }
`)


export default async function SearchPage({ searchParams }) {
  const params = await searchParams
  const query = params?.q?.trim() || ''
  const category = params?.category || ''
  const difficulty = params?.difficulty || ''
  const cuisine = params?.cuisine || ''

  const hasFilters = query || category || difficulty || cuisine

  const recipes = hasFilters
    ? await client.fetch(searchWithFilters, {
        term: query ? `*${query}*` : '',
        category,
        difficulty,
        cuisine,
      })
    : []

  const activeFiltersCount = [category, difficulty, cuisine].filter(Boolean).length

  return (
    <div>
      {/* Hero */}
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
          marginBottom: '1.5rem',
        }}>
          Search Recipes
        </h1>
        <form action="/search" className="search-hero-form" style={{
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
          {/* preserve filters on search */}
          {category && <input type="hidden" name="category" value={category} />}
          {difficulty && <input type="hidden" name="difficulty" value={difficulty} />}
          {cuisine && <input type="hidden" name="cuisine" value={cuisine} />}
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

      {/* Filters */}
      <SearchFilters
        query={query}
        category={category}
        difficulty={difficulty}
        cuisine={cuisine}
      />

      {/* Results */}
      <section className="content-section" style={{
        maxWidth: '1200px',
        margin: '4rem auto',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{
            background: 'var(--cream)',
            border: '1px solid var(--gray)',
            borderRadius: '12px',
            padding: '0.6rem 1.2rem',
          }}>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.8rem',
              color: 'var(--brown)',
              margin: 0,
            }}>
              {query ? `"${query}"` : activeFiltersCount > 0 ? 'Filtered Recipes' : 'Search the kitchen'}
            </h2>
            {hasFilters && (
              <p style={{
                fontFamily: '"Lato", sans-serif',
                color: 'var(--text-light)',
                margin: 0,
                fontSize: '0.9rem',
                marginTop: '0.25rem',
              }}>
                {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>
        </div>

        {!hasFilters ? (
          <EmptyState message="Type a word above or use the filters to search recipes." />
        ) : recipes.length === 0 ? (
          <EmptyState message="No matching recipes found. Try different filters or search terms." />
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
      color: 'var(--text-light)',
      background: 'var(--cream-light)',
      border: '1px solid var(--gray)',
      borderRadius: '20px',
    }}>
      <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
      <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>{message}</p>
      <Link href="/" style={{
        color: 'var(--orange)',
        fontWeight: '700',
        fontFamily: '"Lato", sans-serif',
      }}>
        ← Back to recipes
      </Link>
    </div>
  )
}
