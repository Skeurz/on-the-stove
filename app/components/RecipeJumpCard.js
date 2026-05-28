'use client'

import { useState } from 'react'
import StarRating from './StarRating'

const difficultyLabel = { easy: '🟢 Easy', medium: '🟡 Medium', hard: '🔴 Hard' }
const cuisineLabel = {
  american: 'American', italian: 'Italian', mexican: 'Mexican',
  asian: 'Asian', mediterranean: 'Mediterranean', french: 'French',
  'middle-eastern': 'Middle Eastern', other: 'Other'
}

export default function RecipeJumpCard({ recipe, slug }) {
  const [servings, setServings] = useState(recipe.servings || null)
  const ratio = recipe.servings ? servings / recipe.servings : 1

  const scaleIngredient = (ingredient) => {
    if (ratio === 1) return ingredient
    return ingredient.replace(/(\d+\.?\d*)/g, (match) => {
      const scaled = parseFloat(match) * ratio
      return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1)
    })
  }

  const handlePrint = () => window.print()

  return (
    <div style={{
      background: 'var(--cream-light)',
      border: '2px solid var(--gray)',
      borderRadius: '24px',
      overflow: 'hidden',
      marginBottom: '2rem',
      boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
    }}>

      {/* Card Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0A02 0%, #2D1205 100%)',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--orange-light)',
            marginBottom: '0.35rem',
            fontWeight: '700',
          }}>Recipe</p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            color: 'white',
            margin: 0,
            lineHeight: 1.2,
          }}>{recipe.title}</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={handlePrint}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50px',
              padding: '0.5rem 1.1rem',
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            🖨 Print
          </button>
        <a
            href="#recipe-ingredients"
            onClick={e => {
              e.preventDefault()
              document.getElementById('recipe-ingredients')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            style={{
              background: 'var(--orange)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '0.5rem 1.1rem',
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              textDecoration: 'none',
            }}
          >
            ↓ Jump to Recipe
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        borderBottom: '1px solid var(--gray)',
      }}>
        {[
          recipe.prepTime && { icon: '⏱', label: 'Prep', value: `${recipe.prepTime} min` },
          recipe.cookTime && { icon: '🔥', label: 'Cook', value: `${recipe.cookTime} min` },
          (recipe.prepTime || recipe.cookTime) && { icon: '🕐', label: 'Total', value: `${(recipe.prepTime || 0) + (recipe.cookTime || 0)} min` },
          recipe.calories && { icon: '⚡', label: 'Calories', value: recipe.calories },
          recipe.difficulty && { icon: '📊', label: 'Difficulty', value: difficultyLabel[recipe.difficulty] },
          recipe.cuisine && { icon: '🌍', label: 'Cuisine', value: cuisineLabel[recipe.cuisine] || recipe.cuisine },
        ].filter(Boolean).map((stat, i) => (
          <div key={i} style={{
            padding: '1rem',
            textAlign: 'center',
            borderRight: '1px solid var(--gray)',
          }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>{stat.icon}</p>
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--text-light)',
              marginBottom: '0.2rem',
              fontWeight: '700',
            }}>{stat.label}</p>
            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '0.9rem',
              color: 'var(--brown)',
              fontWeight: '700',
              margin: 0,
            }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Servings Scaler */}
      {recipe.servings && (
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--gray)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          background: 'rgba(232,98,42,0.03)',
        }}>
          <span style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.85rem',
            fontWeight: '700',
            color: 'var(--text)',
          }}>
            🍽 Servings:
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setServings(s => Math.max(1, s - 1))}
              style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                border: '1px solid var(--gray)',
                background: 'var(--cream)',
                color: 'var(--orange)',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >−</button>
            <span style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.1rem',
              fontWeight: '700',
              color: 'var(--brown)',
              minWidth: '2rem',
              textAlign: 'center',
            }}>{servings}</span>
            <button
              onClick={() => setServings(s => s + 1)}
              style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                border: '1px solid var(--gray)',
                background: 'var(--cream)',
                color: 'var(--orange)',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >+</button>
          </div>
          {ratio !== 1 && (
            <button
              onClick={() => setServings(recipe.servings)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.78rem',
                color: 'var(--orange)',
                cursor: 'pointer',
                fontWeight: '700',
              }}
            >
              Reset
            </button>
          )}
        </div>
      )}

      {/* Ingredients + Instructions — stacked vertically */}
      {(recipe.ingredients?.length > 0 || recipe.steps?.length > 0) && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Ingredients */}
          {recipe.ingredients?.length > 0 && (
            <div style={{
              padding: '1.5rem',
              borderBottom: recipe.steps?.length > 0 ? '1px solid var(--gray)' : 'none',
            }}>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.1rem',
                color: 'var(--brown)',
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: '2px solid var(--orange)',
              }}>🧂 Ingredients</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {recipe.ingredients.map((item, i) => (
                  <li key={i} style={{
                    fontFamily: '"Lato", sans-serif',
                    fontSize: '0.88rem',
                    color: 'var(--text)',
                    padding: '0.4rem 0',
                    borderBottom: '1px solid var(--gray)',
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'flex-start',
                    lineHeight: 1.5,
                  }}>
                    <span style={{ color: 'var(--orange)', flexShrink: 0 }}>•</span>
                    {ratio !== 1 ? scaleIngredient(item) : item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {recipe.steps?.length > 0 && (
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.1rem',
                color: 'var(--brown)',
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: '2px solid var(--orange)',
              }}>👨‍🍳 Instructions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recipe.steps.map((step, i) => (
                  <div key={step._key || i} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{
                      background: 'var(--orange)',
                      color: 'white',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: '"Lato", sans-serif',
                      fontWeight: '700',
                      fontSize: '0.75rem',
                      flexShrink: 0,
                    }}>{i + 1}</span>
                    <div>
                      {step.title && (
                        <p style={{
                          fontFamily: '"Playfair Display", serif',
                          fontSize: '0.88rem',
                          fontWeight: '700',
                          color: 'var(--brown)',
                          margin: 0,
                          marginBottom: '0.2rem',
                        }}>{step.title}</p>
                      )}
                      {step.description && (
                        <p style={{
                          fontFamily: '"Lato", sans-serif',
                          fontSize: '0.85rem',
                          color: 'var(--text)',
                          lineHeight: 1.6,
                          margin: 0,
                        }}>{step.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer — Rating */}
      <div style={{
        borderTop: '1px solid var(--gray)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'rgba(232,98,42,0.03)',
      }}>
        <div>
          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            fontWeight: '700',
            marginBottom: '0.35rem',
          }}>Rate this recipe</p>
          <StarRating slug={slug} />
        </div>
        <p style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.78rem',
          color: 'var(--text-light)',
          fontStyle: 'italic',
          maxWidth: '260px',
          lineHeight: 1.5,
          margin: 0,
        }}>
          Did you make this recipe? Leave a rating and let Adelaide know how it went!
        </p>
      </div>
    </div>
  )
}