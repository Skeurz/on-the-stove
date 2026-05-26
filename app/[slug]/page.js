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
import NewsletterSignup from '@/app/components/NewsletterSignup'
import { notFound } from 'next/navigation'
import RecipeJumpCard from '@/app/components/RecipeJumpCard'

const categoryLabel = {
  lunch: 'Lunch',
  dinner: 'Dinner',
  breakfastnbrunch: 'Breakfast & Brunch',
  snacksnsides: 'Snacks & Sides',
  desserts: 'Desserts',
  'drinks-shakes': 'Drinks & Shakes',
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const recipe = await client.fetch(
    `*[_type == "recipe" && slug.current == $slug][0]{
      title,
      description,
      seoTitle,
      seoDescription,
      mainImage
    }`,
    { slug } ,
    { cache: 'no-store' }
  )

  if (!recipe) return {}

  const title = recipe.seoTitle || recipe.title
  const description = recipe.seoDescription || recipe.description
  const imageUrl = recipe.mainImage
    ? urlFor(recipe.mainImage).width(1200).height(630).url()
    : null

  return {
    title: `${title} – On The Stove`,
    description,
    openGraph: {
      title: `${title} – On The Stove`,
      description,
      type: 'article',
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} – On The Stove`,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function RecipePage({ params }) {
  const { slug } = await params
  const [recipe, author] = await Promise.all([
    client.fetch(`*[_type == "recipe" && slug.current == $slug][0]{
      ...,
      "steps": steps[]{ _key, title, description },
      "preparationImages": preparationImages[]{ _key, image, caption, stepNumber },
      secondaryImage,
      videoUrl,
      "helpfulTips": helpfulTips[]{ _key, title, description },
      "variations": variations[]{ _key, title, description },
      "veganAdaptation": veganAdaptation,
      "storageTips": storageTips[]{ _key, method, duration, notes },
      "faqs": faqs[]{ _key, question, answer },
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

 if (!recipe) {
    notFound()
  }

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  const difficultyLabel = { easy: '🟢 Easy', medium: '🟡 Medium', hard: '🔴 Hard' }

  const recipeFacts = [
    recipe.prepTime ? { label: 'Prep', value: `${recipe.prepTime} min`, icon: '⏱' } : null,
    recipe.cookTime ? { label: 'Cook', value: `${recipe.cookTime} min`, icon: '🔥' } : null,
    totalTime > 0 ? { label: 'Total', value: `${totalTime} min`, icon: '🕐' } : null,
    recipe.servings ? { label: 'Serves', value: recipe.servings, icon: '🍽' } : null,
    recipe.calories ? { label: 'Calories', value: recipe.calories, icon: '⚡' } : null,
    recipe.difficulty ? { label: 'Difficulty', value: difficultyLabel[recipe.difficulty], icon: '📊' } : null,
    recipe.cuisine ? { label: 'Cuisine', value: recipe.cuisine, icon: '🌍' } : null,
  ].filter(Boolean)

  const tableOfContents = [
    recipe.description ? { href: '#recipe-overview', label: '📖 Overview' } : null,
    recipeFacts.length > 0 ? { href: '#recipe-facts', label: '⏱ Recipe Details' } : null,
    recipe.ingredients?.length > 0 ? { href: '#recipe-ingredients', label: `🧂 Ingredients (${recipe.ingredients.length})` } : null,
    recipe.steps?.length > 0 ? { href: '#recipe-instructions', label: `👨‍🍳 Instructions (${recipe.steps.length} steps)` } : null,
    recipe.preparationImages?.length > 0 ? { href: '#prep-photos', label: '📸 Step by Step Photos' } : null,
    recipe.videoUrl ? { href: '#video', label: '🎥 Watch the Recipe' } : null,
    recipe.helpfulTips?.length > 0 ? { href: '#helpful-tips', label: '💡 Helpful Tips' } : null,
    recipe.variations?.length > 0 ? { href: '#variations', label: '🔄 Easy Variations' } : null,
    recipe.veganAdaptation?.length > 0 ? { href: '#vegan', label: '🌱 Vegan Adaptation' } : null,
    recipe.storageTips?.length > 0 ? { href: '#storage', label: '📦 Storage Tips' } : null,
    recipe.faqs?.length > 0 ? { href: '#faqs', label: '❓ FAQs' } : null,
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
            <span style={{ minWidth: '45px', fontWeight: '700', color: 'var(--text)' }}>{stars} ★</span>
            <div style={{ flex: 1, height: '6px', background: 'var(--gray)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{
                width: `${percentage}%`,
                height: '100%',
                background: 'var(--orange)',
                transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }} />
            </div>
            <span style={{ minWidth: '16px', textAlign: 'right', color: 'var(--text)' }}>{count}</span>
          </div>
        )
      })}
    </div>
  )

  return (
    <div style={{ 
      backgroundImage: 'url("/background.jpg")', 
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      minHeight: '100vh' 
    }}>

      {/* ── HERO SECTION ── */}
      <div className="content-section" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '3rem',
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
            overflowX: 'auto',
            paddingBottom: '0.25rem',
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
        <div style={{ marginTop: '1.5rem' }}>
          <RecipeActions />
        </div>
      </div>

      {/* ── HERO IMAGE ── */}
      {recipe.mainImage && (
        <div style={{
          maxWidth: '1200px',
          margin: '1.5rem auto 0',
          padding: '0 2rem',
        }}>
          <div style={{
            width: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            aspectRatio: '16/9',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--gray)',
          }}>
            <Image
              src={urlFor(recipe.mainImage).width(1200).height(675).url()}
              alt={recipe.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      )}

      {/* ── MOBILE TOC ── */}
      <div className="recipe-toc-mobile" style={{
        display: 'none',
        maxWidth: '1200px',
        margin: '1.5rem auto 0',
        padding: '0 2rem',
      }}>
        <TableOfContents items={tableOfContents} />
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div
        className="recipe-main-layout content-section"
        style={{
          maxWidth: '1200px',
          margin: '3rem auto 0',
          paddingBottom: '4rem',
        }}
      >

        {/* ── LEFT: Navigation ── */}
        <aside className="recipe-toc-aside">
          <TableOfContents items={tableOfContents} />
        </aside>

        {/* ── LEFT: Main content ── */}
        <div>

          {/* WPRM-style Recipe Card */}
          <RecipeJumpCard recipe={recipe} slug={slug} />

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
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.75rem',
                color: 'var(--brown)',
                marginBottom: '1rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                📖 Overview
              </h2>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '1.15rem',
                lineHeight: 1.9,
                color: 'var(--text)',
                margin: 0,
              }}>
                {recipe.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {recipe.tags?.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '2rem',
            }}>
              {recipe.tags.map(tag => (
                <span key={tag} style={{
                  background: 'var(--gray)',
                  color: 'var(--text-light)',
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '50px',
                  letterSpacing: '0.3px',
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Ingredients */}
          {recipe.ingredients?.length > 0 && (
            <div id="recipe-ingredients" style={{
              background: 'var(--cream-light)',
              borderRadius: '20px',
              border: '1px solid var(--gray)',
              overflow: 'hidden',
              marginBottom: '2rem',
            }}>
              <div style={{ padding: '2rem' }}>
                <h2 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.75rem',
                  color: 'var(--brown)',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '2px solid var(--orange)',
                  fontWeight: '700',
                }}>
                  🧂 Ingredients
                </h2>
                <IngredientList ingredients={recipe.ingredients} recipeSlug={slug} />
              </div>
            </div>
          )}

          {/* Instructions */}
          {recipe.steps?.length > 0 && (
            <div id="recipe-instructions" style={{
              background: 'var(--cream-light)',
              borderRadius: '20px',
              border: '1px solid var(--gray)',
              overflow: 'hidden',
              marginBottom: '2rem',
            }}>
              <div style={{ padding: '2rem' }}>
                <h2 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.75rem',
                  color: 'var(--brown)',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '2px solid var(--orange)',
                  fontWeight: '700',
                }}>
                  👨‍🍳 Instructions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {recipe.steps.map((step, i) => (
                    <div key={step._key || i} style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'flex-start',
                      background: 'var(--cream)',
                      borderRadius: '14px',
                      padding: '1.25rem',
                      border: '1px solid var(--gray)',
                    }}>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontFamily: '"Lato", sans-serif',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          letterSpacing: '1.5px',
                          textTransform: 'uppercase',
                          color: 'var(--orange)',
                          margin: 0,
                          marginBottom: '0.35rem',
                        }}>
                          Step {i + 1}
                        </p>
                        {step.title && (
                          <p style={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: 'var(--brown)',
                            margin: 0,
                            marginBottom: '0.35rem',
                          }}>
                            {step.title}
                          </p>
                        )}
                        {step.description && (
                          <p style={{
                            fontFamily: '"Lato", sans-serif',
                            fontSize: '0.95rem',
                            color: 'var(--text)',
                            lineHeight: 1.8,
                            margin: 0,
                            marginTop: step.title ? '0.35rem' : 0,
                          }}>
                            {step.description}
                          </p>
                        )}
                        {typeof step === 'string' && (
                          <p style={{
                            fontFamily: '"Lato", sans-serif',
                            fontSize: '0.95rem',
                            color: 'var(--text)',
                            lineHeight: 1.8,
                            margin: 0,
                          }}>
                            {step}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Preparation Photos */}
          {recipe.preparationImages?.length > 0 && (
            <div id="prep-photos" style={{
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
              }}>📸 Step by Step Photos</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem',
              }}>
                {recipe.preparationImages.map((item, i) => (
                  <div key={item._key || i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--gray)' }}>
                    <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                      <Image
                        src={urlFor(item.image).width(400).height(300).url()}
                        alt={item.caption || `Step ${item.stepNumber || i + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      {item.stepNumber && (
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'var(--orange)',
                          color: 'white',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: '"Lato", sans-serif',
                          fontWeight: '700',
                          fontSize: '0.8rem',
                        }}>
                          {item.stepNumber}
                        </div>
                      )}
                    </div>
                    {item.caption && (
                      <p style={{
                        fontFamily: '"Lato", sans-serif',
                        fontSize: '0.8rem',
                        color: 'var(--text-light)',
                        padding: '0.6rem 0.75rem',
                        margin: 0,
                        background: 'var(--cream)',
                      }}>
                        {item.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video */}
          {recipe.videoUrl && (
            <div id="video" style={{
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
              }}>🎥 Watch the Recipe</h3>
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: '12px',
              }}>
                <iframe
                  src={recipe.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/').replace('tiktok.com', 'tiktok.com/embed')}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '12px',
                  }}
                  allowFullScreen
                  title={`${recipe.title} video`}
                />
              </div>
            </div>
          )}

          {/* Helpful Tips */}
          {recipe.helpfulTips?.length > 0 && (
            <div id="helpful-tips" style={{
              background: 'var(--cream-light)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(232,98,42,0.2)',
              marginBottom: '2rem',
            }}>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.4rem',
                color: 'var(--brown)',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '2px solid var(--orange)',
              }}>💡 Helpful Tips</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}>
                {recipe.helpfulTips.map((tip, i) => (
                  <li key={tip._key || i} style={{
                    display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                    padding: '0.75rem 0',
                    borderBottom: i < recipe.helpfulTips.length - 1 ? '1px solid rgba(232,98,42,0.1)' : 'none',
                  }}>
                    <span style={{ color: 'var(--orange)', flexShrink: 0, fontWeight: '700' }}>✓</span>
                    <div>
                      {tip.title && <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', fontWeight: '700', color: 'var(--brown)', marginBottom: '0.25rem', margin: 0 }}>{tip.title}</p>}
                      {tip.description && <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: 1.7, margin: 0, marginTop: '0.25rem' }}>{tip.description}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Easy Variations */}
          {recipe.variations?.length > 0 && (
            <div id="variations" style={{
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
              }}>🔄 Easy Variations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recipe.variations.map((v, i) => (
                  <div key={v._key || i} style={{
                    background: 'var(--cream)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    border: '1px solid var(--gray)',
                  }}>
                    {v.title && <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', fontWeight: '700', color: 'var(--brown)', marginBottom: '0.35rem' }}>{v.title}</p>}
                    {v.description && <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: 1.7, margin: 0 }}>{v.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vegan Adaptation */}
          {recipe.veganAdaptation?.length > 0 && (
            <div id="vegan" style={{
              background: 'var(--cream-light)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(34,197,94,0.3)',
              marginBottom: '2rem',
            }}>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.4rem',
                color: 'var(--brown)',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '2px solid rgba(34,197,94,0.6)',
              }}>🌱 How to Make This Vegan</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {recipe.veganAdaptation.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                    fontFamily: '"Lato", sans-serif', fontSize: '0.95rem',
                    color: 'var(--text)', lineHeight: 1.7,
                  }}>
                    <span style={{ color: '#16a34a', flexShrink: 0, fontWeight: '700' }}>🌿</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Storage Tips */}
          {recipe.storageTips?.length > 0 && (
            <div id="storage" style={{
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
              }}>📦 Storage Tips</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                {recipe.storageTips.map((tip, i) => (
                  <div key={tip._key || i} style={{
                    background: 'var(--cream)',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid var(--gray)',
                    textAlign: 'center',
                  }}>
                    <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.95rem', fontWeight: '700', color: 'var(--brown)', marginBottom: '0.25rem' }}>{tip.method}</p>
                    <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.85rem', color: 'var(--orange)', fontWeight: '700', marginBottom: '0.25rem' }}>{tip.duration}</p>
                    {tip.notes && <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.78rem', color: 'var(--text-light)', lineHeight: 1.5, margin: 0 }}>{tip.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {recipe.faqs?.length > 0 && (
            <div id="faqs" style={{
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
              }}>❓ Frequently Asked Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recipe.faqs.map((faq, i) => (
                  <div key={faq._key || i} style={{
                    borderBottom: i < recipe.faqs.length - 1 ? '1px solid var(--gray)' : 'none',
                    paddingBottom: i < recipe.faqs.length - 1 ? '1rem' : 0,
                  }}>
                    <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', fontWeight: '700', color: 'var(--brown)', marginBottom: '0.5rem' }}>Q: {faq.question}</p>
                    <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: 1.7, margin: 0 }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Secondary Image */}
          {recipe.secondaryImage && (
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: '16/9',
              border: '1px solid var(--gray)',
              marginBottom: '2rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            }}>
              <Image
                src={urlFor(recipe.secondaryImage).width(900).height(506).url()}
                alt={`${recipe.title} - photo`}
                fill
                style={{ objectFit: 'cover' }}
              />
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

          {/* Newsletter */}
          <div style={{
            background: 'var(--cream-light)',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid var(--gray)',
            marginBottom: '2rem',
          }}>
            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.1rem',
              color: 'var(--brown)',
              marginBottom: '0.35rem',
              fontWeight: '700',
            }}>
              🍳 Enjoyed this recipe?
            </p>
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.85rem',
              color: 'var(--text-light)',
              marginBottom: '1rem',
              lineHeight: 1.6,
            }}>
              Get new recipes from Adelaide every week — free, no spam.
            </p>
            <NewsletterSignup source="recipe-page" compact />
          </div>

        </div>

        {/* ── RIGHT: Sidebar ── */}
        <aside className="recipe-right-aside">
          
          {/* Main Recipe Image in Sidebar */}
          {recipe.mainImage && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '1/1',
                boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                border: '1px solid var(--gray)',
                background: 'var(--cream-light)',
              }}>
                <Image
                  src={urlFor(recipe.mainImage).width(600).height(600).url()}
                  alt={recipe.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
            
          )}

          {/* Author card */}
          {author && (
            <div style={{
              background: 'var(--cream-light)',
              border: '1px solid var(--gray)',
              borderRadius: '24px',
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
          )}

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
      </div>

      {/* ── SUGGESTED RECIPES ── */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 4rem',
      }}>
        <SuggestedRecipes 
          currentRecipeId={recipe._id} 
          category={recipe.category}
          tags={recipe.tags || []}
        />
      </div>

    </div>
  )
}