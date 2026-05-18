'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function RecipeCard({ recipe, imageUrl }) {
  return (
    <Link href={`/recipe/${recipe.slug.current}`}>
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(61,32,16,0.08)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(61,32,16,0.15)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(61,32,16,0.08)'
        }}
      >
        <div style={{
          height: '200px',
          background: '#F0EBE3',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={recipe.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
            }}>🍽️</div>
          )}
        </div>

        <div style={{ padding: '1.25rem' }}>
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
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.2rem',
            margin: '0.75rem 0 0.5rem',
            color: '#3D2010',
            lineHeight: 1.3,
          }}>
            {recipe.title}
          </h3>
          <p style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: '0.9rem',
            color: '#7A6555',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {recipe.description}
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #F0EBE3',
            fontFamily: 'Lato, sans-serif',
            fontSize: '0.8rem',
            color: '#7A6555',
          }}>
            {recipe.prepTime && <span>⏱ {recipe.prepTime} min prep</span>}
            {recipe.servings && <span>🍽 {recipe.servings} servings</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}