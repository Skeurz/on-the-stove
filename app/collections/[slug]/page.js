import { client } from '@/sanity/lib/client'
import { getCollection } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import RecipeCard from '@/app/components/RecipeCard'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const col = await client.fetch(getCollection, { slug })
  if (!col) return {}
  return {
    title: `${col.title} | On The Stove`,
    description: col.description || 'A curated collection of recipes by Adelaide.',
    openGraph: {
      title: `${col.title} | On The Stove`,
      description: col.description || 'A curated collection of recipes by Adelaide.',
      type: 'website',
      images: col.coverImage ? [{ url: col.coverImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${col.title} | On The Stove`,
      description: col.description || 'A curated collection of recipes by Adelaide.',
      images: col.coverImage ? [col.coverImage] : [],
    },
  }
}

export default async function CollectionPage({ params }) {
  const { slug } = await params
  const col = await client.fetch(getCollection, { slug })
  if (!col) notFound()

    const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: col.title,
  description: col.description || '',
  numberOfItems: col.recipes?.length || 0,
  itemListElement: col.recipes?.map((recipe, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: recipe.title,
    url: `https://onthestove.com/${typeof recipe.slug === 'string' ? recipe.slug : recipe.slug.current}`,
  })) || [],
}

  return (
    <div style={{ minHeight: '100vh' }}>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      <div className="content-section" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '3rem', paddingBottom: '4rem' }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/" style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.8rem', color: 'var(--text-light)' }}>Home</Link>
          <span style={{ color: 'var(--text-light)', margin: '0 0.4rem' }}>›</span>
          <Link href="/collections" style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.8rem', color: 'var(--text-light)' }}>Collections</Link>
          <span style={{ color: 'var(--text-light)', margin: '0 0.4rem' }}>›</span>
          <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.8rem', color: 'var(--brown)' }}>{col.title}</span>
        </div>

        {/* Hero card */}
<div style={{
  background: 'var(--cream-light)',
  border: '1px solid var(--gray)',
  borderRadius: '24px',
  overflow: 'hidden',
  marginBottom: '2rem',
  boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
}}>
  {col.coverImage && (
    <div style={{
      width: '100%',
      position: 'relative',
      aspectRatio: '16/9',
    }}>
      <Image src={col.coverImage} alt={col.title} fill style={{ objectFit: 'cover' }} priority />
    </div>
  )}
  <div style={{ padding: '2rem' }}>
    <h1 style={{
      fontFamily: '"Playfair Display", serif',
      fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
      color: 'var(--brown)',
      lineHeight: 1.2,
      marginBottom: '0.75rem',
      fontWeight: '700',
    }}>
      {col.title}
    </h1>
    {col.description && (
  <div
    dangerouslySetInnerHTML={{ __html: col.description }}
    style={{
      fontFamily: '"Lato", sans-serif',
      fontSize: '1rem',
      color: 'var(--text-light)',
      lineHeight: 1.8,
      marginBottom: '1.25rem',
    }}
  />
   )}
  </div>
</div>

       {/* Recipe count badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'var(--cream-light)',
          border: '1px solid var(--gray)',
          borderRadius: '50px',
          padding: '0.3rem 0.85rem',
          marginBottom: '2rem',
        }}>
          <span style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.78rem',
            color: 'var(--text-light)',
          }}>
            {col.recipes?.length || 0} recipe{col.recipes?.length !== 1 ? 's' : ''} in this collection
          </span>
        </div>
 
        {/* Recipe grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {col.recipes?.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>

        {/* Back link */}
        <Link href="/collections" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'var(--cream-light)',
          border: '1px solid var(--gray)',
          borderRadius: '50px',
          padding: '0.75rem 1.5rem',
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.88rem',
          fontWeight: '700',
          color: 'var(--brown)',
          textDecoration: 'none',
        }}>
          <ArrowLeft size={15} strokeWidth={1.8} /> Back to Collections
        </Link>

      </div>
    </div>
  )
}