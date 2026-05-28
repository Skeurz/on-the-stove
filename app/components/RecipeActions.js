'use client'

import { ChefHat, Printer } from 'lucide-react'

export default function RecipeActions() {
  const buttonBase = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    fontFamily: '"Lato", sans-serif',
    fontWeight: '800',
    fontSize: '0.9rem',
    padding: '0.85rem 2rem',
    borderRadius: '50px',
    letterSpacing: '0.5px',
    minWidth: '190px',
    textAlign: 'center',
  }

  return (
    <div
      className="recipe-action-row"
      style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '1.5rem 0',
      }}
    >
      <a
        href="#recipe-facts"
        onClick={(e) => {
          e.preventDefault()
          document
            .getElementById('recipe-facts')
            ?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
        }}
        style={{
          ...buttonBase,
          background: 'var(--orange)',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 15px rgba(232,98,42,0.35)',
        }}
      >
        <ChefHat size={18} strokeWidth={1.8} aria-hidden="true" />
        <span>Jump to Recipe</span>
      </a>

      <button
        type="button"
        onClick={() => {
          const card = document.getElementById('recipe-facts')
          if (!card) return
          const original = document.body.innerHTML
          document.body.innerHTML = card.innerHTML
          window.print()
          document.body.innerHTML = original
          window.location.reload()
        }}
        style={{
          ...buttonBase,
          background: 'var(--cream-light)',
          color: 'var(--brown)',
          border: '2px solid var(--gray)',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
        }}
      >
        <Printer size={18} strokeWidth={1.8} aria-hidden="true" />
        <span>Print Recipe</span>
      </button>
    </div>
  )
}
