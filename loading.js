'use client'

import RecipeCardSkeleton from '../RecipeCardSkeleton'

export default function Loading() {
  return (
    <div style={{ background: 'var(--cream-light)', minHeight: '100vh' }}>
      <div style={{
        background: '#1E0E05',
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
        marginTop: '-68px'
      }}>
        <div style={{ 
          width: '280px', 
          height: '3.5rem', 
          background: 'rgba(255,255,255,0.05)', 
          borderRadius: '12px', 
          margin: '0 auto 1.5rem' 
        }} />
        <div style={{ 
          width: 'min(90%, 400px)', 
          height: '1.2rem', 
          background: 'rgba(255,255,255,0.03)', 
          borderRadius: '8px',
          margin: '0 auto'
        }} />
      </div>

      <main style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div className="recipe-grid">
          {[...Array(6)].map((_, i) => (
            <RecipeCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  )
}