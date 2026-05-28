import { client } from '@/sanity/lib/client'
import { getPaginatedRecipes, getAuthor } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import RecipeCard from './components/RecipeCard'
import NewsletterSignup from './components/NewsletterSignup'
import HeroVideoControl from './components/HeroVideoControl'
import { ArrowRight, CakeSlice, Coffee, Pizza, Salad, Sandwich, Sparkles } from 'lucide-react'

const RECIPES_PER_PAGE = 8

export default async function Home({ searchParams }) {
  const params = await searchParams
  const currentPage = Math.max(Number(params?.page) || 1, 1)
  const start = (currentPage - 1) * RECIPES_PER_PAGE
  const end = start + RECIPES_PER_PAGE
  const [{ recipes, total }, author] = await Promise.all([
    client.fetch(getPaginatedRecipes, { start, end }),
    client.fetch(getAuthor),
  ])
  const totalPages = Math.max(Math.ceil(total / RECIPES_PER_PAGE), 1)

  return (
    <div>
      {/* Hero */}
      <section className="hero-section with-video" style={{
        position: 'relative',
        overflow: 'hidden',
        marginTop: '-68px',
        padding: 'calc(7rem + 68px) 2rem 5rem',
        color: 'white',
        textAlign: 'center',
      }}>
        <video className="hero-bg-video" autoPlay muted loop playsInline>
          <source src="/hero-background.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className="hero-overlay" />
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(232,98,42,0.12)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(232,98,42,0.08)', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: '700',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            letterSpacing: '-0.5px',
          }}>
            Simple Recipes for<br />
            <em style={{ color: '#E8622A' }}>Real Life</em>
          </h1>

          <p style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '480px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8,
            fontWeight: '300',
          }}>
            {"Good food doesn't have to be complicated. Join Adelaide on a tasteful journey through comforting, approachable cooking."}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/recipes" style={{
              background: '#E8622A',
              color: 'white',
              padding: '0.85rem 2.2rem',
              borderRadius: '50px',
              fontFamily: '"Lato", sans-serif',
              fontWeight: '700',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
              display: 'inline-block',
              boxShadow: '0 4px 20px rgba(232,98,42,0.4)',
            }}>
              Browse Recipes
            </Link>
           <Link href="/collections" className="sparkle-button" style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(244,148,106,0.15) 100%)',
              color: 'white',
              padding: '0.85rem 2.2rem',
              borderRadius: '50px',
              fontFamily: '"Lato", sans-serif',
              fontWeight: '700',
              fontSize: '0.95rem',
              border: '1px solid #F4946A',
              display: 'inline-block',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 0 15px rgba(244,148,106,0.2)',
            }}>
              <span className="icon-text"><Sparkles size={16} strokeWidth={1.8} aria-hidden="true" /> My collections</span>
            </Link> 
            <Link href="/about" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              padding: '0.85rem 2.2rem',
              borderRadius: '50px',
              fontFamily: '"Lato", sans-serif',
              fontWeight: '400',
              fontSize: '0.95rem',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'inline-block',
            }}>
              About me
            </Link>
          </div>
        </div>

        <HeroVideoControl />

       {/* Scroll-down prompt */}
<a href="#recipes-grid" className="scroll-prompt">
  <div className="scroll-prompt-arrow">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
      <polyline points="6 14 12 20 18 14" />
    </svg>
  </div>
