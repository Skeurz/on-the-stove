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
  { label: '✨ My collections', href: '/collections' },
]

export const metadata = {
  title: {
    default: 'On The Stove – Cook With Adelaide',
    template: '%s – On The Stove',
  },
  description: 'From My Kitchen, To Yours. Simple, comforting recipes for real life.',
  keywords: ['recipes', 'cooking', 'food blog', 'easy recipes', 'home cooking', 'Adelaide'],
  authors: [{ name: 'Adelaide' }],
  creator: 'Adelaide',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://onthestove.com',
    siteName: 'On The Stove',
    title: 'On The Stove – Cook With Adelaide',
    description: 'From My Kitchen, To Yours. Simple, comforting recipes for real life.',
    images: [{
      url: 'https://onthestove.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'On The Stove – Cook With Adelaide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'On The Stove – Cook With Adelaide',
    description: 'From My Kitchen, To Yours. Simple, comforting recipes for real life.',
    images: ['https://onthestove.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes sparkle-sweep {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes star-pop {
            0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          }
          /* Targeting explicitly classed buttons and navigation links by href */
          .sparkle-button, 
          nav a[href="/collections"], 
          .site-footer a[href="/collections"] {
            position: relative !important;
            transition: all 0.3s ease !important;
          }
          .sparkle-button:hover, 
          nav a[href="/collections"]:hover,
          .site-footer a[href="/collections"]:hover {
            background: linear-gradient(90deg, #F4946A, #fff, #F4946A) !important;
            background-size: 200% 100% !important;
            animation: sparkle-sweep 1.5s infinite linear !important;
            color: #1E0E05 !important;
            border-color: transparent !important;
            box-shadow: 0 0 20px rgba(244,148,106,0.6) !important;
            transform: translateY(-2px);
            border-radius: 50px;
          }
          .sparkle-button:hover::after, 
          nav a[href="/collections"]:hover::after,
          .site-footer a[href="/collections"]:hover::after {
            content: '✨';
            position: absolute;
            top: -10px;
            right: -10px;
            font-size: 1.2rem;
            animation: star-pop 1s infinite;
            pointer-events: none;
          }
          @keyframes star-burst {
            0% { transform: scale(1); }
            50% { transform: scale(1.6); filter: drop-shadow(0 0 15px #E8622A); }
            100% { transform: scale(1); }
          }
          @keyframes success-pop {
            0% { transform: scale(0.9); opacity: 0; }
            70% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-burst {
            animation: star-burst 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important;
          }
          .animate-success {
            animation: success-pop 0.4s ease-out forwards !important;
          }
        `}} />
        <Navbar />

        <EnhanceButtons />

        <main>{children}</main>

        <footer style={{
          background: 'linear-gradient(135deg, #1A0A02 0%, #1E0E05 40%, #1A0A02 100%)',
          borderTop: '1px solid rgba(232,98,42,0.2)',
          marginTop: '6rem',
        }}>
         

          {/* Middle footer */}
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2.5rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
          }}>
            {/* Categories */}
            <div>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#E8622A',
                marginBottom: '1rem',
                fontWeight: '700',
              }}>
                Categories
              </p>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} style={{
                  display: 'block',
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '0.875rem',
                  color: 'rgba(253,246,238,0.6)',
                  marginBottom: '0.5rem',
                  transition: 'color 0.15s',
                }}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Quick links */}
            <div>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#E8622A',
                marginBottom: '1rem',
                fontWeight: '700',
              }}>
                Quick Links
              </p>
              {[
                { label: 'About Adelaide', href: '/about' },
                { label: 'All Recipes', href: '/recipes' },
                { label: 'My Collections', href: '/collections' },
                { label: 'Contact', href: '/contact' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{
                  display: 'block',
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '0.875rem',
                  color: 'rgba(253,246,238,0.6)',
                  marginBottom: '0.5rem',
                }}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Legal */}
            <div>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#E8622A',
                marginBottom: '1rem',
                fontWeight: '700',
              }}>
                Legal
              </p>
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'GDPR Policy', href: '/gdpr-policy' },
                { label: 'Disclaimer', href: '/disclaimer' },
                { label: 'Terms of Service', href: '/terms-of-service' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{
                  display: 'block',
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '0.875rem',
                  color: 'rgba(253,246,238,0.6)',
                  marginBottom: '0.5rem',
                }}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social */}
            <div>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#E8622A',
                marginBottom: '1rem',
                fontWeight: '700',
              }}>
                Follow Along
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <a href="https://www.instagram.com/officialonthestove/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  <img src="/instagram.png" alt="Instagram" className="social-icon" />
                </a>
                <a href="https://www.pinterest.com/officialonthestove/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Pinterest">
                  <img src="/pinterest.png" alt="Pinterest" className="social-icon" />
                </a>
              </div>
              <p style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.8rem',
                color: 'rgba(253,246,238,0.45)',
                lineHeight: 1.6,
              }}>
                New recipes every week. Follow for daily inspiration!
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '1.25rem 2rem',
            textAlign: 'center',
            fontFamily: '"Lato", sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(253,246,238,0.35)',
          }}>
            © {new Date().getFullYear()} On The Stove · Made with ❤️ by Adelaide
          </div>
        </footer>
        <BackToTop />
      </body>
    </html>
  )
}
