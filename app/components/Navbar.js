'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'Lunch', href: '/category/lunch' },
  { label: 'Dinner', href: '/category/dinner' },
  { label: 'Breakfast & Brunch', href: '/category/breakfastnbrunch' },
  { label: 'Snacks & Sides', href: '/category/snacksnsides' },
  { label: 'Desserts', href: '/category/desserts' },
  { label: 'Drinks & Shakes', href: '/category/drinks-shakes' },
]

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header style={{
      background: '#1E0E05',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" onClick={() => setMobileOpen(false)} style={{
          fontFamily: '"Playfair Display", serif',
          color: '#FDF6EE',
          fontSize: '1.3rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
          <span style={{ color: '#E8622A', fontSize: '1.5rem' }}>🔥</span>
          On The Stove
        </Link>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
        }}
          className="desktop-nav"
        >
          <Link href="/" style={{
            color: 'rgba(253,246,238,0.7)',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.88rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '6px',
          }}>
            Home
          </Link>

          {/* Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button style={{
              background: 'none',
              border: 'none',
              color: 'rgba(253,246,238,0.7)',
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.88rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}>
              Recipes
              <span style={{
                fontSize: '0.65rem',
                transition: 'transform 0.2s',
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}>▼</span>
            </button>

            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: '#2A1208',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: '0.5rem',
                minWidth: '180px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}>
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.6rem 0.9rem',
                      fontFamily: '"Lato", sans-serif',
                      fontSize: '0.88rem',
                      color: 'rgba(253,246,238,0.75)',
                      borderRadius: '6px',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(232,98,42,0.15)'
                      e.currentTarget.style.color = '#F4946A'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'rgba(253,246,238,0.75)'
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" style={{
            color: 'rgba(253,246,238,0.7)',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.88rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '6px',
          }}>
            About
          </Link>

          <Link href="/contact" style={{
            background: '#E8622A',
            color: 'white',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.85rem',
            fontWeight: '700',
            padding: '0.45rem 1.1rem',
            borderRadius: '50px',
            marginLeft: '0.25rem',
          }}>
            Contact
          </Link>
        </nav>

        {/* Hamburger button - mobile only */}
        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'none',
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: '#2A1208',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '1rem 1.5rem 1.5rem',
        }}
          className="mobile-menu"
        >
          <Link href="/" onClick={() => setMobileOpen(false)} style={{
            display: 'block',
            color: 'rgba(253,246,238,0.8)',
            fontFamily: '"Lato", sans-serif',
            fontSize: '1rem',
            padding: '0.75rem 0',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            Home
          </Link>

          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#E8622A',
            margin: '1rem 0 0.5rem',
          }}>
            Recipes
          </p>

          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                color: 'rgba(253,246,238,0.7)',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.95rem',
                padding: '0.6rem 0.75rem',
                borderRadius: '6px',
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link href="/about" onClick={() => setMobileOpen(false)} style={{
            display: 'block',
            color: 'rgba(253,246,238,0.8)',
            fontFamily: '"Lato", sans-serif',
            fontSize: '1rem',
            padding: '0.75rem 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            marginTop: '0.5rem',
          }}>
            About
          </Link>

          <Link href="/contact" onClick={() => setMobileOpen(false)} style={{
            display: 'block',
            background: '#E8622A',
            color: 'white',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.95rem',
            fontWeight: '700',
            padding: '0.75rem 1.5rem',
            borderRadius: '50px',
            textAlign: 'center',
            marginTop: '1rem',
          }}>
            Contact
          </Link>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </header>
  )
}