</a>
      </section>

      {/* Category Pills */}
      <section className="mobile-scroll-pills" style={{
        background: '#1E0E05',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1.25rem 2rem',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          maxWidth: '1200px',
          margin: '0 auto',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Lunch', href: '/category/lunch', Icon: Sandwich },
            { label: 'Dinner', href: '/category/dinner', Icon: Pizza },
            { label: 'Breakfast', href: '/category/breakfastnbrunch', Icon: Coffee },
            { label: 'Snacks', href: '/category/snacksnsides', Icon: Salad },
            { label: 'Desserts', href: '/category/desserts', Icon: CakeSlice },
            { label: 'Drinks', href: '/category/drinks-shakes', Icon: Coffee },
            { label: 'My collections', href: '/collections', Icon: Sparkles },
          ].map(cat => {
            const isCollections = cat.href === '/collections';
            return (
              <Link key={cat.href} href={cat.href} className={isCollections ? 'sparkle-button' : ''} style={{
                background: isCollections ? 'rgba(232, 98, 42, 0.15)' : 'transparent',
                border: isCollections ? '1px dashed #F4946A' : '1px solid rgba(255,255,255,0.15)',
                color: isCollections ? '#F4946A' : 'rgba(253,246,238,0.85)',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.85rem',
                fontWeight: '700',
                padding: '0.45rem 1.1rem',
                borderRadius: '50px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}>
              <span className="icon-text"><cat.Icon size={14} strokeWidth={1.8} aria-hidden="true" /> {cat.label}</span>
            </Link>
            );
          })}
        </div>
      </section>

      {/* Recipes Grid */}
      <section id="recipes-grid" className="content-section" style={{
        maxWidth: '1200px',
        margin: '4rem auto',
      }}>
        <div className="homepage-recipes-layout">
<div>
                 <div style={{
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'space-between',
                   gap: '1rem',
                   marginBottom: '2rem',
                   flexWrap: 'wrap',
                 }}>
                   <div className="heading-card" style={{
                     background: 'var(--cream)',
                     border: '1px solid var(--gray)',
                     borderRadius: '12px',
                     padding: '0.6rem 1.2rem',
                     width: 'fit-content',
                   }}>
                     <h2 style={{
                       fontFamily: '"Playfair Display", serif',
                       fontSize: '2rem',
                       color: 'var(--brown)',
                       margin: 0,
                     }}>
                       Recent Recipes
                     </h2>
                   </div>
                   <div className="heading-card" style={{
                     background: 'var(--cream)',
                     border: '1px solid var(--gray)',
                     borderRadius: '12px',
                     padding: '0.6rem 1.2rem',
                     width: 'fit-content',
                   }}>
                     <Link href="/recipes" style={{
                       fontFamily: '"Lato", sans-serif',
                       fontSize: '0.88rem',
                       color: 'var(--orange)',
                       fontWeight: '700',
                       letterSpacing: '0.3px',
                       whiteSpace: 'nowrap',
                     }}>
                       <span className="icon-text">View all <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" /></span>
                     </Link>
                   </div>
                 </div>

            <div className="recipe-grid">
              {recipes.slice(0, RECIPES_PER_PAGE).map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  imageUrl={recipe.mainImage ? urlFor(recipe.mainImage).width(400).height(200).url() : null}
                />
              ))}
            </div>

{totalPages > 1 && (
               <Pagination currentPage={currentPage} totalPages={totalPages} />
             )}
           </div>

           {author && (
             <aside className="home-author-sidebar">
               <div className="sticky-panel">
                 <div className="author-bio-card">
                   {author.photo && (
                     <div style={{
                       width: '100px',
                       height: '100px',
                       borderRadius: '50%',
                       overflow: 'hidden',
                       margin: '0 auto 1rem',
                       border: '3px solid var(--orange)',
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
                     color: 'var(--orange)',
                     marginBottom: '0.25rem',
                     fontWeight: '700',
                   }}>
                     About me
                   </p>
                   <h3 style={{
                     fontFamily: '"Playfair Display", serif',
                     fontSize: '1.3rem',
                     color: 'var(--brown)',
                     marginBottom: '1rem',
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

                   <Link href="/about" className="button button-link" style={{
                     display: 'inline-block',
                     marginTop: '0.5rem',
                     background: 'var(--orange)',
                     color: 'var(--cream)',
                     padding: '0.85rem 1.25rem',
                     borderRadius: '999px',
                     fontFamily: '"Lato", sans-serif',
                     fontWeight: '700',
                     textDecoration: 'none',
                   }}>
                     Learn more
                   </Link>
                 </div>
               </div>
             </aside>
           )}
         </div>      
       </section>

      {/* Newsletter */}
      <section className="content-section" style={{
        maxWidth: '1200px',
        margin: '0 auto 4rem',
      }}>
        <NewsletterSignup source="homepage" />
      </section>
     </div>
   )
}


function Pagination({ currentPage, totalPages }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const pageHref = (page) => page === 1 ? '/#recipes-grid' : `/?page=${page}#recipes-grid`

  return (
    <nav aria-label="Recipe pagination" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '0.6rem',
      marginTop: '2.5rem',
      fontFamily: '"Lato", sans-serif',
      }}>
      {currentPage > 1 && (
        <PageLink href={pageHref(currentPage - 1)}>
          Previous
        </PageLink>
      )}

      {pages.map((page) => (
        <PageLink
          key={page}
          href={pageHref(page)}
          active={page === currentPage}
        >
          {page}
        </PageLink>
      ))}

      {currentPage < totalPages && (
        <PageLink href={pageHref(currentPage + 1)}>
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
