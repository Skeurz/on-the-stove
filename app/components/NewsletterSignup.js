'use client'

import { useState } from 'react'
import { CheckCircle2, Sparkles } from 'lucide-react'

export default function NewsletterSignup({ source = 'website', compact = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Thanks for subscribing!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (compact) {
    return (
      <div style={{ width: '100%' }}>
        {status === 'success' ? (
          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.9rem',
            color: 'var(--orange)',
            fontWeight: '700',
            textAlign: 'center',
            padding: '0.75rem',
          }}>
            <CheckCircle2 className="inline-icon" size={16} strokeWidth={1.8} aria-hidden="true" /> {message}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="compact-newsletter-form" style={{
            display: 'flex',
            gap: '0.5rem',
          }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                flex: 1,
                minWidth: 0,
                border: '1px solid var(--gray)',
                borderRadius: '50px',
                background: 'var(--cream)',
                color: 'var(--text)',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.875rem',
                padding: '0.6rem 1rem',
                outlineColor: 'var(--orange)',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="button"
              style={{
                background: 'var(--orange)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '0.6rem 1.25rem',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.875rem',
                fontWeight: '700',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                flexShrink: 0,
              }}
            >
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.78rem',
            color: '#dc2626',
            marginTop: '0.5rem',
            textAlign: 'center',
          }}>
            {message}
          </p>
        )}
      </div>
    )
  }

  return (
    <section style={{
      background: 'linear-gradient(135deg, #1A0A02 0%, #2D1205 50%, #1A0A02 100%)',
      borderRadius: '24px',
      padding: 'clamp(2rem, 5vw, 3.5rem)',
      textAlign: 'center',
      border: '1px solid rgba(232,98,42,0.2)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'rgba(232,98,42,0.08)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-40px', left: '-40px',
        width: '160px', height: '160px', borderRadius: '50%',
        background: 'rgba(232,98,42,0.05)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          color: 'var(--orange)',
          marginBottom: '0.75rem',
          fontWeight: '700',
        }}>
          Never Miss a Recipe
        </p>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          color: 'white',
          marginBottom: '0.75rem',
          lineHeight: 1.2,
        }}>
          Get New Recipes <em style={{ color: 'var(--orange-light)' }}>Every Week</em>
        </h2>
        <p style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.65)',
          marginBottom: '2rem',
          maxWidth: '400px',
          margin: '0 auto 2rem',
          lineHeight: 1.7,
        }}>
          {"Join Adelaide's kitchen and get fresh, simple recipes delivered straight to your inbox."}
        </p>

        {status === 'success' ? (
          <div style={{
            background: 'rgba(232,98,42,0.15)',
            border: '1px solid rgba(232,98,42,0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            maxWidth: '400px',
            margin: '0 auto',
          }}>
            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.2rem',
              color: 'white',
              marginBottom: '0.5rem',
            }}>
              <CheckCircle2 className="inline-icon" size={20} strokeWidth={1.8} aria-hidden="true" /> {"You're in!"}
            </p>
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.7)',
            }}>
              {message}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: '0.75rem',
            maxWidth: '440px',
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              style={{
                flex: '1 1 240px',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.9rem',
                padding: '0.8rem 1.25rem',
                outlineColor: 'var(--orange)',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="button"
              style={{
                background: 'var(--orange)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '0.8rem 2rem',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                boxShadow: '0 4px 20px rgba(232,98,42,0.4)',
                flexShrink: 0,
              }}
            >
              {status === 'loading' ? 'Subscribing...' : (
                <>
                  <Sparkles size={16} strokeWidth={1.8} aria-hidden="true" />
                  Subscribe For Free
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.82rem',
            color: '#fca5a5',
            marginTop: '1rem',
          }}>
            {message}
          </p>
        )}

        <p style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.35)',
          marginTop: '1.25rem',
        }}>
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
