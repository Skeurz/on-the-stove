import { client } from '@/sanity/lib/client'
import { getRecipeBySlug } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from 'next-sanity'

const categoryLabel = {
  lunch: 'Lunch',
  dinner: 'Dinner',
  breakfastnbrunch: 'Breakfast & Brunch',
  snacksnsides: 'Snacks & Sides',
  desserts: 'Desserts',
  'drinks-shakes': 'Drinks & Shakes',
}

export default async function RecipePage({ params }) {
  const { slug } = await params
  const recipe = await client.fetch(getRecipeBySlug, { slug })

  if (!recipe) return (
    <div style={{ padding: '6rem', textAlign: 'center' }}>
      <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: '#3D2010' }}>Recipe not found</p>
      <Link href="/" style={{ color: '#E8622A', fontFamily: '"Lato", sans-serif' }}>← Back to home</Link>
    </div>
  )

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  return (
    <div>
      {/* Hero Image */}
      {recipe.mainImage && (
        <div style={{
          width: '100%',
          height: '480px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Image
            src={urlFor(recipe.mainImage).width(1200).height(480).url()}
            alt={recipe.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(30,14,5,0.7) 100%)',
          }} />
          {/* Title over image */}
          <div style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '800px',
            padding: '0 2rem',
            textAlign: 'center',
          }}>
            <Link href={`/category/${recipe.category}`} style={{
              display: 'inline-block',
              background: 'rgba(232,98,42,0.9)',
              color: 'white',
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '0.3rem 0.9rem',
              borderRadius: '50px',
              fontFamily: '"Lato", sans-serif',
              marginBottom: '1rem',
            }}>
              {categoryLabel[recipe.category] || recipe.category}
            </Link>
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              color: 'white',
              lineHeight: 1.2,
              textShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}>
              {recipe.title}
            </h1>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem 2rem' }}>

        {/* Title if no image */}
        {!recipe.mainImage && (
          <>
            <Link href={`/category/${recipe.category}`} style={{
              display: 'inline-block',
              background: '#FDF6EE',
              color: '#E8622A',
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '0.3rem 0.9rem',
              borderRadius: '50px',
              fontFamily: '"Lato", sans-serif',
              marginBottom: '1rem',
            }}>
              {categoryLabel[recipe.category] || recipe.category}
            </Link>
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#2C1A0E',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}>
              {recipe.title}
            </h1>
          </>
        )}

        {/* Meta cards */}
        {(recipe.prepTime || recipe.cookTime || recipe.servings) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem',
            margin: '2rem 0',
            padding: '1.5rem',
            background: '#FDF6EE',
            borderRadius: '16px',
            border: '1px solid #F0E6DC',
          }}>
            {recipe.prepTime && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>⏱</p>
                <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: '#A08070', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Prep</p>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A0E', fontWeight: '600' }}>{recipe.prepTime} min</p>
              </div>
            )}
            {recipe.cookTime && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🔥</p>
                <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: '#A08070', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Cook</p>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A0E', fontWeight: '600' }}>{recipe.cookTime} min</p>
              </div>
            )}
            {totalTime > 0 && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🕐</p>
                <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: '#A08070', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Total</p>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A0E', fontWeight: '600' }}>{totalTime} min</p>
              </div>
            )}
            {recipe.servings && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🍽</p>
                <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: '#A08070', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Serves</p>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A0E', fontWeight: '600' }}>{recipe.servings}</p>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {recipe.description && (
          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '1.05rem',
            color: '#6B5244',
            lineHeight: 1.85,
            margin: '1.5rem 0 2rem',
            fontStyle: 'italic',
            paddingLeft: '1.25rem',
            borderLeft: '3px solid #E8622A',
          }}>
            {recipe.description}
          </p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: recipe.ingredients?.length > 0 && recipe.steps?.length > 0 ? '1fr 2fr' : '1fr',
          gap: '2rem',
          alignItems: 'start',
          margin: '2rem 0',
        }}>
          {/* Ingredients */}
          {recipe.ingredients?.length > 0 && (
            <div style={{
              background: '#FDF6EE',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #F0E6DC',
              position: 'sticky',
              top: '88px',
            }}>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.4rem',
                color: '#2C1A0E',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '2px solid #E8622A',
              }}>
                Ingredients
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {recipe.ingredients.map((item, i) => (
                  <li key={i} style={{
                    fontFamily: '"Lato", sans-serif',
                    fontSize: '0.9rem',
                    color: '#3D2010',
                    padding: '0.55rem 0',
                    borderBottom: '1px solid #F0E6DC',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    lineHeight: 1.5,
                  }}>
                    <span style={{ color: '#E8622A', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          {recipe.steps?.length > 0 && (
            <div>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.4rem',
                color: '#2C1A0E',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '2px solid #E8622A',
              }}>
                Instructions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {recipe.steps.map((step, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '1.1rem',
                    alignItems: 'flex-start',
                    padding: '1.25rem',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #F0E6DC',
                  }}>
                    <span style={{
                      background: '#E8622A',
                      color: 'white',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: '"Lato", sans-serif',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <p style={{
                      fontFamily: '"Lato", sans-serif',
                      fontSize: '0.95rem',
                      color: '#2C1A0E',
                      lineHeight: 1.8,
                      margin: 0,
                      paddingTop: '4px',
                    }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Full body content */}
        {recipe.body && (
          <div style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '1rem',
            lineHeight: 1.9,
            color: '#3D2010',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #F0E6DC',
          }}>
            <PortableText value={recipe.body} />
          </div>
        )}

        {/* Back link */}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #F0E6DC' }}>
          <Link href="/" style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.9rem',
            color: '#E8622A',
            fontWeight: '700',
          }}>
            ← Back to all recipes
          </Link>
        </div>
      </div>
    </div>
  )
}