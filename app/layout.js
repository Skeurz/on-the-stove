import './globals.css'
import Link from 'next/link'
import Navbar from './components/Navbar'
import BackToTop from './components/BackToTop'
import EnhanceButtons from './components/EnhanceButtons'

const navLinks = [
  { label: 'Lunch', href: '/category/lunch' },
  { label: 'Dinner', href: '/category/dinner' },
  { label: 'Breakfast', href: '/category/breakfastnbrunch' },
  { label: 'Snacks & Sides', href: '/category/snacksnsides' },
  { label: 'Desserts', href: '/category/desserts' },
  { label: 'Drinks & Shakes', href: '/category/drinks-shakes' },
  { label: 'My collections', href: '/collections' },
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

        <EnhanceButtons />

        <main>{children}</main>

        <footer className="site-footer">
          <div className="footer-content">
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
                <Link key={link.href} href={link.href} className="footer-nav-link" style={{
                  color: 'rgba(253,246,238,0.5)',
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '0.8rem',
                }}>
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="footer-contact-button button button-link" style={{
                marginTop: '-0.25rem',
                background: '#E8622A',
                color: 'white',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                minWidth: 'fit-content',
              }}>
                Contact
              </Link>
            </div>
            <div className="footer-socials" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '0.5rem',
            }}>
              <a href="https://www.instagram.com/officialonthestove/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <img src="/instagram.png" alt="Instagram" className="social-icon" />
              </a>
              <a href="https://www.pinterest.com/officialonthestove/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Pinterest">
                <img src="/pinterest.png" alt="Pinterest" className="social-icon" />
              </a>
            </div>
            © {new Date().getFullYear()} On The Stove · Made with ❤️ by Adelaide
          </div>
        </footer>
        <BackToTop />
      </body>
    </html>
  )
}
