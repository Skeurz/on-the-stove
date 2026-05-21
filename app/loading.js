'use client'

import RecipeCardSkeleton from './RecipeCardSkeleton'

export default function Loading() {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
      {/* Hero Section Placeholder */}
      <div style={{
        height: '60vh',
        minHeight: '520px',
        background: '#1E0E05',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '-68px',
      }}>
        <div style={{ 
          width: 'min(90%, 500px)', 
          height: '4rem', 
          background: 'rgba(255,255,255,0.05)', 
          borderRadius: '12px', 
          marginBottom: '1.5rem' 
        }} />
        <div style={{ 
          width: 'min(70%, 300px)', 
          height: '1.2rem', 
          background: 'rgba(255,255,255,0.03)', 
          borderRadius: '8px' 
        }} />
      </div>

      {/* Recipes Grid Placeholder */}
      <section className="content-section" style={{
        maxWidth: '1200px',
        margin: '4rem auto',
        padding: '0 1rem'
      }}>
        <div className="homepage-recipes-layout">
          <div style={{ flex: 1 }}>
            <div style={{
              height: '3.5rem',
              width: '260px',
              background: 'var(--cream)',
              border: '1px solid var(--gray)',
              borderRadius: '12px',
              marginBottom: '2rem'
            }} />

            {/* Grid of 8 Skeletons (Matching RECIPES_PER_PAGE) */}
            <div className="recipe-grid">
              {[...Array(8)].map((_, i) => (
                <RecipeCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  )
}