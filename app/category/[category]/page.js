import { client } from '@/sanity/lib/client'
import { getRecipesByCategory } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import RecipeCard from '@/app/components/RecipeCard'

const categoryLabels = {
  lunch: 'Lunch',
  dinner: 'Dinner',
  breakfastnbrunch: 'Breakfast & Brunch',
  snacksnsides: 'Snacks & Sides',
  desserts: 'Desserts',
  'drinks-shakes': 'Drinks & Shakes',
}

export default async function CategoryPage({ params }) {
  const { category } = await params
  const recipes = await client.fetch(getRecipesByCategory, { category })
  const label = categoryLabels[category] || category

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

      {/* Header */}
      <div style={{
        borderBottom: '2px solid #F0EBE3',
        marginBottom: '2.5rem',
        paddingBottom: '1.5rem',
      }}>
        <p style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#E8622A',
          marginBottom: '0.5rem',
        }}>
          Recipes
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2.5rem',
          color: '#3D2010',
        }}>
          {label}
        </h1>
        <p style={{
          fontFamily: 'Lato, sans-serif',
          color: '#7A6555',
          marginTop: '0.5rem',
        }}>
          {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid */}
      {recipes.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          fontFamily: 'Lato, sans-serif',
          color: '#7A6555',
        }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</p>
          <p>No recipes in this category yet. Check back soon!</p>
        </div>
      ) : (
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
      )}
    </div>
  )
}