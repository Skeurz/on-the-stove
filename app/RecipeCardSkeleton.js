'use client'

/**
 * Skeleton placeholder for the RecipeCard component.
 * Mimics the card structure with a pulse animation.
 */
export default function RecipeCardSkeleton() {
  return (
    <div style={{
      background: 'var(--cream)',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid var(--gray)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '340px',
    }}>
      {/* Image Skeleton Placeholder */}
      <div className="skeleton-pulse" style={{
        width: '100%',
        aspectRatio: '2/1',
        background: 'var(--gray)',
        opacity: 0.6,
      }} />
      
      {/* Content Skeleton Placeholder */}
      <div style={{ padding: '1.25rem', flex: 1 }}>
        <div className="skeleton-pulse" style={{
          height: '1.4rem',
          width: '85%',
          background: 'var(--gray)',
          borderRadius: '4px',
          marginBottom: '1rem',
        }} />
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <div className="skeleton-pulse" style={{
            height: '0.75rem',
            width: '25%',
            background: 'var(--gray)',
            borderRadius: '4px',
          }} />
          <div className="skeleton-pulse" style={{
            height: '0.75rem',
            width: '20%',
            background: 'var(--gray)',
            borderRadius: '4px',
          }} />
        </div>
      </div>

      <style jsx>{`
        .skeleton-pulse { animation: pulse 1.5s ease-in-out infinite; }
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 0.8; } 100% { opacity: 0.5; } }
      `}</style>
    </div>
  )
}