import { client } from '@/sanity/lib/client'
import { getRecipeBySlug, getAuthor } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import StarRating from '@/app/components/StarRating'
import SuggestedRecipes from '@/app/components/SuggestedRecipes'
import RecipeActions from '@/app/components/RecipeActions'

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
  recipe.prepTime ? { label: 'Prep time', value: `${recipe.prepTime} min` } : null,
  recipe.cookTime ? { label: 'Cook time', value: `${recipe.cookTime} min` } : null,
  totalTime > 0 ? { label: 'Total time', value: `${totalTime} min` } : null,
  recipe.servings ? { label: 'Servings', value: recipe.servings } : null,
  recipe.calories ? { label: 'Calories', value: recipe.calories } : null,
].filter(Boolean)

const tableOfContents = [
  recipe.description ? { href: '#recipe-overview', label: 'Overview' } : null,
  recipeFacts.length > 0 ? { href: '#recipe-facts', label: 'Recipe Details' } : null,
  recipe.ingredients?.length > 0 ? { href: '#recipe-ingredients', label: `Ingredients (${recipe.ingredients.length})` } : null,
  recipe.steps?.length > 0 ? { href: '#recipe-instructions', label: `Instructions (${recipe.steps.length} steps)` } : null,
  recipe.body ? { href: '#recipe-notes', label: 'Chef\'s Notes' } : null,
].filter(Boolean)

  const ratingBreakdownUI = (
    <div className="rating-breakdown" style={{
      marginTop: '1.25rem',
      padding: '1rem',
      background: 'var(--cream)',
      borderRadius: '12px',
      border: '1px solid var(--gray)',
      display: 'grid',
      gap: '0.6rem',
      width: '100%'
    }}>
        {[5, 4, 3, 2, 1].map(stars => {
          const count = recipe.ratingBreakdown?.[`star${stars}`] || 0;
          const percentage = recipe.ratingCount ? (count / recipe.ratingCount) * 100 : 0;
          return (
            <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
              <span style={{ minWidth: '50px', fontWeight: '700', color: 'var(--brown)' }}>{stars} Stars</span>
              <div style={{ flex: 1, height: '6px', background: 'var(--gray)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${percentage}%`, 
                  height: '100%', 
                  background: 'var(--orange)',
                  transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                }} />
              </div>
              <span style={{ minWidth: '20px', textAlign: 'right', opacity: 0.6 }}>{count}</span>
            </div>
          );
        })}
    </div>
  )

  return (
    <div>
      {/* Main layout: content + sidebar */}
      <div className="recipe-page-layout content-section" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        alignItems: 'start',
      }}>

        {/* LEFT: Rating card */}
        <aside className="recipe-rating-rail">
          <div className="recipe-rating-card">
            <p className="recipe-rating-eyebrow">Tried it?</p>
            <h3>Rate this recipe</h3>
            <StarRating slug={slug} />
            {ratingBreakdownUI}
          </div>

          <div className="recipe-toc-card">
            <p className="recipe-toc-eyebrow">On this recipe</p>
            <nav aria-label="Recipe table of contents">
              {tableOfContents.length > 0 ? (
                tableOfContents.map(item => (
                  <a key={item.href} href={item.href}>{item.label}</a>
                ))
              ) : (
                <a href="#recipe-details">Recipe details</a>
              )}
            </nav>
          </div>
        </aside>

        {/* MAIN: Recipe content */}
        <div>
          <section className="recipe-entry-header">
            <Link href={`/category/${recipe.category}`} className="recipe-category-pill">
              {categoryLabel[recipe.category] || recipe.category}
            </Link>

            <h1>{recipe.title}</h1>

            {recipe.mainImage && (
              <div className="recipe-entry-image">
                <Image
                  src={urlFor(recipe.mainImage).width(1100).height(640).url()}
                  alt={recipe.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}

            <RecipeActions />

            {recipeFacts.length > 0 && (
                <div id="recipe-facts" className="recipe-facts-grid">
                {recipeFacts.map(fact => (
                  <div key={fact.label} className="recipe-fact-card">
                    <p>{fact.label}</p>
                    <strong>{fact.value}</strong>
                  </div>
                ))}
              </div>
            )}
          </section>

           {/* Main Recipe Content Card */}
          <div className="recipe-content-card" style={{
            background: 'var(--cream-light)',
            border: '1px solid var(--gray)',
            borderRadius: '24px',
            padding: 'clamp(1.5rem, 5vw, 3.5rem)',
            boxShadow: '0 15px 45px rgba(0,0,0,0.04)',
            marginBottom: '3rem',
          }}>
            
            {/* Description Section */}
            {recipe.description && (
              <div id="recipe-overview" style={{ marginBottom: '3rem' }}>
                <p style={{ 
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '1.15rem', 
                  lineHeight: 1.8, 
                  color: 'var(--text)', 
                  margin: 0,
                  fontStyle: 'italic',
                  opacity: 0.9 
                }}>
                  {recipe.description}
                </p>
                <div style={{ borderTop: '2px solid var(--orange)', marginTop: '2rem', width: '60px' }} />
              </div>
            )}


  <div id="recipe-details" style={{ 
              display: 'grid', 
              gap: '4rem', 
              gridTemplateColumns: recipe.ingredients?.length > 0 && recipe.steps?.length > 0 ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr' 
            }}>
              {/* Ingredients Section */}
              {recipe.ingredients?.length > 0 && (
                <div id="recipe-ingredients">
                  <h2 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '1.6rem',
                    color: 'var(--brown)',
                    marginBottom: '1.5rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '2px solid var(--orange)',
                  }}>
                    Ingredients
                  </h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {recipe.ingredients.map((item, i) => (
                      <li key={i} style={{
                        fontFamily: '"Lato", sans-serif',
                        fontSize: '1rem',
                        color: 'var(--text)',
                        padding: '0.7rem 0',
                        borderBottom: '1px solid var(--gray)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.8rem',
                        lineHeight: 1.6,
                      }}>
                        <span style={{ color: 'var(--orange)', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructions Section */}
              {recipe.steps?.length > 0 && (
                <div id="recipe-instructions">
                  <h2 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '1.6rem',
                    color: 'var(--brown)',
                    marginBottom: '1.5rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '2px solid var(--orange)',
                  }}>
                    Instructions
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    {recipe.steps.map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                        <span style={{
                          background: 'var(--orange)',
                          color: 'white',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: '"Lato", sans-serif',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          flexShrink: 0,
                        }}>
                          {i + 1}
                        </span>
                        <p style={{
                          fontFamily: '"Lato", sans-serif',
                          fontSize: '1rem',
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

            {/* Notes Section */}
            {recipe.body && (
              <div id="recipe-notes" style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '1.05rem',
                lineHeight: 1.9,
                color: 'var(--text)',
                marginTop: '4rem',
                paddingTop: '3rem',
                borderTop: '1px solid var(--gray)',
              }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: 'var(--brown)', marginBottom: '1.5rem' }}>
                  Chef's Notes
                </h3>
                <PortableText value={recipe.body} />
              </div>
            )}
          </div>


          <div className="recipe-print-rating">
            <div className="recipe-rating-card" style={{ marginBottom: '2.5rem' }}>
              <p className="recipe-rating-eyebrow">Tried it?</p>
              <h3>Rate this recipe</h3>
              <StarRating slug={slug} />
              {ratingBreakdownUI}
            </div>
          </div>

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
              background: 'var(--cream)',
              border: '1px solid var(--gray)',
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
                color: 'var(--text)',
                marginBottom: '0.75rem',
              }}>
                {author.name}
              </h3>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.875rem',
                color: 'var(--text-light)',
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
