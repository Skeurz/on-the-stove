import { client } from '@/sanity/lib/client'
import { getRecipeBySlug, getAuthor } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import StarRating from '@/app/components/StarRating'
import SuggestedRecipes from '@/app/components/SuggestedRecipes'

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
    client.fetch(getRecipeBySlug, { slug }),
    client.fetch(getAuthor),
  ])

  if (!recipe) return (
    <div style={{ padding: '6rem', textAlign: 'center' }}>
      <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: '#3D2010' }}>Recipe not found</p>
      <Link href="/" style={{ color: '#E8622A', fontFamily: '"Lato", sans-serif' }}>← Back to home</Link>
    </div>
  )

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  return (
    <div>
      {/* Hero Image */}
      {recipe.mainImage && (
        <div className="recipe-hero-image" style={{
          width: '100%',
          height: '480px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Image
            src={urlFor(recipe.mainImage).width(1200).height(480).url()}
            alt={recipe.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(30,14,5,0.7) 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '1100px',
            padding: '0 2rem',
            textAlign: 'center',
          }}>
            <Link href={`/category/${recipe.category}`} style={{
              display: 'inline-block',
              background: 'rgba(232,98,42,0.9)',
              color: 'white',
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '0.3rem 0.9rem',
              borderRadius: '50px',
              fontFamily: '"Lato", sans-serif',
              marginBottom: '1rem',
            }}>
              {categoryLabel[recipe.category] || recipe.category}
            </Link>
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              color: 'white',
              lineHeight: 1.2,
              textShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}>
              {recipe.title}
            </h1>
          </div>
        </div>
      )}

      {/* Main layout: content + sidebar */}
      <div className="recipe-page-layout content-section" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        alignItems: 'start',
      }}>

        {/* LEFT: Recipe content */}
        <div>
          {/* Title if no image */}
          {!recipe.mainImage && (
            <>
              <Link href={`/category/${recipe.category}`} style={{
                display: 'inline-block',
                background: '#FDF6EE',
                color: '#E8622A',
                fontSize: '0.72rem',
                fontWeight: '700',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                padding: '0.3rem 0.9rem',
                borderRadius: '50px',
                fontFamily: '"Lato", sans-serif',
                marginBottom: '1rem',
              }}>
                {categoryLabel[recipe.category] || recipe.category}
              </Link>
              <h1 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: '#2C1A0E',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}>
                {recipe.title}
              </h1>
            </>
          )}

          {/* Meta cards */}
          {(recipe.prepTime || recipe.cookTime || recipe.servings) && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '1rem',
              margin: '2rem 0',
              padding: '1.5rem',
              background: '#FDF6EE',
              borderRadius: '16px',
              border: '1px solid #F0E6DC',
            }}>
              {recipe.prepTime && (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>⏱</p>
                  <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: '#A08070', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Prep</p>
                  <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A0E', fontWeight: '600' }}>{recipe.prepTime} min</p>
                </div>
              )}
              {recipe.cookTime && (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🔥</p>
                  <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: '#A08070', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Cook</p>
                  <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A0E', fontWeight: '600' }}>{recipe.cookTime} min</p>
                </div>
              )}
              {totalTime > 0 && (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🕐</p>
                  <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: '#A08070', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Total</p>
                  <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A0E', fontWeight: '600' }}>{totalTime} min</p>
                </div>
              )}
              {recipe.servings && (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🍽</p>
                  <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: '#A08070', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Serves</p>
                  <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A0E', fontWeight: '600' }}>{recipe.servings}</p>
                </div>
              )}
            </div>
          )}

          {/* Star Rating */}
          <div style={{
            margin: '2.5rem 0',
            padding: 'clamp(1.5rem, 5vw, 2.25rem)',
            background: '#FDF6EE',
            border: '1px solid #F0E6DC',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(61,32,16,0.04)',
          }}>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.8rem, 6vw, 3rem)',
              color: '#2C1A0E',
              marginBottom: '0.5rem',
            }}>
              Did you try this recipe?
            </h3>
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: 'clamp(0.9rem, 3vw, 1.44rem)',
              color: '#E8622A',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: 'clamp(1.5rem, 5vw, 3rem)',
            }}>
              Rate it below!
            </p>
            <div className="star-rating-scale">
              <StarRating slug={slug} />
            </div>
          </div>

          {/* Description */}
          {recipe.description && (
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '1.05rem',
              color: '#6B5244',
              lineHeight: 1.85,
              margin: '1.5rem 0 2rem',
              fontStyle: 'italic',
              paddingLeft: '1.25rem',
              borderLeft: '3px solid #E8622A',
            }}>
              {recipe.description}
            </p>
          )}

          {/* Ingredients + Steps */}
          <div className={`recipe-body-grid ${recipe.ingredients?.length > 0 && recipe.steps?.length > 0 ? 'has-ingredients' : ''}`} style={{
            alignItems: 'start',
            margin: '2rem 0',
          }}>
            {recipe.ingredients?.length > 0 && (
              <div className="sticky-panel" style={{
                background: '#FDF6EE',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #F0E6DC',
              }}>
                <h2 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.4rem',
                  color: '#2C1A0E',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '2px solid #E8622A',
                }}>
                  Ingredients
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {recipe.ingredients.map((item, i) => (
                    <li key={i} style={{
                      fontFamily: '"Lato", sans-serif',
                      fontSize: '0.9rem',
                      color: '#3D2010',
                      padding: '0.55rem 0',
                      borderBottom: '1px solid #F0E6DC',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      lineHeight: 1.5,
                    }}>
                      <span style={{ color: '#E8622A', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recipe.steps?.length > 0 && (
              <div>
                <h2 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.4rem',
                  color: '#2C1A0E',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '2px solid #E8622A',
                }}>
                  Instructions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {recipe.steps.map((step, i) => (
                    <div key={i} className="recipe-step" style={{
                      display: 'flex',
                      gap: '1.1rem',
                      alignItems: 'flex-start',
                      padding: '1.25rem',
                      background: 'white',
                      borderRadius: '12px',
                      border: '1px solid #F0E6DC',
                    }}>
                      <span style={{
                        background: '#E8622A',
                        color: 'white',
                        borderRadius: '50%',
                        width: '34px',
                        height: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: '"Lato", sans-serif',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        flexShrink: 0,
                      }}>
                        {i + 1}
                      </span>
                      <p style={{
                        fontFamily: '"Lato", sans-serif',
                        fontSize: '0.95rem',
                        color: '#2C1A0E',
                        lineHeight: 1.8,
                        margin: 0,
                        paddingTop: '4px',
                      }}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Full body content */}
          {recipe.body && (
            <div style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '1rem',
              lineHeight: 1.9,
              color: '#3D2010',
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid #F0E6DC',
            }}>
              <PortableText value={recipe.body} />
            </div>
          )}

        </div>

        {/* RIGHT: Author Sidebar */}
        {author && (
          <div className="sticky-panel">
            {recipe.mainImage && (
              <div className="recipe-sidebar-image">
                <Image
                  src={urlFor(recipe.mainImage).width(640).height(360).url()}
                  alt={recipe.title}
                  width={640}
                  height={360}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  priority
                />
                <div className="recipe-sidebar-title">
                  <h2>{recipe.title}</h2>
                </div>
              </div>
            )}

            <div style={{
              background: '#FDF6EE',
              border: '1px solid #F0E6DC',
              borderRadius: '20px',
              padding: '1.75rem',
              textAlign: 'center',
            }}>
              {/* Photo */}
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
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.72rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#E8622A',
                marginBottom: '0.25rem',
                fontWeight: '700',
              }}>
                Recipe by
              </p>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.3rem',
                color: '#2C1A0E',
                marginBottom: '0.75rem',
              }}>
                {author.name}
              </h3>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.875rem',
                color: '#6B5244',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
                textAlign: 'left',
              }}>
                {author.bio}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
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

            {/* Back to all recipes button */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/recipes" className="back-to-recipes-button" style={{
                display: 'inline-block',
                position: 'relative',
                background: '#E8622A',
                color: 'white',
                padding: '0.9rem 2.2rem',
                borderRadius: '50px',
                fontFamily: '"Lato", sans-serif',
                fontWeight: '700',
                fontSize: '0.95rem',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 20px rgba(232,98,42,0.25)',
                textDecoration: 'none', // Ensure no default underline
              }}>
                <span className="back-button-text">← Back to all recipes</span>
              </Link>
              {/* For a full hover effect, you would typically add external CSS like:
              .back-to-recipes-button:hover { background: #C75020; box-shadow: 0 6px 25px rgba(232,98,42,0.4); } */}
            </div>
          </div>
        )}
      </div>

      {/* Suggested Recipes Section */}
      <div className="content-section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SuggestedRecipes currentRecipeId={recipe._id} />
      </div>
    </div>
  )
}
