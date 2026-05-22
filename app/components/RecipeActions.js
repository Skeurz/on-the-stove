'use client'

export default function RecipeActions() {
  return (
    <div className="recipe-action-row" style={{ display: 'flex', gap: '0.85rem' }}>
      <a href="#recipe-ingredients" className="recipe-action-button recipe-action-primary">
        Jump to Recipe
      </a>
      <button
        type="button"
        className="recipe-action-button recipe-action-secondary"
        onClick={() => window.print()}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <span style={{ fontSize: '1.1rem' }}>🖨️</span>
        Print Recipe
      </button>
    </div>
  )
}
