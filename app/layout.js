import './globals.css'
import Link from 'next/link'
import Navbar from './components/Navbar'

const navLinks = [
  { label: 'Lunch', href: '/category/lunch' },
  { label: 'Dinner', href: '/category/dinner' },
  { label: 'Breakfast', href: '/category/breakfastnbrunch' },
  { label: 'Snacks & Sides', href: '/category/snacksnsides' },
  { label: 'Desserts', href: '/category/desserts' },
  { label: 'Drinks & Shakes', href: '/category/drinks-shakes' },
]

export const metadata = {
  title: 'On The Stove – Cook With Adelaide',
  description: 'From My Kitchen, To Yours. Simple, comforting recipes for real life.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>{children}</main>

        <footer style={{
          background: '#1E0E05',
          color: 'rgba(253,246,238,0.5)',
          marginTop: '6rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '3rem 2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '2rem',
          }}>
            <div>
              <p style={{
                fontFamily: '"Playfair Display", serif',
                color: '#FDF6EE',
                fontSize: '1.2rem',
                marginBottom: '0.75rem',
              }}>On The Stove</p>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.85rem',
                lineHeight: 1.7,
              }}>
                From My Kitchen, To Yours. Simple, comforting recipes for real life.
              </p>
            </div>
            <div>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#E8622A',
                marginBottom: '1rem',
              }}>Categories</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} style={{
                    fontFamily: '"Lato", sans-serif',
                    fontSize: '0.875rem',
                    color: 'rgba(253,246,238,0.6)',
                  }}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#E8622A',
                marginBottom: '1rem',
              }}>Legal</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Privacy Policy', 'Disclaimer', 'Terms of Service'].map(label => (
                  <Link key={label} href="/" style={{
                    fontFamily: '"Lato", sans-serif',
                    fontSize: '0.875rem',
                    color: 'rgba(253,246,238,0.6)',
                  }}>{label}</Link>
                ))}
              </div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
            padding: '1.25rem',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.8rem',
          }}>
            © {new Date().getFullYear()} On The Stove · Made with ❤️ by Adelaide
          </div>
        </footer>
      </body>
    </html>
  )
}