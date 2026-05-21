import { client } from '@/sanity/lib/client'
import { getAuthor, getPaginatedRecipesByCategory } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import RecipeCard from '@/app/components/RecipeCard'

const RECIPES_PER_PAGE = 8
const categoryLabels = {
  lunch: 'Lunch',
  dinner: 'Dinner',
  breakfastnbrunch: 'Breakfast & Brunch',
  snacksnsides: 'Snacks & Sides',
  desserts: 'Desserts',
  'drinks-shakes': 'Drinks & Shakes',
}

export default async function CategoryPage({ params, searchParams }) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const category = resolvedParams.category
  const currentPage = Math.max(Number(resolvedSearchParams?.page) || 1, 1)
  const start = (currentPage - 1) * RECIPES_PER_PAGE
  const end = start + RECIPES_PER_PAGE
  const [{ recipes, total }, author] = await Promise.all([
    client.fetch(getPaginatedRecipesByCategory, { category, start, end }),
    client.fetch(getAuthor),
  ])
  const totalPages = Math.max(Math.ceil(total / RECIPES_PER_PAGE), 1)
  const label = categoryLabels[category] || category

  return (
    <div className="content-section" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '2rem', paddingBottom: '2rem' }}>

      {/* Header */}
      <div style={{
        background: 'var(--cream)',
        border: '1px solid var(--gray)',
        borderRadius: '12px',
        padding: '0.8rem 1.4rem',
        width: 'fit-content',
        marginBottom: '2.5rem',
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
          fontSize: '2.5rem',
          color: 'var(--brown)',
          margin: 0,
          marginBottom: '0.35rem',
        }}>
          {label}
        </h1>
        <p style={{
          fontFamily: 'Lato, sans-serif',
          color: 'var(--text-light)',
          margin: 0,
          fontSize: '0.95rem',
        }}>
          Showing {recipes.length} of {total} recipe{total !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid */}
      {recipes.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          fontFamily: 'Lato, sans-serif',
          color: 'var(--text-light)',
        }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</p>
          <p>No recipes in this category yet. Check back soon!</p>
        </div>
      ) : (
        <>
          <div className="category-layout">
            <div>
              <div className="recipe-grid">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    imageUrl={recipe.mainImage ? urlFor(recipe.mainImage).width(400).height(200).url() : null}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} category={category} />
              )}
            </div>

            {author && (
              <div className="sticky-panel category-author-panel">
                <div className="author-bio-card">
                  {author.photo && (
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      margin: '0 auto 1rem',
                      border: '3px solid #E8622A',
                    }}>
                      <Image
                        src={urlFor(author.photo).width(100).height(100).url()}
                        alt={author.name}
                        width={100}
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}

<p style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '0.25rem',
            fontWeight: '700',
          }}>
            Recipes by
          </p>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.3rem',
            color: 'var(--brown)',
            marginBottom: '0.75rem',
          }}>
            {author.name}
          </h3>
          <p style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: '0.875rem',
            color: 'var(--text-light)',
            lineHeight: 1.7,
            marginBottom: '1.25rem',
            textAlign: 'left',
          }}>
            {author.bio}
          </p>

                  <div className="author-socials">
                    {author.instagram && (
                      <a href={author.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                        <img src="/instagram.png" alt="Instagram" className="social-icon" />
                      </a>
                    )}
                    {author.pinterest && (
                      <a href={author.pinterest} target="_blank" rel="noopener noreferrer" className="social-link">
                        <img src="/pinterest.png" alt="Pinterest" className="social-icon" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function Pagination({ currentPage, totalPages, category }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav aria-label="Recipe pagination" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '0.6rem',
      marginTop: '2.5rem',
      fontFamily: 'Lato, sans-serif',
    }}>
      {currentPage > 1 && (
        <PageLink href={currentPage === 2 ? `/category/${category}` : `/category/${category}?page=${currentPage - 1}`}>
          Previous
        </PageLink>
      )}

      {pages.map((page) => (
        <PageLink
          key={page}
          href={page === 1 ? `/category/${category}` : `/category/${category}?page=${page}`}
          active={page === currentPage}
        >
          {page}
        </PageLink>
      ))}

      {currentPage < totalPages && (
        <PageLink href={`/category/${category}?page=${currentPage + 1}`}>
          Next
        </PageLink>
      )}
    </nav>
  )
}

function PageLink({ href, active = false, children }) {
  return (
    <Link href={href} style={{
      minWidth: '40px',
      height: '40px',
      padding: '0 0.85rem',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50px',
      border: active ? '1px solid var(--orange)' : '1px solid var(--gray)',
      background: active ? 'var(--orange)' : 'var(--cream-light)',
      color: active ? 'var(--cream)' : 'var(--brown-light)',
      fontSize: '0.88rem',
      fontWeight: '700',
    }}>
      {children}
    </Link>
  )
}
