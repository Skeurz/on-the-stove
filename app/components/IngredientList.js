'use client'

import { useState, useEffect } from 'react'

export default function IngredientList({ ingredients, recipeSlug }) {
  const [checked, setChecked] = useState({})
  const [mounted, setMounted] = useState(false)
  const storageKey = `ingredients-${recipeSlug}`

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setChecked(JSON.parse(saved))
    } catch { }
  }, [storageKey])

  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked))
    } catch { }
  }, [checked, mounted, storageKey])

  const toggle = (index) => {
    setChecked(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const allChecked = ingredients.every((_, i) => checked[i])

  const resetAll = () => {
    setChecked({})
    try { localStorage.removeItem(storageKey) } catch { }
  }

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {ingredients.map((item, i) => (
          <li
            key={i}
            onClick={() => toggle(i)}
            style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '1rem',
              color: checked[i] ? 'var(--text-light)' : 'var(--text)',
              padding: '0.7rem 0',
              borderBottom: '1px solid var(--gray)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.8rem',
              lineHeight: 1.6,
              cursor: 'pointer',
              transition: 'color 0.2s',
              textDecoration: checked[i] ? 'line-through' : 'none',
              opacity: checked[i] ? 0.5 : 1,
              userSelect: 'none',
            }}
          >
            <span style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: checked[i] ? '2px solid var(--orange)' : '2px solid #D8C7B8',
              background: checked[i] ? 'var(--orange)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
              transition: 'all 0.2s ease',
            }}>
              {checked[i] && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div style={{
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            height: '4px',
            background: 'var(--gray)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(Object.values(checked).filter(Boolean).length / ingredients.length) * 100}%`,
              background: 'var(--orange)',
              borderRadius: '10px',
              transition: 'width 0.3s ease',
            }} />
          </div>
          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.72rem',
            color: 'var(--text-light)',
            marginTop: '0.35rem',
          }}>
            {Object.values(checked).filter(Boolean).length} of {ingredients.length} checked
          </p>
        </div>

        {Object.values(checked).some(Boolean) && !allChecked && (
          <button onClick={resetAll} style={{
            background: 'none',
            border: '1px solid var(--gray)',
            borderRadius: '50px',
            padding: '0.3rem 0.85rem',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.75rem',
            color: 'var(--text-light)',
            cursor: 'pointer',
            flexShrink: 0,
          }}>
            Reset
          </button>
        )}

        {allChecked && (
          <span style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.78rem',
            color: 'var(--orange)',
            fontWeight: '700',
          }}>
            ✅ All done!
          </span>
        )}
      </div>
    </div>
  )
}