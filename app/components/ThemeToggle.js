'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = saved === 'dark' || (!saved && prefersDark)
    setDark(initial)
    applyTheme(initial)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    applyTheme(dark)
  }, [dark])

  const applyTheme = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }

  return (
    <button
      onClick={() => setDark(!dark)}
      className="button theme-toggle"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      style={{
        background: dark ? 'rgba(253,246,238,0.1)' : 'rgba(30,14,5,0.1)',
        border: dark ? '1px solid rgba(253,246,238,0.2)' : '1px solid rgba(30,14,5,0.15)',
        color: dark ? '#FDF6EE' : '#1E0E05',
        padding: '0.4rem 0.8rem',
        borderRadius: '50px',
        fontSize: '0.85rem',
        fontWeight: '700',
        cursor: 'pointer',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontFamily: '"Lato", sans-serif',
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{ fontSize: '1rem' }}>{dark ? '🌙' : '☀️'}</span>
      <span style={{ fontSize: '0.78rem' }}>{dark ? 'Dark' : 'Light'}</span>
    </button>
  )
}