'use client'

import { useCallback, useState } from 'react'
import { Star } from 'lucide-react'
import StarRating from './StarRating'

function normalizeBreakdown(breakdown = {}) {
  return {
    star1: breakdown.star1 || 0,
    star2: breakdown.star2 || 0,
    star3: breakdown.star3 || 0,
    star4: breakdown.star4 || 0,
    star5: breakdown.star5 || 0,
  }
}

function RatingBreakdown({ count, breakdown }) {
  const normalized = normalizeBreakdown(breakdown)

  return (
    <div style={{
      marginTop: '1.25rem',
      display: 'grid',
      gap: '0.5rem',
      width: '100%',
    }}>
      {[5, 4, 3, 2, 1].map(stars => {
        const starCount = normalized[`star${stars}`]
        const percentage = count ? (starCount / count) * 100 : 0

        return (
          <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
            <span className="icon-text" style={{ minWidth: '45px', fontWeight: '700', color: 'var(--text)', justifyContent: 'flex-start' }}>
              {stars} <Star size={12} fill="currentColor" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div style={{ flex: 1, height: '6px', background: 'var(--gray)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{
                width: `${percentage}%`,
                height: '100%',
                background: 'var(--orange)',
                transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }} />
            </div>
            <span style={{ minWidth: '16px', textAlign: 'right', color: 'var(--text)' }}>{starCount}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function RecipeRatingPanel({ slug, initialCount = 0, initialBreakdown = {} }) {
  const [stats, setStats] = useState({
    count: initialCount,
    ratingBreakdown: normalizeBreakdown(initialBreakdown),
  })

  const handleRatingChange = useCallback((nextRating) => {
    setStats({
      count: nextRating.count || 0,
      ratingBreakdown: normalizeBreakdown(nextRating.ratingBreakdown),
    })
  }, [])

  return (
    <>
      <StarRating slug={slug} onRatingChange={handleRatingChange} />
      <RatingBreakdown count={stats.count} breakdown={stats.ratingBreakdown} />
    </>
  )
}
