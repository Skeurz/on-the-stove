import './globals.css'
import Link from 'next/link'
import Navbar from './components/Navbar'
import BackToTop from './components/BackToTop'

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
            borderTop: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
            padding: '1.5rem 2rem',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.8rem',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem 1.5rem',
              marginBottom: '0.75rem',
            }}>
              {[
                { label: 'About Me', href: '/about' },
                { label: 'GDPR Policy', href: '/gdpr-policy' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Disclaimer', href: '/disclaimer' },
                { label: 'Terms of Service', href: '/terms-of-service' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{
                  color: 'rgba(253,246,238,0.5)',
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '0.8rem',
                  transition: 'color 0.15s',
                }}>
                  {link.label}
                </Link>
              ))}
            </div>
            © {new Date().getFullYear()} On The Stove · Made with ❤️ by Adelaide
          </div>
        </footer>
        <BackToTop />
      </body>
    </html>
  )
}