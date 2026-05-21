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
  title: 'On The Stove – Cook With Adelaide',
  description: 'From My Kitchen, To Yours. Simple, comforting recipes for real life.',
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
