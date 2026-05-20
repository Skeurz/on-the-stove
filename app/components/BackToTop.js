'use client'

import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      className="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '58px',
        height: '58px',
        padding: 0,
        border: '1px solid rgba(253,246,238,0.28)',
        borderRadius: '18px',
        background: 'linear-gradient(145deg, #F4946A 0%, #E8622A 48%, #8E3A16 100%)',
        color: '#FFF8EC',
        cursor: 'pointer',
        zIndex: 999,
        boxShadow: '0 16px 34px rgba(61,32,16,0.28), inset 0 1px 8px rgba(255,255,255,0.24)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s, filter 0.2s',
      }}
      aria-label="Back to top"
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 35% 20%, rgba(255,255,255,0.28), transparent 42%)',
        }}
      />
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        style={{
          position: 'relative',
          zIndex: 1,
          filter: 'drop-shadow(0 2px 3px rgba(61,32,16,0.28))',
        }}
      >
        <path
          d="M18 5.5c-3.3 3-4.2 5.4-2.7 7.2M24 6.8c-2.3 2.4-2.8 4.2-1.5 5.5M12 7.8c-2.2 2.2-2.6 3.9-1.2 5.2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8.5 17.5h17.8c.3 0 .6.3.6.6v1.1c0 5-4.1 9.1-9.1 9.1h-.8c-5 0-9.1-4.1-9.1-9.1v-1.1c0-.3.3-.6.6-.6Z"
          fill="#FFF8EC"
          opacity="0.95"
        />
        <path
          d="M26.8 19.2h3.1c1.5 0 2.7 1.2 2.7 2.7s-1.2 2.7-2.7 2.7h-3.8"
          stroke="#FFF8EC"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M9.1 17.6h17.4M11.2 30h14.2"
          stroke="#7A4528"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M18 25V15M18 15l-3.6 3.6M18 15l3.6 3.6"
          stroke="#E8622A"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
