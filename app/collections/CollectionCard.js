
'use client'
import Link from 'next/link'
import Image from 'next/image'
import {ChevronsRight} from 'lucide-react'

export default function CollectionCard({ col }) {
  return (
    <Link href={`/collections/${col.slug?.current ?? col.slug}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: 'var(--cream-light)',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid var(--gray)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',        
          flexDirection: 'column', 
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
        }}
      >
        {col.coverImage && (
          <div style={{ position: 'relative', aspectRatio: '16/9', width: '100%' }}>
            <Image src={col.coverImage} alt={col.title} fill style={{ objectFit: 'cover' }} />
          </div>
        )}
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.2rem',
            color: 'var(--brown)',
            fontWeight: '700',
            marginBottom: '0.4rem',
          }}>
            {col.title}
          </h2>
          {col.description && (
  <p style={{
    fontFamily: '"Lato", sans-serif',
    fontSize: '0.875rem',
    color: 'var(--text-light)',
    lineHeight: 1.6,
    marginBottom: '0.75rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }}>
    {col.description}
  </p>
)}
          <span style={{
    marginTop: 'auto',
    paddingTop: '0.75rem',
    fontFamily: '"Lato", sans-serif',
    fontSize: '0.78rem',
    fontWeight: '700',
    color: 'var(--orange)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
  }}>
    Discover <ChevronsRight size={16}/>
           </span>
        </div>
      </div>
    </Link>
  )
}