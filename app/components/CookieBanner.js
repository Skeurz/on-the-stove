'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 3rem)',
      maxWidth: '620px',
      background: 'linear-gradient(135deg, #1A0A02 0%, #2D1205 100%)',
      border: '1px solid rgba(232,98,42,0.3)',
      borderRadius: '20px',
      padding: '1.25rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap',
      zIndex: 9999,
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
    }}>
      <p style={{
        fontFamily: '"Lato", sans-serif',
        fontSize: '0.85rem',
        color: 'rgba(253,246,238,0.8)',
        lineHeight: 1.6,
        margin: 0,
        flex: 1,
        minWidth: '200px',
      }}>
        🍪 We use cookies to improve your experience. See our{' '}
        <a href="/privacy-policy" style={{ color: 'var(--orange-light)', textDecoration: 'underline' }}>Privacy Policy</a>.
      </p>
      <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
        <button onClick={decline} style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(253,246,238,0.6)',
          fontFamily: '"Lato", sans-serif',
          fontWeight: '700',
          fontSize: '0.82rem',
          padding: '0.5rem 1.1rem',
          borderRadius: '50px',
          cursor: 'pointer',
        }}>Decline</button>
        <button onClick={accept} style={{
          background: 'var(--orange)',
          border: 'none',
          color: 'white',
          fontFamily: '"Lato", sans-serif',
          fontWeight: '700',
          fontSize: '0.82rem',
          padding: '0.5rem 1.25rem',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(232,98,42,0.35)',
        }}>Accept</button>
      </div>
    </div>
  )
}