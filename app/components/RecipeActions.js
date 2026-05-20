'use client'

export default function RecipeActions() {
  return (
    <div className="recipe-action-row">
      <a href="#recipe-details" className="recipe-action-button recipe-action-primary">
        Jump to Recipe
      </a>
      <button
        type="button"
        className="recipe-action-button recipe-action-secondary"
        onClick={() => window.print()}
      >
        Print Recipe
      </button>
    </div>
  )
}
