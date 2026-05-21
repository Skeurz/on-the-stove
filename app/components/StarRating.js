'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const STORAGE_KEY = 'on-the-stove-rated-recipes'
const BROWSER_ID_KEY = 'on-the-stove-rating-browser-id'

function getBrowserId() {
  if (typeof window === 'undefined') return ''

  const existing = localStorage.getItem(BROWSER_ID_KEY)
  if (existing) return existing

  const bytes = new Uint8Array(16)
  window.crypto.getRandomValues(bytes)
  const id = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
  localStorage.setItem(BROWSER_ID_KEY, id)
  return id
}

function getStoredVotes() {
  if (typeof window === 'undefined') return {}

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function getStoredVote(slug) {
  const vote = getStoredVotes()[slug]
  return Number.isInteger(vote) && vote >= 1 && vote <= 5 ? vote : null
}

function setStoredVote(slug, value) {
  const votes = getStoredVotes()
  votes[slug] = value
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes))
}

function StarIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.9 14.8 8.6l6.3.9-4.6 4.4 1.1 6.3L12 17.3l-5.6 2.9 1.1-6.3-4.6-4.4 6.3-.9L12 2.9Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function StarRating({ slug }) {
  const [rating, setRating] = useState({ average: 0, count: 0, userVote: null })
  const [hoveredStar, setHoveredStar] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [justVoted, setJustVoted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedVote = getStoredVote(slug)
    const browserId = getBrowserId()

    fetch(`/api/recipes/${slug}/rating`, {
      headers: { 'x-rating-browser-id': browserId },
    })
      .then(res => res.json())
      .then(data => {
        if (!storedVote && data.userVote) {
          setStoredVote(slug, data.userVote)
        }

        setRating({
          average: data.average || 0,
          count: data.count || 0,
          userVote: storedVote || data.userVote || null,
        })
        setLoading(false)
      })
      .catch(() => {
        if (storedVote) {
          setRating(prev => ({ ...prev, userVote: storedVote }))
        }
        setLoading(false)
      })
  }, [slug])

  const handleClick = useCallback(async (value) => {
    const storedVote = getStoredVote(slug)

    if (storedVote) {
      setRating(prev => ({ ...prev, userVote: storedVote }))
      setMessage('You already rated this recipe in this browser.')
      return
    }

    if (submitting || rating.userVote) return

    setSubmitting(true)
    setMessage('')

    try {
      const browserId = getBrowserId()
      const res = await fetch(`/api/recipes/${slug}/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, browserId }),
      })

      const data = await res.json()

      if (res.ok) {
        setJustVoted(true)
        setStoredVote(slug, data.userVote)
        setRating({
          average: data.average,
          count: data.count,
          userVote: data.userVote,
        })
        setMessage('Thanks for rating! 😊')
        router.refresh()
      } else if (res.status === 409) {
        setStoredVote(slug, value)
        setRating(prev => ({ ...prev, userVote: value }))
        setMessage('You have already rated this recipe.')
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
        justifyContent: 'center',
        gap: '0.12rem',
        opacity: 0.45,
      }}>
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} style={{ color: '#E0D6CC', lineHeight: 1 }}>
            <StarIcon filled />
          </span>
        ))}
      </div>
    )
  }

  const displayStars = rating.userVote || hoveredStar || Math.round(rating.average)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.45rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.08rem' }}>
        {[1, 2, 3, 4, 5].map(star => {
          const filled = star <= displayStars

          return (
            <button
              key={star}
              className={justVoted && rating.userVote === star ? 'animate-burst' : ''}
              onClick={() => handleClick(star)}
              onMouseEnter={() => !rating.userVote && setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              disabled={!!rating.userVote || submitting}
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              style={{
                width: '22px',
                height: '22px',
                padding: '2px',
                background: 'none',
                border: 'none',
                color: filled ? '#E8622A' : '#D8C7B8',
                cursor: rating.userVote ? 'default' : 'pointer',
                lineHeight: 0,
                transform: (hoveredStar >= star && !rating.userVote) ? 'scale(1.12)' : 'scale(1)',
                transition: 'color 0.15s ease, transform 0.12s ease',
              }}
            >
              <StarIcon filled={filled} />
            </button>
          )
        })}
      </div>

      <div style={{
        minHeight: '1.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        {rating.userVote ? (
          <span style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.72rem',
            color: '#E8622A',
            fontWeight: '700',
          }}>
            Your vote: {rating.userVote}
          </span>
        ) : rating.count > 0 && !hoveredStar ? (
          <span style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.78rem',
            color: 'var(--text)',
            fontWeight: '700',
          }}>
            {rating.average.toFixed(1)}
            <span style={{ color: 'var(--text-light)', fontSize: '0.72rem', fontWeight: '400' }}>
              {' '}({rating.count})
            </span>
          </span>
        ) : null}
      </div>

      <span style={{
        fontFamily: '"Lato", sans-serif',
        fontSize: '0.7rem',
        color: 'var(--text-light)',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
      }}>
        {rating.count} total vote{rating.count === 1 ? '' : 's'}
      </span>

      {message && (
        <p className="animate-success" style={{
          margin: 0,
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.72rem',
          color: 'var(--text-light)',
          fontStyle: 'italic',
          lineHeight: 1.35,
          textAlign: 'center',
        }}>
          {message}
        </p>
      )}
    </div>
  )
}
