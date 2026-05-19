import { LegalStaticPage, staticPageMetadata } from '../static-pages'

export const metadata = staticPageMetadata.gdpr

export default function GDPRPolicyPage() {
  return <LegalStaticPage page="gdpr" />
}
