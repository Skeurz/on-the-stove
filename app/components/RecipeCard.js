'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CakeSlice, ChefHat, Clock, Coffee, Flame, Pizza, Salad, Sandwich, Star, Utensils } from 'lucide-react'

const categoryIcon = {
  lunch: Sandwich,
  dinner: Pizza,
  breakfastnbrunch: Coffee,
  snacksnsides: Salad,
  desserts: CakeSlice,
  'drinks-shakes': Coffee,
}

const categoryLabel = {
  lunch: 'Lunch',
  dinner: 'Dinner',
  breakfastnbrunch: 'Breakfast & Brunch',
  snacksnsides: 'Snacks & Sides',
  desserts: 'Desserts',
  'drinks-shakes': 'Drinks & Shakes',
}

function CategoryIcon({ category, size = 14 }) {
  const Icon = categoryIcon[category] || Utensils
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />
}

function RatingStars({ total, count }) {
  const hasRatings = count && count > 0
  const average = hasRatings ? Math.round((total / count) * 10) / 10 : 0
  const fullStars = hasRatings ? Math.round(average) : 0

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontFamily: '"Lato", sans-serif',
      fontSize: '0.78rem',
      color: 'var(--text)',
    }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={1.8}
          fill={i < fullStars ? 'currentColor' : 'none'}
          style={{ color: i < fullStars ? 'var(--orange)' : 'var(--text-light)' }}
          aria-hidden="true"
        />
      ))}
      {hasRatings ? (
        <>
          <span style={{ marginLeft: '0.15rem', fontWeight: '700', color: 'var(--brown-light)' }}>
            {average.toFixed(1)}
          </span>
          <span style={{ color: 'var(--text-light)' }}>
            ({count})
          </span>
        </>
      ) : (
        <span style={{ color: 'var(--text-light)', fontSize: '0.72rem' }}>
          No ratings yet
        </span>
      )}
    </div>
  )
}

export default function RecipeCard({ recipe, imageUrl }) {
  return (
    <Link href={`/${recipe.slug.current}`}>
      <div
        style={{
          background: 'var(--cream-light)',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid var(--gray)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.12)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{
          height: '210px',
          background: 'var(--gray)',
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
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--orange)',
            }}>
              <CategoryIcon category={recipe.category} size={56} />
            </div>
          )}

          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            color: 'var(--orange-light)',
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: '0.3rem 0.7rem',
            borderRadius: '50px',
            fontFamily: '"Lato", sans-serif',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}>
            <CategoryIcon category={recipe.category} />
            {categoryLabel[recipe.category] || recipe.category}
          </div>
        </div>

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
            color: 'var(--brown)',
            lineHeight: 1.35,
            marginBottom: '0.6rem',
            minHeight: '2.7rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {recipe.title}
          </h3>

          {recipe.description && (
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.875rem',
              color: 'var(--text-light)',
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

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--gray-light)',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.78rem',
            color: 'var(--text-light)',
            fontWeight: '700',
            letterSpacing: '0.3px',
          }}>
            {recipe.prepTime && (
              <span className="icon-text">
                <Clock size={14} strokeWidth={1.8} aria-hidden="true" />
                {recipe.prepTime} min
              </span>
            )}
            {recipe.cookTime && (
              <span className="icon-text">
                <Flame size={14} strokeWidth={1.8} aria-hidden="true" />
                {recipe.cookTime} min
              </span>
            )}
            {recipe.servings && (
              <span className="icon-text">
                <Utensils size={14} strokeWidth={1.8} aria-hidden="true" />
                {recipe.servings} servings
              </span>
            )}

            {!recipe.prepTime && !recipe.cookTime && !recipe.servings && (
              <span style={{ color: '#E8622A' }}>View Recipe</span>
            )}
          </div>

          <div style={{
            marginTop: '0.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}>
            <RatingStars total={recipe.ratingTotal} count={recipe.ratingCount} />
            {recipe.difficulty && (
              <span style={{
                background: recipe.difficulty === 'easy'
                  ? 'rgba(34,197,94,0.1)'
                  : recipe.difficulty === 'medium'
                  ? 'rgba(234,179,8,0.1)'
                  : 'rgba(239,68,68,0.1)',
                color: recipe.difficulty === 'easy'
                  ? '#16a34a'
                  : recipe.difficulty === 'medium'
                  ? '#ca8a04'
                  : '#dc2626',
                padding: '0.2rem 0.6rem',
                borderRadius: '50px',
                fontSize: '0.72rem',
                fontWeight: '700',
                fontFamily: '"Lato", sans-serif',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                {recipe.difficulty === 'easy' ? 'Easy' : recipe.difficulty === 'medium' ? 'Medium' : 'Hard'}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
