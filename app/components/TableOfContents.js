'use client'

import { useEffect, useState } from 'react'
import { BookOpen, Clock, FlaskConical, ChefHat, Camera, Video, Lightbulb, Shuffle, Leaf, Package, HelpCircle, Star } from 'lucide-react'



const iconMap = {
    '#recipe-overview': <BookOpen size={14} strokeWidth={1.8} />,
    '#recipe-ingredients': <FlaskConical size={14} strokeWidth={1.8} />,
    '#recipe-instructions': <ChefHat size={14} strokeWidth={1.8} />,
    '#prep-photos': <Camera size={14} strokeWidth={1.8} />,
    '#video': <Video size={14} strokeWidth={1.8} />,
    '#helpful-tips': <Lightbulb size={14} strokeWidth={1.8} />,
    '#variations': <Shuffle size={14} strokeWidth={1.8} />,
    '#vegan': <Leaf size={14} strokeWidth={1.8} />,
    '#storage': <Package size={14} strokeWidth={1.8} />,
    '#faqs': <HelpCircle size={14} strokeWidth={1.8} />,
    '#recipe-facts': <Clock size={14} strokeWidth={1.8} />,
  }
export default function TableOfContents({ items }) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    )

    items.forEach(item => {
      const el = document.getElementById(item.href.replace('#', ''))
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <div style={{
      background: 'var(--cream-light)',
      border: '1px solid var(--gray)',
      borderRadius: '16px',
      padding: '1.25rem',
      marginBottom: '1.5rem',
    }}>
      <p style={{
        fontFamily: '"Lato", sans-serif',
        fontSize: '0.7rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--orange)',
        fontWeight: '700',
        marginBottom: '0.75rem',
      }}>
        On this page
      </p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
        {items.map(item => {
          const id = item.href.replace('#', '')
          const isActive = activeId === id
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={e => {
                e.preventDefault()
                const el = document.getElementById(id)
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 100
                  window.scrollTo({ top, behavior: 'smooth' })
                  setActiveId(id)
                }
              }}
              style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.875rem',
                color: isActive ? 'var(--orange)' : 'var(--text-light)',
                padding: '0.4rem 0.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.15s',
                background: isActive ? 'rgba(232,98,42,0.08)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--orange)' : '3px solid transparent',
                fontWeight: isActive ? '700' : '400',
                textDecoration: 'none',
              }}
            >
              {iconMap[item.href] && (
                <span style={{ flexShrink: 0, opacity: isActive ? 1 : 0.5 }}>{iconMap[item.href]}</span>
              )}
              {item.label.replace(/^[\p{Emoji_Presentation}\u200d\uFE0F\s]+/u, '')}
            </a>
          )
        })}
      </nav>
    </div>
  )
}