'use client'

import { useState } from 'react'
import { Check, Clock, Flame, Timer, ChartBar, Globe, Utensils, Zap, FlaskConical, ChefHat, Printer, Star } from 'lucide-react'


const difficultyLabel = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
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
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div role="button"
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
  }}>
  <Printer size={15} strokeWidth={1.8} aria-hidden="true" />
  Print
      </div>
          {[
            {
              bg: '#1877F2',
              href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://onthestove.com/${slug}`)}`,
              icon: <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
            },
            {
              bg: '#E60023',
              href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://onthestove.com/${slug}`)}&description=${encodeURIComponent(recipe.title)}`,
              icon: <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>,
            },
            {
              bg: '#000',
              href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://onthestove.com/${slug}`)}&text=${encodeURIComponent(`Check out this recipe: ${recipe.title}`)}`,
              icon: <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
            },
          ].map(({ bg, href, icon }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: bg, color: 'white', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', flexShrink: 0,
            }}>
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '0',
        borderBottom: '1px solid var(--gray)',
        background: 'var(--cream)',
      }}>
        {[
          recipe.prepTime && { icon: <Clock size={18} strokeWidth={1.5} />, label: 'Prep Time', value: `${recipe.prepTime} mins` },
          recipe.cookTime && { icon: <Flame size={18} strokeWidth={1.5} />, label: 'Cook Time', value: `${recipe.cookTime} mins` },
          (recipe.prepTime || recipe.cookTime) && { icon: <Timer size={18} strokeWidth={1.5} />, label: 'Total Time', value: (() => {
            const total = (recipe.prepTime || 0) + (recipe.cookTime || 0)
            if (total >= 60) return `${Math.floor(total / 60)} hr${Math.floor(total / 60) > 1 ? 's' : ''}${total % 60 > 0 ? ` ${total % 60} min` : ''}`
            return `${total} mins`
          })() },
          recipe.difficulty && { icon: <ChartBar size={18} strokeWidth={1.5} />, label: 'Difficulty', value: difficultyLabel[recipe.difficulty] },
          recipe.cuisine && { icon: <Globe size={18} strokeWidth={1.5} />, label: 'Cuisine', value: cuisineLabel[recipe.cuisine] || recipe.cuisine },
          recipe.servings && { icon: <Utensils size={18} strokeWidth={1.5} />, label: 'Servings', value: `${recipe.servings} servings` },
          recipe.calories && { icon: <Zap size={18} strokeWidth={1.5} />, label: 'Calories',value: `${recipe.calories} kcal / serving` },
          recipe.ratingCount > 0 && { icon: <Star size={18} strokeWidth={1.5} />, label: 'Rating', value: `${Math.round((recipe.ratingTotal / recipe.ratingCount) * 10) / 10} / 5` },
        ].filter(Boolean).map((stat, i, arr) => (
          <div key={i} style={{
            padding: '0.85rem 0.75rem',
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
            <Utensils size={15} strokeWidth={1.8} aria-hidden="true" />
            Servings:
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
                    <Check size={14} strokeWidth={2} style={{ color: 'var(--orange)', flexShrink: 0, marginTop: '0.2rem' }} aria-hidden="true" />
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
