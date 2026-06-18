
import { client } from '@/sanity/lib/client'
import { getCollections } from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import CollectionCard from './CollectionCard'

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
  <CollectionCard
    key={col._id}
    col={{
      ...col,
      description: col.description
        ? col.description.replace(/<[^>]*>/g, '')
        : null
    }}
  />
))}
        </div>

      </div>
    </div>
  )
}