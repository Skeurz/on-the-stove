import { client } from '@/sanity/lib/client'
import { getRecipeBySlug } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { PortableText } from 'next-sanity'

export default async function RecipePage({ params }) {
  const { slug } = await params
  const recipe = await client.fetch(getRecipeBySlug, { slug })

  if (!recipe) return <div style={{ padding: '4rem', textAlign: 'center' }}>Recipe not found.</div>

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>

      {/* Category tag */}
      <span style={{
        background: '#FDF6EE',
        color: '#E8622A',
        fontSize: '0.75rem',
        fontWeight: '700',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        padding: '0.25rem 0.75rem',
        borderRadius: '50px',
        fontFamily: 'Lato, sans-serif',
      }}>
        {recipe.category}
      </span>

      {/* Title */}
      <h1 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        color: '#3D2010',
        margin: '1rem 0',
        lineHeight: 1.2,
      }}>
        {recipe.title}
      </h1>

      {/* Meta */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        fontFamily: 'Lato, sans-serif',
        fontSize: '0.9rem',
        color: '#7A6555',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}>
        {recipe.prepTime && <span>⏱ Prep: {recipe.prepTime} min</span>}
        {recipe.cookTime && <span>🔥 Cook: {recipe.cookTime} min</span>}
        {recipe.servings && <span>🍽 Serves: {recipe.servings}</span>}
      </div>

      {/* Main Image */}
      {recipe.mainImage && (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}>
          <Image
            src={urlFor(recipe.mainImage).width(800).height(400).url()}
            alt={recipe.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Description */}
      {recipe.description && (
        <p style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: '1.05rem',
          color: '#7A6555',
          lineHeight: 1.8,
          marginBottom: '2rem',
          fontStyle: 'italic',
          borderLeft: '3px solid #E8622A',
          paddingLeft: '1rem',
        }}>
          {recipe.description}
        </p>
      )}

      {/* Ingredients */}
      {recipe.ingredients?.length > 0 && (
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(61,32,16,0.08)',
        }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem',
            color: '#3D2010',
            marginBottom: '1rem',
          }}>
            Ingredients
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recipe.ingredients.map((item, i) => (
              <li key={i} style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.95rem',
                color: '#2C1A0E',
                padding: '0.5rem 0',
                borderBottom: '1px solid #F0EBE3',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ color: '#E8622A' }}>•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Steps */}
      {recipe.steps?.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem',
            color: '#3D2010',
            marginBottom: '1rem',
          }}>
            Instructions
          </h2>
          {recipe.steps.map((step, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem',
              alignItems: 'flex-start',
            }}>
              <span style={{
                background: '#E8622A',
                color: 'white',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Lato, sans-serif',
                fontWeight: '700',
                fontSize: '0.9rem',
                flexShrink: 0,
              }}>
                {i + 1}
              </span>
              <p style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.95rem',
                color: '#2C1A0E',
                lineHeight: 1.8,
                marginTop: '4px',
              }}>
                {step}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Full body content */}
      {recipe.body && (
        <div style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: '1rem',
          lineHeight: 1.8,
          color: '#2C1A0E',
        }}>
          <PortableText value={recipe.body} />
        </div>
      )}

    </div>
  )
}