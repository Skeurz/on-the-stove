'use client'

import { useState } from 'react'
import { Clock, Flame, Timer, ChartBar, Globe, Utensils, Zap, FlaskConical, ChefHat} from 'lucide-react'


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
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '0',
        borderBottom: '1px solid var(--gray)',
        background: 'var(--cream)',
      }}>
        {[
          recipe.prepTime && { icon: <Clock size={22} strokeWidth={1.5} />, label: 'Prep Time', value: `${recipe.prepTime} mins` },
          recipe.cookTime && { icon: <Flame size={22} strokeWidth={1.5} />, label: 'Cook Time', value: `${recipe.cookTime} mins` },
          (recipe.prepTime || recipe.cookTime) && { icon: <Timer size={22} strokeWidth={1.5} />, label: 'Total Time', value: (() => {
            const total = (recipe.prepTime || 0) + (recipe.cookTime || 0)
            if (total >= 60) return `${Math.floor(total / 60)} hr${Math.floor(total / 60) > 1 ? 's' : ''}${total % 60 > 0 ? ` ${total % 60} min` : ''}`
            return `${total} mins`
          })() },
          recipe.difficulty && { icon: <ChartBar size={22} strokeWidth={1.5} />, label: 'Difficulty', value: difficultyLabel[recipe.difficulty] },
          recipe.cuisine && { icon: <Globe size={22} strokeWidth={1.5} />, label: 'Cuisine', value: cuisineLabel[recipe.cuisine] || recipe.cuisine },
          recipe.servings && { icon: <Utensils size={22} strokeWidth={1.5} />, label: 'Servings', value: `${recipe.servings} servings` },
          recipe.calories && { icon: <Zap size={22} strokeWidth={1.5} />, label: 'Calories', value: `${recipe.calories} kcal` },
        ].filter(Boolean).map((stat, i, arr) => (
          <div key={i} style={{
            padding: '1.25rem 1rem',
            textAlign: 'center',
            borderRight: '1px solid var(--gray)',
            borderBottom: '1px solid var(--gray)',
            position: 'relative',
            transition: 'background 0.2s',
          }}>
            <div style={{
              color: 'var(--orange)',
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'center',
            }}>{stat.icon}
            </div>
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              marginBottom: '0.3rem',
              fontWeight: '800',
            }}>{stat.label}</p>
            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1rem',
              color: 'var(--brown)',
              fontWeight: '600',
              margin: 0,
              lineHeight: 1.3,
            }}>{stat.value}</p>
          </div>
        ))}
      </div>
      

      {/* Servings Scaler */}
      {false && (
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
              }}><FlaskConical size={16} strokeWidth={1.5} style={{ display: 'inline', marginRight: '0.4rem', color: 'var(--orange)' }} />Ingredients</h3>
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
             }}><ChefHat size={16} strokeWidth={1.5} style={{ display: 'inline', marginRight: '0.4rem', color: 'var(--orange)' }} />Instructions</h3>
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
    </div>
  )
}