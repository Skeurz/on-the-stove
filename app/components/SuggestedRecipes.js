import { client } from '@/sanity/lib/client'
import { getSuggestedRecipes } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import RecipeCard from './RecipeCard'

export default async function SuggestedRecipes({ currentRecipeId, category, tags }) {
  const recipes = await client.fetch(getSuggestedRecipes, {
    currentId: currentRecipeId || '',
    category: category || '',
    tags: tags || [],
  })

  if (!recipes || recipes.length === 0) return null

  const displayed = recipes.slice(0, 3)

  return (
    <section style={{
      marginTop: 'clamp(3rem, 10vw, 5rem)',
      paddingTop: 'clamp(2rem, 8vw, 4rem)',
      borderTop: '1px solid var(--gray)'
    }}>
      <div style={{
        background: 'var(--cream)',
        border: '1px solid var(--gray)',
        borderRadius: '12px',
        padding: 'clamp(0.4rem, 2vw, 0.6rem) clamp(0.8rem, 4vw, 1.4rem)',
        width: 'fit-content',
        margin: '0 auto 2.5rem',
      }}>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(1.4rem, 5vw, 1.8rem)',
          color: 'var(--brown)',
          textAlign: 'center',
          margin: 0
        }}>
          You Might Also Like...
        </h2>
      </div>

      <div className="recipe-grid">
        {displayed.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            imageUrl={recipe.mainImage ? urlFor(recipe.mainImage).width(400).height(200).url() : null}
          />
        ))}
      </div>
    </section>
  )
}