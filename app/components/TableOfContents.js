'use client'

export default function TableOfContents({ items }) {
  if (!items.length) return null

  return (
    <div style={{
      background: 'var(--cream-light)',
      border: '1px solid var(--gray)',
      borderRadius: '16px',
      padding: '1.25rem',
      marginBottom: '1.5rem',
    }}>
      <p style={{
        fontFamily: '"Lato", sans-serif',
        fontSize: '0.7rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--orange)',
        fontWeight: '700',
        marginBottom: '0.75rem',
      }}>
        On this page
      </p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
        {items.map(item => (
          <a key={item.href} href={item.href} style={{
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.875rem',
            color: 'var(--text-light)',
            padding: '0.4rem 0.5rem',
            borderRadius: '8px',
            display: 'block',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--gray)'
              e.currentTarget.style.color = 'var(--orange)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-light)'
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}