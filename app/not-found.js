import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      {/* Big emoji */}
      <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🍳</div>

      {/* 404 */}
      <p style={{
        fontFamily: '"Lato", sans-serif',
        fontSize: '0.78rem',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--orange)',
        fontWeight: '700',
        marginBottom: '0.75rem',
      }}>
        404 — Page Not Found
      </p>

      <h1 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        color: 'var(--brown)',
        lineHeight: 1.2,
        marginBottom: '1rem',
        maxWidth: '600px',
      }}>
        Looks like this recipe got burned 🔥
      </h1>

      <p style={{
        fontFamily: '"Lato", sans-serif',
        fontSize: '1rem',
        color: 'var(--text-light)',
        lineHeight: 1.7,
        maxWidth: '420px',
        marginBottom: '2.5rem',
      }}>
        {"The page you're looking for doesn't exist or may have moved. Let's get you back to the kitchen."}
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          background: 'var(--orange)',
          color: 'white',
          fontFamily: '"Lato", sans-serif',
          fontWeight: '700',
          fontSize: '0.95rem',
          padding: '0.85rem 2rem',
          borderRadius: '50px',
          boxShadow: '0 4px 20px rgba(232,98,42,0.3)',
        }}>
          Back to Home
        </Link>
        <Link href="/recipes" style={{
          background: 'transparent',
          color: 'var(--brown)',
          fontFamily: '"Lato", sans-serif',
          fontWeight: '700',
          fontSize: '0.95rem',
          padding: '0.85rem 2rem',
          borderRadius: '50px',
          border: '1px solid var(--gray)',
        }}>
          Browse Recipes
        </Link>
      </div>

      {/* Suggestions */}
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem 2rem',
        background: 'var(--cream-light)',
        borderRadius: '16px',
        border: '1px solid var(--gray)',
        maxWidth: '400px',
        width: '100%',
      }}>
        <p style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.8rem',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'var(--orange)',
          fontWeight: '700',
          marginBottom: '0.75rem',
        }}>
          You might be looking for
        </p>
        {[
          { label: '🍰 Desserts', href: '/category/desserts' },
          { label: '🍝 Dinner Recipes', href: '/category/dinner' },
          { label: '🥞 Breakfast', href: '/category/breakfastnbrunch' },
          { label: '🥨 Snacks & Sides', href: '/category/snacksnsides' },
        ].map(link => (
          <Link key={link.href} href={link.href} style={{
            display: 'block',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.9rem',
            color: 'var(--text)',
            padding: '0.5rem 0',
            borderBottom: '1px solid var(--gray)',
          }}>
            {link.label} →
          </Link>
        ))}
      </div>
    </div>
  )
}
