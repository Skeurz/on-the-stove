import { client } from '@/sanity/lib/client'
import { getAuthor } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { CakeSlice, Coffee, Pizza, Salad, Sandwich, Blender } from 'lucide-react'

const categories = [
  {
    Icon: Sandwich,
    label: 'Lunch',
    description: 'Fresh, satisfying midday meals that are easy to assemble and full of flavor.',
    href: '/category/lunch',
  },
  {
    Icon: Pizza,
    label: 'Dinner',
    description: 'Comforting evening plates designed for busy weeknights and simple entertaining.',
    href: '/category/dinner',
  },
  {
    Icon: Coffee,
    label: 'Breakfast & Brunch',
    description: 'Bright starts and cozy brunch classics to make mornings feel more special.',
    href: '/category/breakfastnbrunch',
  },
  {
    Icon: Salad,
    label: 'Snacks & Sides',
    description: 'Crisp bites, easy sides, and shareable morsels to round out any meal.',
    href: '/category/snacksnsides',
  },
  {
    Icon: CakeSlice,
    label: 'Desserts',
    description: 'Sweet finishes with bold flavor and simple ingredients you already have.',
    href: '/category/desserts',
  },
  {
    Icon: Blender,
    label: 'Drinks & Shakes',
    description: 'Refreshing sips and creamy treats to keep the kitchen feeling fun and easy.',
    href: '/category/drinks-shakes',
  },
]

export default async function RecipesPage() {
  const author = await client.fetch(getAuthor)

  return (
    <div className="content-section page-shell" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="heading-card" style={{
        background: 'var(--cream)',
        border: '1px solid var(--gray)',
        borderRadius: '12px',
        padding: '0.8rem 1.4rem',
        width: 'fit-content',
        marginBottom: '2rem',
      }}>
        <p style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--orange)',
          margin: 0,
          marginBottom: '0.25rem',
        }}>
          Recipes
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
          color: 'var(--brown)',
          lineHeight: 1.05,
          margin: 0,
          marginBottom: '0.75rem',
        }}>
          Find the recipe category that fits your mood.
        </h1>
        <p style={{
          fontFamily: 'Lato, sans-serif',
          color: 'var(--text-light)',
          margin: 0,
          lineHeight: 1.8,
          fontSize: '1rem',
        }}>
          Explore every recipe collection in one place, then head to the right to learn more about Adelaide and her approach to everyday cooking.
        </p>
      </div>

      <div className="recipes-page-layout">
        <div className="category-card-grid">
          {categories.map((category) => (
            <Link key={category.href} href={category.href} className="category-card">
              <div className="category-card-emoji"><category.Icon size={34} strokeWidth={1.7} aria-hidden="true" /></div>
              <div>
                <h2 className="category-card-title">{category.label}</h2>
                <p className="category-card-copy">{category.description}</p>
              </div>
              <span className="category-card-action">View all</span>
            </Link>
          ))}
        </div>

        {author && (
          <aside className="author-scroll-panel">
            <div className="author-panel">
              {author.photo && (
                <div className="author-photo-wrapper">
                  <Image
                    src={urlFor(author.photo).width(120).height(120).url()}
                    alt={author.name}
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>
              )}

              <p style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.8rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: '0.85rem',
              }}>
                About me
              </p>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.9rem',
                color: 'var(--brown)',
                marginBottom: '1rem',
              }}>
                Home cooking made simple.
              </h2>
              <p style={{
                fontFamily: 'Lato, sans-serif',
                color: 'var(--text-light)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}>
                {author.bio || 'Classic, cozy, and approachable recipes with real ingredients — the kind of food you want to eat every day.'}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {author.instagram && (
                  <a href={author.instagram} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                    <img src="/instagram.png" alt="Instagram" className="social-icon" />
                  </a>
                )}
                {author.pinterest && (
                  <a href={author.pinterest} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Pinterest">
                    <img src="/pinterest.png" alt="Pinterest" className="social-icon" />
                  </a>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontFamily: 'Lato, sans-serif', color: 'var(--text-light)', fontSize: '0.78rem', marginBottom: '0.3rem' }}>Stay inspired</p>
                  <p style={{ fontFamily: 'Lato, sans-serif', color: 'var(--brown)', fontSize: '1.4rem', fontWeight: '700' }}>Every day</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Lato, sans-serif', color: 'var(--text-light)', fontSize: '0.78rem', marginBottom: '0.3rem' }}>Kitchen confidence</p>
                  <p style={{ fontFamily: 'Lato, sans-serif', color: 'var(--brown)', fontSize: '1.4rem', fontWeight: '700' }}>Made easy</p>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
