import { client } from '@/sanity/lib/client'
import { getCollections } from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Collections | On The Stove',
  description: 'Curated recipe collections by Adelaide.',
}

export default async function CollectionsPage() {
  const collections = await client.fetch(getCollections, {}, { cache: 'no-store' })
  

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="content-section" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '3rem', paddingBottom: '4rem' }}>

        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: 'var(--brown)',
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          fontWeight: '700',
        }}>
          Collections
        </h1>
        <p style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '1.05rem',
          color: 'var(--text-light)',
          marginBottom: '2.5rem',
          lineHeight: 1.6,
        }}>
          Curated lists for every mood and occasion.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {collections.map(col => (
            <Link key={col._id} href={`/collections/${col.slug?.current ?? col.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--cream-light)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--gray)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s',
              }}>
                {col.coverImage && (
                  <div style={{ position: 'relative', aspectRatio: '16/9', width: '100%' }}>
                    <Image
                      src={col.coverImage}
                      alt={col.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ padding: '1.25rem' }}>
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
                    }}>
                      {col.description}
                    </p>
                  )}
                  <span style={{
                    fontFamily: '"Lato", sans-serif',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: 'var(--orange)',
                    letterSpacing: '0.3px',
                  }}>
                    {col.recipeCount} recipe{col.recipeCount !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}