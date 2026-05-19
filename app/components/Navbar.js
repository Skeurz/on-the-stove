'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { label: 'Lunch', href: '/category/lunch' },
  { label: 'Dinner', href: '/category/dinner' },
  { label: 'Breakfast & Brunch', href: '/category/breakfastnbrunch' },
  { label: 'Snacks & Sides', href: '/category/snacksnsides' },
  { label: 'Desserts', href: '/category/desserts' },
  { label: 'Drinks & Shakes', href: '/category/drinks-shakes' },
]

const categoryLabel = {
  lunch: 'Lunch',
  dinner: 'Dinner',
  breakfastnbrunch: 'Breakfast & Brunch',
  snacksnsides: 'Snacks & Sides',
  desserts: 'Desserts',
  'drinks-shakes': 'Drinks & Shakes',
}

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    const query = searchQuery.trim()

    if (query.length < 2) {
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search-suggestions?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        })
        const data = await response.json()
        setSuggestions(data.suggestions || [])
        setSuggestionsOpen(true)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setSuggestions([])
          setSuggestionsOpen(false)
        }
      }
    }, 180)

    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [searchQuery])

  const handleSearchSubmit = (event) => {
    const formData = new FormData(event.currentTarget)
    const query = formData.get('q')?.toString().trim()

    if (!query) {
      event.preventDefault()
      setSearchOpen(true)
    }
  }

  const handleDesktopSearchButton = (event) => {
    const query = searchQuery.trim()

    if (!searchOpen) {
      event.preventDefault()
      setSearchOpen(true)
      return
    }

    if (!query) {
      event.preventDefault()
      setSearchOpen(false)
      setSuggestions([])
      setSuggestionsOpen(false)
    }
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setSuggestionsOpen(false)
    setSuggestions([])
    setSearchQuery('')
  }

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearchQuery(value)

    if (value.trim().length < 2) {
      setSuggestions([])
      setSuggestionsOpen(false)
    }
  }

  return (
    <header className="site-header" style={{
      background: '#1E0E05',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div className="header-inner" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo (image) */}
        <Link href="/" onClick={() => setMobileOpen(false)} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}>
          <img src="/logo.png" alt="On The Stove" style={{ height: 38, width: 'auto', display: 'block' }} />
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
            <Link href="/recipes" style={{
              background: 'none',
              border: 'none',
              color: 'rgba(253,246,238,0.7)',
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.88rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              textDecoration: 'none',
            }}>
              Recipes
              <span style={{
                fontSize: '0.65rem',
                transition: 'transform 0.2s',
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}>▼</span>
            </Link>

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

          <form
            action="/search"
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: searchOpen ? '0.4rem' : 0,
              margin: '0 0.45rem',
              position: 'relative',
              height: '40px',
            }}
          >
            <input
              ref={searchInputRef}
              name="q"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (suggestions.length > 0) setSuggestionsOpen(true)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') closeSearch()
              }}
              aria-label="Search recipes"
              placeholder="Search recipes"
              style={{
                width: searchOpen ? '180px' : '0',
                opacity: searchOpen ? 1 : 0,
                pointerEvents: searchOpen ? 'auto' : 'none',
                border: searchOpen ? '1px solid rgba(255,255,255,0.16)' : 'none',
                borderRadius: '50px',
                background: '#2A1208',
                color: '#FDF6EE',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.85rem',
                padding: searchOpen ? '0.45rem 0.85rem' : '0.45rem 0',
                outlineColor: '#E8622A',
                transition: 'width 0.2s ease, opacity 0.2s ease, padding 0.2s ease',
              }}
            />
            <button
              className="button"
              type="submit"
              onClick={handleDesktopSearchButton}
              aria-label={searchOpen ? 'Submit search' : 'Open search'}
              style={{
                width: '36px',
                height: '36px',
                flexShrink: 0,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                background: searchOpen ? '#E8622A' : 'rgba(255,255,255,0.06)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.15s, border-color 0.15s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {searchOpen && suggestionsOpen && searchQuery.trim().length >= 2 && (
              <div className="search-suggestions desktop-search-suggestions" style={{
                position: 'absolute',
                top: 'calc(100% + 0.6rem)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '320px',
                background: '#2A1208',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px',
                padding: '0.5rem',
                boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
              }}>
                {suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <Link
                      key={item._id}
                      href={`/recipe/${item.slug.current}`}
                      onClick={closeSearch}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '44px minmax(0, 1fr)',
                        gap: '0.75rem',
                        alignItems: 'center',
                        padding: '0.55rem 0.6rem',
                        borderRadius: '10px',
                        color: 'rgba(253,246,238,0.82)',
                        fontFamily: '"Lato", sans-serif',
                        fontSize: '0.88rem',
                        lineHeight: 1.35,
                      }}
                    >
                      <SuggestionThumb item={item} />
                      <span style={{ minWidth: 0 }}>
                        <span style={{
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {item.title}
                        </span>
                        <span style={{
                          display: 'block',
                          color: 'rgba(244,148,106,0.85)',
                          fontSize: '0.72rem',
                          marginTop: '0.15rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.6px',
                        }}>
                          {categoryLabel[item.category] || item.category}
                        </span>
                      </span>
                    </Link>
                  ))
                ) : (
                  <p style={{
                    color: 'rgba(253,246,238,0.55)',
                    fontFamily: '"Lato", sans-serif',
                    fontSize: '0.85rem',
                    padding: '0.65rem 0.75rem',
                  }}>
                    No quick matches
                  </p>
                )}
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery.trim())}`}
                  onClick={closeSearch}
                  style={{
                    display: 'block',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    marginTop: '0.35rem',
                    padding: '0.7rem 0.75rem 0.45rem',
                    color: '#F4946A',
                    fontFamily: '"Lato", sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                  }}
                >
                  See all results
                </Link>
              </div>
            )}
          </form>

          <Link href="/contact" className="button button-link" style={{
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
          className="hamburger button"
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

          <Link href="/recipes" onClick={() => setMobileOpen(false)} style={{
            display: 'block',
            color: 'rgba(253,246,238,0.8)',
            fontFamily: '"Lato", sans-serif',
            fontSize: '1rem',
            padding: '0.75rem 0',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            textDecoration: 'none',
          }}>
            Recipes
          </Link>

          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#E8622A',
            margin: '1rem 0 0.5rem',
          }}>
            Categories
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

          <form action="/search" onSubmit={handleSearchSubmit} style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '1rem',
            position: 'relative',
          }}>
            <input
              name="q"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (suggestions.length > 0) setSuggestionsOpen(true)
              }}
              aria-label="Search recipes"
              placeholder="Search recipes"
              style={{
                flex: 1,
                minWidth: 0,
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50px',
                background: '#1E0E05',
                color: '#FDF6EE',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.95rem',
                padding: '0.75rem 1rem',
                outlineColor: '#E8622A',
              }}
            />
            <button type="submit" aria-label="Search recipes" style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: 'none',
              background: '#E8622A',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {suggestionsOpen && searchQuery.trim().length >= 2 && (
              <div className="search-suggestions mobile-search-suggestions" style={{
                position: 'absolute',
                top: 'calc(100% + 0.6rem)',
                left: 0,
                right: 0,
                background: '#1E0E05',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px',
                padding: '0.5rem',
                boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
                zIndex: 2,
              }}>
                {suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <Link
                      key={item._id}
                      href={`/recipe/${item.slug.current}`}
                      onClick={() => {
                        setMobileOpen(false)
                        closeSearch()
                      }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '46px minmax(0, 1fr)',
                        gap: '0.75rem',
                        alignItems: 'center',
                        padding: '0.6rem 0.7rem',
                        borderRadius: '10px',
                        color: 'rgba(253,246,238,0.82)',
                        fontFamily: '"Lato", sans-serif',
                        fontSize: '0.92rem',
                        lineHeight: 1.35,
                      }}
                    >
                      <SuggestionThumb item={item} />
                      <span style={{ minWidth: 0 }}>
                        <span style={{
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {item.title}
                        </span>
                        <span style={{
                          display: 'block',
                          color: 'rgba(244,148,106,0.85)',
                          fontSize: '0.72rem',
                          marginTop: '0.15rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.6px',
                        }}>
                          {categoryLabel[item.category] || item.category}
                        </span>
                      </span>
                    </Link>
                  ))
                ) : (
                  <p style={{
                    color: 'rgba(253,246,238,0.55)',
                    fontFamily: '"Lato", sans-serif',
                    fontSize: '0.9rem',
                    padding: '0.7rem 0.75rem',
                  }}>
                    No quick matches
                  </p>
                )}
              </div>
            )}
          </form>
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

function SuggestionThumb({ item }) {
  return (
    <span style={{
      width: '44px',
      height: '44px',
      borderRadius: '10px',
      overflow: 'hidden',
      background: '#3D2010',
      border: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#F4946A',
      fontSize: '0.75rem',
      fontFamily: '"Lato", sans-serif',
      fontWeight: '700',
      flexShrink: 0,
    }}>
      {item.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.imageUrl}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : (
        'OTS'
      )}
    </span>
  )
}
