'use client'

import { useState, useEffect, useCallback } from 'react'

export default function StarRating({ slug }) {
  const [rating, setRating] = useState({ average: 0, count: 0, userVote: null })
  const [hoveredStar, setHoveredStar] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`/api/recipes/${slug}/rating`)
      .then(res => res.json())
      .then(data => {
        setRating({
          average: data.average || 0,
          count: data.count || 0,
          userVote: data.userVote || null,
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  const handleClick = useCallback(async (value) => {
    if (submitting || rating.userVote) return

    setSubmitting(true)
    setMessage('')

    try {
      const res = await fetch(`/api/recipes/${slug}/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      })

      const data = await res.json()

      if (res.ok) {
        setRating({
          average: data.average,
          count: data.count,
          userVote: data.userVote,
        })
        setMessage('Thanks for rating! 😊')
      } else if (res.status === 409) {
        setMessage('You have already rated this recipe.')
        setRating(prev => ({ ...prev, userVote: value }))
      } else {
        setMessage(data.error || 'Failed to submit rating.')
      }
    } catch {
      setMessage('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [slug, submitting, rating.userVote])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 0',
        opacity: 0.5,
      }}>
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} style={{ fontSize: '1.5rem', color: '#E0D6CC' }}>★</span>
        ))}
        <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.85rem', color: '#A08070' }}>
          Loading...
        </span>
      </div>
    )
  }

  const displayStars = rating.userVote || hoveredStar || Math.round(rating.average)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.35rem',
      padding: '0.75rem 0',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', gap: '0.15rem' }}>
          {[1, 2, 3, 4, 5].map(star => {
            const filled = star <= displayStars
            const half = !filled && star - 0.5 <= displayStars

            return (
              <button
                key={star}
                onClick={() => handleClick(star)}
                onMouseEnter={() => !rating.userVote && setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                disabled={!!rating.userVote || submitting}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: rating.userVote ? 'default' : 'pointer',
                  fontSize: '1.6rem',
                  padding: '0 0.1rem',
                  color: filled ? '#E8622A' : '#E0D6CC',
                  transition: 'color 0.15s ease, transform 0.1s ease',
                  transform: (hoveredStar >= star && !rating.userVote) ? 'scale(1.2)' : 'scale(1)',
                  lineHeight: 1,
                }}
              >
                ★
              </button>
            )
          })}
        </div>

        {/* Average display */}
        {rating.count > 0 && !hoveredStar && (
          <span style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.9rem',
            color: '#6B5244',
            marginLeft: '0.3rem',
          }}>
            {rating.average.toFixed(1)}
            <span style={{ color: '#A08070', fontSize: '0.8rem' }}>
              {' '}({rating.count})
            </span>
          </span>
        )}

        {/* User vote indicator */}
        {rating.userVote && (
          <span style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.78rem',
            color: '#E8622A',
            fontWeight: '700',
            marginLeft: '0.3rem',
          }}>
            Your vote: {rating.userVote}
          </span>
        )}
      </div>

      {/* Message */}
      {message && (
        <p style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.82rem',
          color: '#6B5244',
          fontStyle: 'italic',
          margin: 0,
        }}>
          {message}
        </p>
      )}
    </div>
  )
}