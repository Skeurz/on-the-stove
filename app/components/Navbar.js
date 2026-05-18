'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'Lunch', href: '/category/lunch' },
  { label: 'Dinner', href: '/category/dinner' },
  { label: 'Breakfast', href: '/category/breakfastnbrunch' },
  { label: 'Snacks & Sides', href: '/category/snacksnsides' },
  { label: 'Desserts', href: '/category/desserts' },
  { label: 'Drinks & Shakes', href: '/category/drinks-shakes' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

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
        padding: '0 2rem',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: '"Playfair Display", serif',
          color: '#FDF6EE',
          fontSize: '1.4rem',
          fontWeight: '700',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ color: '#E8622A', fontSize: '1.6rem' }}>🔥</span>
          On The Stove
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>

          <Link href="/" style={{
            color: 'rgba(253,246,238,0.7)',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.88rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '6px',
          }}>
            Home
          </Link>

          {/* Recipes Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
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
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}>▼</span>
            </button>

            {/* Dropdown menu */}
            {open && (
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
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.6rem 0.9rem',
                      fontFamily: '"Lato", sans-serif',
                      fontSize: '0.88rem',
                      color: 'rgba(253,246,238,0.75)',
                      borderRadius: '6px',
                      transition: 'background 0.15s, color 0.15s',
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
            letterSpacing: '0.3px',
          }}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}