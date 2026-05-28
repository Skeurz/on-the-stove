'use client'

export default function RecipeActions() {
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
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'var(--orange)',
          color: 'white',
          fontFamily: '"Lato", sans-serif',
          fontWeight: '800',
          fontSize: '0.9rem',
          padding: '0.85rem 2rem',
          borderRadius: '50px',
          textDecoration: 'none',
          letterSpacing: '0.5px',
          boxShadow: '0 4px 15px rgba(232,98,42,0.35)',
        }}
      >
        🍳 Jump to Recipe
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
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'var(--cream-light)',
          color: 'var(--brown)',
          fontFamily: '"Lato", sans-serif',
          fontWeight: '800',
          fontSize: '0.9rem',
          padding: '0.85rem 2rem',
          borderRadius: '50px',
          border: '2px solid var(--gray)',
          cursor: 'pointer',
          letterSpacing: '0.5px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
        }}
      >
        🖨️ Print Recipe
      </button>
    </div>
  )
}
