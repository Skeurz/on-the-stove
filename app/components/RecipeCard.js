'use client'

import Link from 'next/link'
import Image from 'next/image'

const categoryEmoji = {
  lunch: '🍱',
  dinner: '🍝',
  breakfastnbrunch: '🥞',
  snacksnsides: '🥨',
  desserts: '🍰',
  'drinks-shakes': '🥤',
}

const categoryLabel = {
  lunch: 'Lunch',
  dinner: 'Dinner',
  breakfastnbrunch: 'Breakfast & Brunch',
  snacksnsides: 'Snacks & Sides',
  desserts: 'Desserts',
  'drinks-shakes': 'Drinks & Shakes',
}

function RatingStars({ total, count }) {
  const hasRatings = count && count > 0
  const average = hasRatings ? Math.round((total / count) * 10) / 10 : 0
  const fullStars = hasRatings ? Math.round(average) : 0
  const stars = []

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} style={{
        color: i < fullStars ? '#E8622A' : '#E0D6CC',
        fontSize: '0.85rem',
        lineHeight: 1,
      }}>
        ★
      </span>
    )
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontFamily: '"Lato", sans-serif',
      fontSize: '0.78rem',
      color: '#A08070',
    }}>
      {stars}
      {hasRatings ? (
        <>
          <span style={{ marginLeft: '0.15rem', fontWeight: '700', color: '#6B5244' }}>
            {average.toFixed(1)}
          </span>
          <span style={{ color: '#C0B0A0' }}>
            ({count})
          </span>
        </>
      ) : (
        <span style={{ color: '#C0B0A0', fontSize: '0.72rem' }}>
          No ratings yet
        </span>
      )}
    </div>
  )
}

export default function RecipeCard({ recipe, imageUrl }) {
  return (
    <Link href={`/recipe/${recipe.slug.current}`}>
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid #F0E6DC',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(61,32,16,0.14)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        <div style={{
          height: '210px',
          background: '#F5EDE4',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={recipe.title}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '3.5rem',
            }}>
              {categoryEmoji[recipe.category] || '🍽️'}
            </div>
          )}

          {/* Category badge over image */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(30,14,5,0.75)',
            backdropFilter: 'blur(6px)',
            color: '#F4946A',
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: '0.3rem 0.7rem',
            borderRadius: '50px',
            fontFamily: '"Lato", sans-serif',
          }}>
            {categoryEmoji[recipe.category]} {categoryLabel[recipe.category] || recipe.category}
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding: '1.25rem 1.35rem 1.35rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
          <h3 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.15rem',
            fontWeight: '700',
            color: '#2C1A0E',
            lineHeight: 1.35,
            marginBottom: '0.6rem',
          }}>
            {recipe.title}
          </h3>

          {recipe.description && (
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.875rem',
              color: '#8A6E5E',
              lineHeight: 1.65,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
            }}>
              {recipe.description}
            </p>
          )}

          {/* Meta row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #F5EDE4',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.78rem',
            color: '#A08070',
            fontWeight: '700',
            letterSpacing: '0.3px',
          }}>
            {recipe.prepTime && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                ⏱ {recipe.prepTime} min
              </span>
            )}
            {recipe.cookTime && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                🔥 {recipe.cookTime} min
              </span>
            )}
            {recipe.servings && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                🍽 {recipe.servings} servings
              </span>
            )}
            {!recipe.prepTime && !recipe.cookTime && !recipe.servings && (
              <span style={{ color: '#E8622A' }}>View Recipe →</span>
            )}
          </div>

          {/* Star rating */}
          <div style={{ marginTop: '0.6rem' }}>
            <RatingStars total={recipe.ratingTotal} count={recipe.ratingCount} />
          </div>
        </div>
      </div>
    </Link>
  )
}
