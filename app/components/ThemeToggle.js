'use client'

import { useEffect, useSyncExternalStore } from 'react'

const THEME_EVENT = 'theme-change'

const applyTheme = (isDark) => {
  if (typeof document === 'undefined') return

  document.documentElement.classList.toggle('dark', isDark)
  document.documentElement.classList.toggle('light', !isDark)
}

const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'light'

  return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
}

const subscribeToTheme = (callback) => {
  window.addEventListener(THEME_EVENT, callback)
  window.addEventListener('storage', callback)

  return () => {
    window.removeEventListener(THEME_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

const setStoredTheme = (theme) => {
  localStorage.setItem('theme', theme)
  window.dispatchEvent(new Event(THEME_EVENT))
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getStoredTheme, () => 'light')
  const dark = theme === 'dark'

  useEffect(() => {
    applyTheme(dark)
  }, [dark])

  return (
    <button
      onClick={() => setStoredTheme(dark ? 'light' : 'dark')}
      className="button theme-toggle"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      style={{
        position: 'relative',
        width: '96px',
        height: '42px',
        padding: '3px',
        borderRadius: '999px',
        border: dark ? '1px solid rgba(253,246,238,0.22)' : '1px solid rgba(122,69,40,0.22)',
        background: dark
          ? 'linear-gradient(135deg, #1E0E05 0%, #3D2010 58%, #6E3217 100%)'
          : 'linear-gradient(135deg, #FFF4D7 0%, #F4946A 48%, #E8622A 100%)',
        boxShadow: dark
          ? 'inset 0 1px 6px rgba(0,0,0,0.45), 0 10px 24px rgba(0,0,0,0.22)'
          : 'inset 0 1px 6px rgba(255,255,255,0.45), 0 10px 24px rgba(232,98,42,0.22)',
        cursor: 'pointer',
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '5px 9px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: dark ? 'rgba(253,246,238,0.62)' : 'rgba(30,14,5,0.58)',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M20.3 15.2A7.7 7.7 0 0 1 8.8 3.7 8.6 8.6 0 1 0 20.3 15.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M16.6 5.6h.01M19 8.4h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '4px',
          left: dark ? '54px' : '4px',
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: dark
            ? 'radial-gradient(circle at 35% 28%, #FDF6EE 0 16%, #C4B5A0 17% 42%, #7A4528 43% 100%)'
            : 'radial-gradient(circle at 35% 28%, #FFF9EA 0 15%, #FFD98E 16% 41%, #E8622A 42% 100%)',
          boxShadow: dark
            ? '0 4px 12px rgba(0,0,0,0.35), inset -4px -5px 8px rgba(30,14,5,0.35)'
            : '0 4px 14px rgba(122,69,40,0.25), inset -4px -5px 8px rgba(122,69,40,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: dark ? '#2A1208' : '#FDF6EE',
          transition: 'left 0.24s ease, background 0.24s ease, color 0.24s ease',
        }}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <path d="M12 5c2.2 2.1 3.8 4.1 3.8 6.4a3.8 3.8 0 1 1-7.6 0C8.2 9.1 9.8 7.1 12 5Z" fill="currentColor" opacity="0.92" />
          <path d="M7 18.5h10M8.5 21h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
    </button>
  )
}
