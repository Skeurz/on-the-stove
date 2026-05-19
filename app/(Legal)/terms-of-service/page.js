import { LegalStaticPage, staticPageMetadata } from '../static-pages'

export const metadata = staticPageMetadata.terms

export default function TermsOfServicePage() {
  return <LegalStaticPage page="terms" />
}
