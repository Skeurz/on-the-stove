import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'On The Stove',
  description: 'From My Kitchen, To Yours.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          background: '#3D2010',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <Link href="/" style={{
            fontFamily: 'Playfair Display, serif',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '700',
            letterSpacing: '1px',
          }}>
            On The Stove
          </Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[
              { label: 'Lunch', href: '/category/lunch' },
              { label: 'Dinner', href: '/category/dinner' },
              { label: 'Breakfast', href: '/category/breakfastnbrunch' },
              { label: 'Snacks', href: '/category/snacksnsides' },
              { label: 'Desserts', href: '/category/desserts' },
              { label: 'Drinks', href: '/category/drinks-shakes' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                color: 'rgba(255,255,255,0.85)',
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <main>{children}</main>

        <footer style={{
          background: '#3D2010',
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          padding: '2rem',
          marginTop: '4rem',
          fontFamily: 'Lato, sans-serif',
          fontSize: '0.85rem',
        }}>
          © {new Date().getFullYear()} On The Stove · Made with ❤️ by Adelaide
        </footer>
      </body>
    </html>
  )
}