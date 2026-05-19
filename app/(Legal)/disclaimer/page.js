import { LegalStaticPage, staticPageMetadata } from '../static-pages'

export const metadata = staticPageMetadata.disclaimer

export default function DisclaimerPage() {
  return <LegalStaticPage page="disclaimer" />
}
