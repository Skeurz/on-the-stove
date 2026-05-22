//'use client'; 
import { client } from '@/sanity/lib/client'
import { getRecipeBySlug, getAuthor } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import StarRating from '@/app/components/StarRating'
import SuggestedRecipes from '@/app/components/SuggestedRecipes'
import RecipeActions from '@/app/components/RecipeActions'
import IngredientList from '@/app/components/IngredientList'
import TableOfContents from '@/app/components/TableOfContents'

const categoryLabel = {
  lunch: 'Lunch',
  dinner: 'Dinner',
  breakfastnbrunch: 'Breakfast & Brunch',
  snacksnsides: 'Snacks & Sides',
  desserts: 'Desserts',
  'drinks-shakes': 'Drinks & Shakes',
}

export default async function RecipePage({ params }) {
  const { slug } = await params
  const [recipe, author] = await Promise.all([
    client.fetch(`*[_type == "recipe" && slug.current == $slug][0]{
      ...,
      "ratingBreakdown": {
        "star1": coalesce(ratingBreakdown.star1, 0),
        "star2": coalesce(ratingBreakdown.star2, 0),
        "star3": coalesce(ratingBreakdown.star3, 0),
        "star4": coalesce(ratingBreakdown.star4, 0),
        "star5": coalesce(ratingBreakdown.star5, 0)
      }
    }`, { slug }, { useCdn: false, next: { revalidate: 0 } }),
    client.fetch(getAuthor),
  ])

  if (!recipe) return (
    <div style={{ padding: '6rem', textAlign: 'center' }}>
      <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: 'var(--text)' }}>Recipe not found</p>
      <Link href="/" style={{ color: '#E8622A', fontFamily: '"Lato", sans-serif' }}>← Back to home</Link>
    </div>
  )

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  const recipeFacts = [
    recipe.prepTime ? { label: 'Prep', value: `${recipe.prepTime} min`, icon: '⏱' } : null,
    recipe.cookTime ? { label: 'Cook', value: `${recipe.cookTime} min`, icon: '🔥' } : null,
    totalTime > 0 ? { label: 'Total', value: `${totalTime} min`, icon: '🕐' } : null,
    recipe.servings ? { label: 'Serves', value: recipe.servings, icon: '🍽' } : null,
    recipe.calories ? { label: 'Calories', value: recipe.calories, icon: '⚡' } : null,
  ].filter(Boolean)
  const tableOfContents = [
    recipe.description ? { href: '#recipe-overview', label: '📖 Overview' } : null,
    recipeFacts.length > 0 ? { href: '#recipe-facts', label: '⏱ Recipe Details' } : null,
    recipe.ingredients?.length > 0 ? { href: '#recipe-ingredients', label: `🧂 Ingredients (${recipe.ingredients.length})` } : null,
    recipe.steps?.length > 0 ? { href: '#recipe-instructions', label: `👨‍🍳 Instructions (${recipe.steps.length} steps)` } : null,
    recipe.body ? { href: '#recipe-notes', label: '📝 Chef\'s Notes' } : null,
  ].filter(Boolean)

  const ratingBreakdownUI = (
    <div style={{
      marginTop: '1.25rem',
      display: 'grid',
      gap: '0.5rem',
      width: '100%'
    }}>
      {[5, 4, 3, 2, 1].map(stars => {
        const count = recipe.ratingBreakdown?.[`star${stars}`] || 0
        const percentage = recipe.ratingCount ? (count / recipe.ratingCount) * 100 : 0
        return (
          <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
            <span style={{ minWidth: '45px', fontWeight: '700', color: 'var(--text-light)' }}>{stars} ★</span>
            <div style={{ flex: 1, height: '6px', background: 'var(--gray)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{
                width: `${percentage}%`,
                height: '100%',
                background: 'var(--orange)',
                transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }} />
            </div>
            <span style={{ minWidth: '16px', textAlign: 'right', color: 'var(--text-light)' }}>{count}</span>
          </div>
        )
      })}
    </div>
  )

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ── HERO SECTION ── */}
      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '3rem 2rem 0',
      }}>
        {/* Category + breadcrumb */}
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/" style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.8rem',
            color: 'var(--text-light)',
          }}>Home</Link>
          <span style={{ color: 'var(--text-light)', margin: '0 0.4rem' }}>›</span>
          <Link href={`/category/${recipe.category}`} style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.8rem',
            color: 'var(--text-light)',
          }}>{categoryLabel[recipe.category] || recipe.category}</Link>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: 'var(--brown)',
          lineHeight: 1.2,
          marginBottom: '1.5rem',
          fontWeight: '700',
        }}>
          {recipe.title}
        </h1>

        {/* Recipe facts strip */}
        {recipeFacts.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            {recipeFacts.map(fact => (
              <div key={fact.label} style={{
                background: 'var(--cream-light)',
                border: '1px solid var(--gray)',
                borderRadius: '50px',
                padding: '0.4rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.85rem',
                color: 'var(--text)',
              }}>
                <span>{fact.icon}</span>
                <span style={{ color: 'var(--text-light)' }}>{fact.label}:</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── FULL WIDTH HERO IMAGE ── */}
      {recipe.mainImage && (
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '0 2rem',
        }}>
          <div style={{
            width: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            aspectRatio: '16/9',
            boxShadow: '0 20px 60px rgba(61,32,16,0.15)',
          }}>
            <Image
              src={urlFor(recipe.mainImage).width(1200).height(675).url()}
              alt={recipe.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <RecipeActions />
        </div>
      )}

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div style={{
        maxWidth: '1200px',
        margin: '3rem auto 0',
        padding: '0 2rem 4rem',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '3rem',
        alignItems: 'start',
      }}
        className="recipe-page-layout"
      >

        {/* ── LEFT: Main content ── */}
        <div>

          {/* Description */}
          {recipe.description && (
            <div id="recipe-overview" style={{
              background: 'var(--cream-light)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem',
              border: '1px solid var(--gray)',
              borderLeft: '4px solid var(--orange)',
            }}>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '1.1rem',
                lineHeight: 1.85,
                color: 'var(--text)',
                margin: 0,
                fontStyle: 'italic',
              }}>
                {recipe.description}
              </p>
            </div>
          )}

          {/* Ingredients + Steps */}
          {(recipe.ingredients?.length > 0 || recipe.steps?.length > 0) && (
            <div id="recipe-ingredients" style={{
              background: 'var(--cream-light)',
              borderRadius: '20px',
              border: '1px solid var(--gray)',
              overflow: 'hidden',
              marginBottom: '2rem',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: recipe.ingredients?.length > 0 && recipe.steps?.length > 0
                  ? 'minmax(240px, 0.8fr) minmax(0, 1.2fr)'
                  : '1fr',
              }}>

                {/* Ingredients */}
                {recipe.ingredients?.length > 0 && (
                  <div style={{
                    padding: '2rem',
                    borderRight: recipe.steps?.length > 0 ? '1px solid var(--gray)' : 'none',
                  }}>
                    <h2 style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.4rem',
                      color: 'var(--brown)',
                      marginBottom: '1.25rem',
                      paddingBottom: '0.75rem',
                      borderBottom: '2px solid var(--orange)',
                    }}>
                      🧂 Ingredients
                    </h2>
                    <IngredientList ingredients={recipe.ingredients} />
                  </div>
                )}

                {/* Steps */}
                {recipe.steps?.length > 0 && (
                  <div style={{ padding: '2rem' }}>
                    <h2 style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.4rem',
                      color: 'var(--brown)',
                      marginBottom: '1.25rem',
                      paddingBottom: '0.75rem',
                      borderBottom: '2px solid var(--orange)',
                    }}>
                      👨‍🍳 Instructions
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {recipe.steps.map((step, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'flex-start',
                        }}>
                          <span style={{
                            background: 'var(--orange)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: '"Lato", sans-serif',
                            fontWeight: '700',
                            fontSize: '0.82rem',
                            flexShrink: 0,
                          }}>
                            {i + 1}
                          </span>
                          <p style={{
                            fontFamily: '"Lato", sans-serif',
                            fontSize: '0.975rem',
                            color: 'var(--text)',
                            lineHeight: 1.8,
                            margin: 0,
                            paddingTop: '3px',
                          }}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chef's Notes */}
          {recipe.body && (
            <div id="recipe-notes" style={{
              background: 'var(--cream-light)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid var(--gray)',
              marginBottom: '2rem',
            }}>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.4rem',
                color: 'var(--brown)',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '2px solid var(--orange)',
              }}>
                📝 Chef's Notes
              </h3>
              <div style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '1rem',
                lineHeight: 1.9,
                color: 'var(--text)',
              }}>
                <PortableText value={recipe.body} />
              </div>
            </div>
          )}

          {/* Rating Section */}
          <div style={{
            background: 'var(--cream-light)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid var(--gray)',
            marginBottom: '2rem',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              marginBottom: '0.5rem',
              fontWeight: '700',
            }}>
              Tried it?
            </p>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.4rem',
              color: 'var(--brown)',
              marginBottom: '1.25rem',
            }}>
              Rate this recipe
            </h3>
            <StarRating slug={slug} />
            {ratingBreakdownUI}
          </div>

        </div>

        {/* ── RIGHT: Sidebar ── */}
        {author && (
          <aside style={{ position: 'sticky', top: '88px' }}>

            {/* Table of Contents */}
            <TableOfContents items={tableOfContents} />
            {/* Author card */}
            <div style={{
              background: 'var(--cream-light)',
              border: '1px solid var(--gray)',
              borderRadius: '20px',
              padding: '1.75rem',
              textAlign: 'center',
              marginBottom: '1.5rem',
            }}>
              {author.photo && (
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 1rem',
                  border: '3px solid var(--orange)',
                }}>
                  <Image
                    src={urlFor(author.photo).width(90).height(90).url()}
                    alt={author.name}
                    width={90}
                    height={90}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: '0.2rem',
                fontWeight: '700',
              }}>Recipe by</p>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.2rem',
                color: 'var(--brown)',
                marginBottom: '0.75rem',
              }}>{author.name}</h3>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.85rem',
                color: 'var(--text-light)',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
                textAlign: 'left',
              }}>{author.bio}</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1rem' }}>
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
              <Link href="/about" style={{
                display: 'inline-block',
                background: 'var(--orange)',
                color: 'white',
                fontFamily: '"Lato", sans-serif',
                fontWeight: '700',
                fontSize: '0.85rem',
                padding: '0.6rem 1.5rem',
                borderRadius: '50px',
              }}>
                Learn more
              </Link>
            </div>

            {/* Back button */}
            <Link href="/recipes" style={{
              display: 'block',
              background: 'var(--cream-light)',
              border: '1px solid var(--gray)',
              borderRadius: '50px',
              padding: '0.75rem',
              textAlign: 'center',
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.88rem',
              fontWeight: '700',
              color: 'var(--brown)',
            }}>
              ← Back to all recipes
            </Link>

          </aside>
        )}
      </div>

      {/* ── SUGGESTED RECIPES ── */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 4rem',
      }}>
        <SuggestedRecipes currentRecipeId={recipe._id} />
      </div>

    </div>
  )
}