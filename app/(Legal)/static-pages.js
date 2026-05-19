import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { getAuthor } from '@/sanity/lib/queries'

export const staticPageMetadata = {
  about: {
    title: 'About Me - On The Stove',
    description: 'From My Kitchen To Yours. Meet Adelaide, the home cook behind On The Stove.',
  },
  contact: {
    title: 'Contact - On The Stove',
    description: 'Contact On The Stove for recipe questions, collaborations, feedback, or general inquiries.',
  },
  disclaimer: {
    title: 'Disclaimer - On The Stove',
    description: 'Read the On The Stove disclaimer for recipe information, nutrition estimates, affiliate links, and external content.',
  },
  gdpr: {
    title: 'GDPR Policy - On The Stove',
    description: 'Learn how On The Stove handles personal data and privacy rights under GDPR.',
  },
  privacy: {
    title: 'Privacy Policy - On The Stove',
    description: 'Read the On The Stove privacy policy and learn how visitor information is collected, used, and protected.',
  },
  terms: {
    title: 'Terms of Service - On The Stove',
    description: 'Read the terms that govern your use of the On The Stove website, recipes, content, comments, and related services.',
  },
}

const legalPages = {
  gdpr: {
    eyebrow: 'Privacy and data rights',
    title: 'GDPR Policy',
    intro: 'This page explains how On The Stove collects, uses, stores, and protects personal information, and how visitors can exercise their data protection rights.',
    updated: 'May 19, 2026',
    lead: 'On The Stove respects your privacy. If you are located in the European Economic Area, the United Kingdom, or another region with similar data protection laws, you may have specific rights over your personal data.',
    sections: [
      ['Information We Collect', [
        'On The Stove may collect personal information when you subscribe to updates, leave a comment, contact us, or otherwise interact with the website.',
        'This may include your name, email address, IP address, browser information, usage data, and any message or content you choose to send to us.',
      ]],
      ['How We Use Your Information', [
        'We use personal data to respond to messages, send recipe updates when requested, improve the website, protect the site from spam or misuse, and understand which content readers find useful.',
        'We do not sell your personal information. When we use third-party tools, we aim to work with services that handle data responsibly and provide appropriate safeguards.',
      ]],
      ['Legal Bases For Processing', [
        'Depending on how you use the site, we may process personal data based on your consent, our legitimate interest in operating and improving the website, the need to respond to your requests, or compliance with legal obligations.',
        'Where consent is required, you can withdraw it at any time.',
      ]],
      ['Cookies And Analytics', [
        'The website may use cookies and similar technologies to remember preferences, measure traffic, improve performance, and support embedded or third-party features.',
        'You can manage cookies through your browser settings. Blocking some cookies may affect how parts of the site work.',
      ]],
      ['Data Sharing', [
        'We may share limited information with trusted service providers who help us run the website, deliver emails, prevent spam, provide analytics, or maintain security.',
        'These providers are expected to process data only as needed to provide their services and to protect that information appropriately.',
      ]],
      ['Data Retention', [
        'We keep personal information only for as long as needed for the purpose it was collected, unless a longer retention period is required or permitted by law.',
        'Messages, comments, and subscription records may be retained so we can manage communication history, comply with legal obligations, and keep the website secure.',
      ]],
      ['International Transfers', [
        'Some tools or service providers may process information outside your country of residence. When that happens, we rely on appropriate safeguards where required by data protection law.',
      ]],
      ['Security', [
        'We use reasonable administrative, technical, and organizational measures to help protect personal information. No website or internet transmission is completely secure, so we cannot guarantee absolute security.',
      ]],
    ],
    listTitle: 'Your GDPR Rights',
    listIntro: 'Subject to applicable law, you may have the following rights:',
    listItems: [
      'The right to access the personal data we hold about you.',
      'The right to ask us to correct inaccurate or incomplete data.',
      'The right to request deletion of your personal data where legally possible.',
      'The right to restrict or object to certain processing activities.',
      'The right to data portability where the data was provided by you.',
      'The right to withdraw consent when processing is based on consent.',
    ],
    ctaTitle: 'Contact Us',
    ctaBody: 'To ask questions about this policy or request access, correction, deletion, or restriction of your personal information, please contact On The Stove using the contact page.',
  },
  privacy: {
    eyebrow: 'How your information is handled',
    title: 'Privacy Policy',
    intro: 'This policy explains what information On The Stove may collect, why it is used, and the choices you have when you visit the site.',
    updated: 'May 19, 2026',
    lead: 'Your privacy matters. This page is intended to give readers a clear, plain-language overview of the data practices connected with On The Stove.',
    sections: [
      ['Who We Are', ['On The Stove is a recipe website created to share approachable home cooking, kitchen tips, and meal ideas. This privacy policy explains what information may be collected when you visit or interact with the website.']],
      ['Information We Collect', [
        'We may collect information you voluntarily provide, such as your name, email address, website URL, comment content, or messages submitted through contact forms.',
        'We may also automatically collect basic technical information, including your IP address, browser type, device information, referring pages, pages visited, and general usage data.',
      ]],
      ['How We Use Information', [
        'Information may be used to operate and improve the website, respond to messages, manage comments, send updates you requested, prevent spam, measure site performance, and understand which recipes and pages are most helpful.',
        'We do not sell your personal information.',
      ]],
      ['Comments', [
        'When visitors leave comments, the site may collect the information shown in the comments form, along with the visitor IP address and browser user agent string to help detect spam.',
        'Comments may be visible publicly once approved. Please avoid sharing private information in a comment that you do not want other visitors to see.',
      ]],
      ['Cookies', [
        'The website may use cookies and similar technologies to remember preferences, support site features, measure traffic, and improve reader experience.',
        'You can disable cookies through your browser settings. Some parts of the website may not work as expected if cookies are disabled.',
      ]],
      ['Email Updates', ['If you subscribe to emails, we use your email address to send the updates you requested. You can unsubscribe at any time by using the unsubscribe link in an email or by contacting us.']],
      ['Analytics', ['We may use analytics tools to understand website traffic, popular content, referring websites, and general visitor behavior. Analytics information is typically aggregated and used to improve the website.']],
      ['Advertising And Affiliate Links', [
        'Some pages may include advertising, sponsored content, or affiliate links. If you click an affiliate link and make a purchase, On The Stove may earn a commission at no extra cost to you.',
        'Advertising partners may use cookies or similar technologies to provide relevant ads and measure ad performance.',
      ]],
      ['Embedded Content From Other Websites', [
        'Articles may include embedded content such as videos, images, recipe cards, or social media posts. Embedded content from other websites behaves as if you visited those websites directly.',
        'Those websites may collect data, use cookies, embed additional third-party tracking, and monitor your interaction with the embedded content.',
      ]],
      ['Third-Party Services', [
        'We may use trusted third-party services for hosting, analytics, email delivery, spam prevention, security, advertising, or other website operations.',
        'These services may process limited information as needed to provide their services and are responsible for their own privacy practices.',
      ]],
      ['How Long We Keep Information', [
        'We keep personal information only as long as needed for the purposes described in this policy, unless a longer period is required or permitted by law.',
        'Comments, contact messages, subscription records, and technical logs may be retained to manage communication, prevent abuse, maintain records, and keep the website secure.',
      ]],
      ['Children\'s Privacy', ['This website is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided personal information, please contact us so we can remove it.']],
      ['Your Privacy Choices', [
        'Depending on where you live, you may have rights to access, correct, delete, restrict, or object to certain uses of your personal information.',
        'You can also unsubscribe from emails, disable cookies in your browser, or contact us with privacy-related requests.',
      ]],
      ['Changes To This Policy', ['We may update this privacy policy from time to time. When changes are made, the updated date on this page will be revised.']],
    ],
    ctaTitle: 'Contact',
    ctaBody: 'For questions about this privacy policy or to make a privacy request, please contact On The Stove through the contact page.',
  },
  disclaimer: {
    eyebrow: 'Please read before using the site',
    title: 'Disclaimer',
    intro: 'This page explains the limitations of the information, recipes, nutrition estimates, affiliate links, and third-party content shared on On The Stove.',
    updated: 'May 19, 2026',
    lead: 'By using this website, you accept this disclaimer and agree that you are responsible for how you use the information provided here.',
    sections: [
      ['General Information', [
        'The information on On The Stove is provided for general informational and educational purposes only. Recipes, tips, techniques, and recommendations are shared in good faith for home cooks and everyday kitchen use.',
        'While we aim to keep information accurate and helpful, we make no guarantees about completeness, reliability, availability, or suitability for your specific situation.',
      ]],
      ['Recipe Results', [
        'Recipe outcomes can vary based on ingredients, brands, equipment, oven temperatures, altitude, substitutions, measuring methods, and personal cooking experience.',
        'Please use your own judgment, follow safe food handling practices, and adjust recipes as needed for your kitchen and preferences.',
      ]],
      ['Nutrition Disclaimer', [
        'Any nutrition information shown on this website is an estimate only. Values may vary depending on ingredient brands, portion sizes, substitutions, and calculation methods.',
        'Nutrition information should not be considered medical, dietary, or professional health advice. If you have specific nutrition needs, please consult a qualified professional.',
      ]],
      ['Allergies And Dietary Needs', [
        'Recipes may contain or come into contact with common allergens such as dairy, eggs, wheat, gluten, soy, peanuts, tree nuts, fish, shellfish, sesame, or other ingredients.',
        'Always read labels, verify ingredients, and make safe substitutions based on your own allergies, sensitivities, and dietary restrictions.',
      ]],
      ['Food Safety', [
        'Readers are responsible for following proper food safety practices, including safe storage, handling, preparation, cooking temperatures, and reheating.',
        'Use a reliable food thermometer when needed and follow current food safety guidance from trusted sources in your location.',
      ]],
      ['Affiliate Disclaimer', [
        'Some pages may contain affiliate links. This means On The Stove may earn a small commission if you click a link and make a purchase, at no additional cost to you.',
        'Affiliate relationships do not change the price you pay and help support the website. We aim to recommend products or services that are relevant to readers.',
      ]],
      ['Advertising And Sponsored Content', [
        'This website may display advertisements, sponsored content, or brand collaborations. Sponsored relationships will be disclosed where required.',
        'Advertisements and third-party promotions are provided by outside parties, and On The Stove is not responsible for claims, products, services, or content offered by advertisers.',
      ]],
      ['External Links', [
        'On The Stove may link to third-party websites for convenience, reference, products, services, or additional resources.',
        'We do not control external websites and are not responsible for their content, privacy practices, policies, accuracy, or availability. Visiting external links is at your own discretion.',
      ]],
      ['Professional Advice', [
        'Content on this website is not a substitute for professional medical, nutritional, legal, financial, or other professional advice.',
        'Always seek advice from an appropriate qualified professional for questions related to your personal circumstances.',
      ]],
      ['Changes To This Disclaimer', ['This disclaimer may be updated from time to time. Any changes will be reflected on this page with an updated date.']],
    ],
    ctaTitle: 'Questions',
    ctaBody: 'If you have questions about this disclaimer or anything published on On The Stove, please reach out through the contact page.',
  },
  terms: {
    eyebrow: 'Website rules and reader agreement',
    title: 'Terms of Service',
    intro: 'These terms explain the rules for using On The Stove, including recipes, articles, comments, links, and related website features.',
    updated: 'May 19, 2026',
    lead: 'Please read these terms carefully before using the website. They work together with the Privacy Policy, GDPR Policy, and Disclaimer.',
    sections: [
      ['Acceptance Of Terms', [
        'By accessing or using On The Stove, you agree to these Terms of Service and any policies referenced on this website. If you do not agree with these terms, please do not use the site.',
        'These terms apply to all visitors, readers, subscribers, and anyone who interacts with the website.',
      ]],
      ['Use Of The Website', [
        'You may use this website for lawful, personal, non-commercial purposes, including reading recipes, saving ideas, sharing links, and contacting us.',
        'You agree not to misuse the website, attempt to disrupt its operation, access restricted systems, submit harmful code, scrape content at scale, or use the site in a way that violates applicable law.',
      ]],
      ['Recipes And Content', [
        'Recipes, photographs, text, graphics, branding, and other materials published on On The Stove are provided for informational and educational purposes.',
        'You may print or save recipes for personal use. You may link to recipe pages, but you may not republish full recipes, photographs, or original written content without permission.',
      ]],
      ['Intellectual Property', [
        'Unless otherwise stated, the content on this website is owned by On The Stove or used with permission. All rights are reserved.',
        'You may not copy, reproduce, distribute, modify, sell, or exploit website content for commercial purposes without prior written permission.',
      ]],
      ['User Comments And Submissions', [
        'If you submit comments, messages, reviews, recipe feedback, or other content, you are responsible for what you submit.',
        'You agree not to submit unlawful, abusive, defamatory, spammy, misleading, infringing, or harmful content. We may edit, moderate, refuse, or remove submissions at our discretion.',
        'By submitting content, you grant On The Stove permission to display, store, reproduce, and use that content in connection with the website and related communications.',
      ]],
      ['Affiliate Links And Advertising', [
        'Some pages may include advertisements, affiliate links, sponsored content, or brand collaborations. On The Stove may earn compensation when you click links, view ads, or make purchases through certain links.',
        'Affiliate or advertising relationships do not create any warranty or guarantee for third-party products or services.',
      ]],
      ['Third-Party Links', [
        'The website may contain links to third-party websites, tools, products, services, or embedded content. These links are provided for convenience and reference.',
        'On The Stove does not control third-party websites and is not responsible for their content, privacy practices, availability, accuracy, or policies.',
      ]],
      ['No Professional Advice', [
        'Content on this website is not medical, nutritional, legal, financial, or other professional advice.',
        'You are responsible for using your own judgment and consulting qualified professionals when needed, especially for dietary restrictions, allergies, health conditions, food safety, or legal questions.',
      ]],
      ['No Warranties', [
        'The website and its content are provided on an "as is" and "as available" basis. We do not guarantee that the website will be uninterrupted, error-free, secure, or always available.',
        'We do not warrant that recipes, tips, nutrition estimates, links, or other information will be complete, accurate, reliable, or suitable for your specific needs.',
      ]],
      ['Limitation Of Liability', [
        'To the fullest extent permitted by law, On The Stove and its owner, contributors, and partners will not be liable for any loss, injury, claim, damages, or expenses arising from your use of the website or reliance on its content.',
        'This includes, without limitation, recipe results, ingredient substitutions, allergic reactions, food safety issues, third-party links, technical problems, or unavailable content.',
      ]],
      ['Indemnification', ['You agree to defend, indemnify, and hold harmless On The Stove from claims, damages, liabilities, costs, or expenses arising from your use of the website, your submitted content, or your violation of these terms.']],
      ['Privacy', ['Your use of this website is also governed by our Privacy Policy and GDPR Policy, which explain how personal information may be collected, used, and protected.']],
      ['Changes To These Terms', [
        'We may update these Terms of Service from time to time. Changes will be posted on this page with an updated date.',
        'Your continued use of the website after changes are posted means you accept the revised terms.',
      ]],
      ['Governing Law', ['These terms are intended to be interpreted according to applicable law. If any part of these terms is found unenforceable, the remaining sections will continue in effect.']],
    ],
    ctaTitle: 'Contact',
    ctaBody: 'If you have questions about these Terms of Service, please contact On The Stove through the contact page.',
    extraCta: { href: '/privacy-policy', label: 'Privacy Policy' },
  },
}

const contactReasons = [
  'Recipe questions or troubleshooting',
  'Reader feedback and suggestions',
  'Brand partnerships and collaborations',
  'Media, press, or content inquiries',
]

const heroStyle = {
  background: 'linear-gradient(160deg, #1E0E05 0%, #5C2810 60%, #E8622A 100%)',
  color: 'white',
  padding: '5rem 2rem',
  textAlign: 'center',
}

const cardStyle = {
  background: 'white',
  border: '1px solid #F0E6DC',
  borderRadius: '20px',
  padding: 'clamp(1.5rem, 4vw, 3rem)',
  boxShadow: '0 20px 60px rgba(61,32,16,0.08)',
}

function Hero({ eyebrow, title, intro, children }) {
  return (
    <section className="page-hero" style={heroStyle}>
      <p style={{
        fontFamily: '"Lato", sans-serif',
        fontSize: '0.78rem',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color: '#F4946A',
        marginBottom: '1rem',
      }}>
        {eyebrow}
      </p>
      <h1 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: '700',
        lineHeight: 1.2,
        marginBottom: intro ? '1rem' : 0,
      }}>
        {children || title}
      </h1>
      {intro && (
        <p style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.78)',
          maxWidth: '670px',
          margin: '0 auto',
          lineHeight: 1.8,
        }}>
          {intro}
        </p>
      )}
    </section>
  )
}

function Paragraph({ children, style }) {
  return (
    <p style={{
      fontFamily: '"Lato", sans-serif',
      fontSize: '1rem',
      color: '#6B5244',
      lineHeight: 1.85,
      marginBottom: '0.9rem',
      ...style,
    }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: '"Playfair Display", serif',
      fontSize: '1.55rem',
      color: '#2C1A0E',
      marginBottom: '1rem',
    }}>
      {children}
    </h2>
  )
}

export function LegalStaticPage({ page }) {
  const content = legalPages[page]

  return (
    <div>
      <Hero eyebrow={content.eyebrow} title={content.title} intro={content.intro} />

      <section className="content-section" style={{ maxWidth: '980px', margin: '4rem auto' }}>
        <div className="policy-card" style={cardStyle}>
          <div style={{ borderBottom: '1px solid #F0E6DC', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <p style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.82rem',
              color: '#A08070',
              marginBottom: '0.75rem',
            }}>
              Last updated: {content.updated}
            </p>
            <Paragraph style={{ marginBottom: 0 }}>{content.lead}</Paragraph>
          </div>

          {content.sections.map(([title, paragraphs]) => (
            <article key={title} style={{ marginBottom: '2.25rem' }}>
              <SectionTitle>{title}</SectionTitle>
              {paragraphs.map((paragraph) => (
                <Paragraph key={paragraph}>{paragraph}</Paragraph>
              ))}
            </article>
          ))}

          {content.listItems && (
            <article style={{ marginBottom: '2.25rem' }}>
              <SectionTitle>{content.listTitle}</SectionTitle>
              <Paragraph>{content.listIntro}</Paragraph>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
                {content.listItems.map((item) => (
                  <li key={item} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    fontFamily: '"Lato", sans-serif',
                    fontSize: '0.98rem',
                    color: '#3D2010',
                    lineHeight: 1.65,
                    background: '#FDF6EE',
                    border: '1px solid #F0E6DC',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                  }}>
                    <span style={{ color: '#E8622A', fontWeight: '700', flexShrink: 0 }}>*</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          )}

          <article style={{
            background: '#FDF6EE',
            border: '1px solid #F0E6DC',
            borderLeft: '4px solid #E8622A',
            borderRadius: '16px',
            padding: '1.5rem',
          }}>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.45rem',
              color: '#2C1A0E',
              marginBottom: '0.75rem',
            }}>
              {content.ctaTitle}
            </h2>
            <Paragraph style={{ marginBottom: '1.25rem' }}>{content.ctaBody}</Paragraph>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <PrimaryButton href="/contact">Contact On The Stove</PrimaryButton>
              {content.extraCta && (
                <SecondaryButton href={content.extraCta.href}>{content.extraCta.label}</SecondaryButton>
              )}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

function PrimaryButton({ href, children }) {
  return (
    <Link href={href} className="full-width-mobile button button-link" style={{
      background: '#E8622A',
      color: 'white',
      fontFamily: '"Lato", sans-serif',
      fontWeight: '700',
      fontSize: '0.95rem',
      padding: '0.8rem 1.7rem',
      borderRadius: '50px',
      display: 'inline-block',
      letterSpacing: '0.4px',
      boxShadow: '0 4px 20px rgba(232,98,42,0.28)',
    }}>
      {children}
    </Link>
  )
}

function SecondaryButton({ href, children }) {
  return (
    <Link href={href} className="full-width-mobile button button-link" style={{
      background: 'white',
      color: '#E8622A',
      border: '1px solid #E8622A',
      fontFamily: '"Lato", sans-serif',
      fontWeight: '700',
      fontSize: '0.95rem',
      padding: '0.8rem 1.7rem',
      borderRadius: '50px',
      display: 'inline-block',
      letterSpacing: '0.4px',
    }}>
      {children}
    </Link>
  )
}

export async function AboutStaticPage() {
  const author = await client.fetch(getAuthor)

  return (
    <div>
      <Hero eyebrow="The Story Behind The Stove">
        <>Join me on my <em style={{ color: '#F4946A' }}>Tasty Journey!</em></>
      </Hero>

      <div className="about-layout content-section" style={{
        maxWidth: '1100px',
        margin: '5rem auto',
        alignItems: 'start',
      }}>
        <div className="sticky-panel">
          {author?.photo ? (
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '4px solid #F0E6DC',
              boxShadow: '0 20px 60px rgba(61,32,16,0.15)',
            }}>
              <Image
                src={urlFor(author.photo).width(500).height(700).url()}
                alt={author?.name || 'Adelaide'}
                width={500}
                height={700}
                style={{ objectFit: 'cover', display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
          ) : (
            <div style={{
              background: '#FDF6EE',
              borderRadius: '24px',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5rem',
              border: '1px solid #F0E6DC',
            }}>
              Chef
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'center' }}>
            {author?.pinterest && (
              <a href={author.pinterest} target="_blank" rel="noopener noreferrer" className="social-link">
                <img src="/pinterest.png" alt="Pinterest" className="social-icon" />
              </a>
            )}
            {author?.instagram && (
              <a href={author.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                <img src="/instagram.png" alt="Instagram" className="social-icon" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '2rem',
            color: '#2C1A0E',
            marginBottom: '1.5rem',
          }}>
            From My Kitchen To Yours...
          </h2>

          <Paragraph style={{ fontSize: '1.05rem' }}>
            {'For me, cooking has always been more than "what\'s for dinner." It\'s comfort, creativity, and care, served on a plate. After years of testing, tweaking, and sharing, this little kitchen hobby grew into a full-time recipe blog for busy home cooks who still want food that feels special.'}
          </Paragraph>
          <Paragraph style={{ fontSize: '1.05rem', fontWeight: '700', color: '#3D2010', marginBottom: '2.5rem' }}>
            Follow along: new recipes, daily meal ideas, and simple tips to make everyday cooking easier.
          </Paragraph>

          <div style={{ borderTop: '2px solid #E8622A', margin: '2rem 0', width: '60px' }} />

          <h3 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.5rem',
            color: '#2C1A0E',
            marginBottom: '1.25rem',
          }}>
            I have been cooking and writing blogs for almost 12 years.
          </h3>

          <Paragraph>{'It started with handwritten notes, messy counters, and family favorites I didn\'t want to lose. Then I began sharing recipes online, one after another, learning what real life needs: dependable meals, clear steps, and ingredients you can actually find.'}</Paragraph>
          <Paragraph>{'Today, I create approachable recipes for women juggling work, family, and everything in between. Think: cozy dinners, smarter shortcuts, and meal prep that doesn\'t feel like a second job. Every recipe is tested, re-tested, and written the way I\'d explain it to a friend in my kitchen.'}</Paragraph>
          <Paragraph style={{ marginBottom: '2.5rem' }}>{"If you're here for simple, satisfying food, welcome. Grab a cup of tea, pick a recipe, and let's make something you'll be proud to serve, even on a busy weeknight."}</Paragraph>

          <div style={{
            background: '#FDF6EE',
            border: '1px solid #F0E6DC',
            borderLeft: '4px solid #E8622A',
            borderRadius: '16px',
            padding: '1.75rem',
            marginBottom: '2.5rem',
          }}>
            <h4 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.2rem',
              color: '#2C1A0E',
              marginBottom: '1rem',
            }}>
              Quick promise from my kitchen to yours
            </h4>
            <Paragraph style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>{"You'll always find:"}</Paragraph>
            {[
              'Clear instructions with no guesswork',
              'Practical swaps and time-savers',
              'Balanced comfort food you will actually crave',
              'Recipes that work the first time',
            ].map((item) => (
              <p key={item} style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.95rem',
                color: '#3D2010',
                lineHeight: 1.7,
                marginBottom: '0.4rem',
              }}>
                * {item}
              </p>
            ))}
          </div>

          <PrimaryButton href="/">Browse My Recipes</PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export function ContactStaticPage() {
  return (
    <div>
      <Hero
        eyebrow="Get in touch"
        title="Contact On The Stove"
        intro="Have a question, collaboration idea, or recipe note? Send a message and Adelaide will get back to you as soon as possible."
      />

      <section className="contact-layout content-section" style={{
        maxWidth: '1100px',
        margin: '4rem auto',
        alignItems: 'start',
      }}>
        <div style={{ ...cardStyle, padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.8rem',
            color: '#2C1A0E',
            marginBottom: '0.75rem',
          }}>
            Send a Message
          </h2>
          <Paragraph style={{ fontSize: '0.98rem', marginBottom: '1.75rem' }}>
            Use the form below for recipe questions, feedback, partnerships, or general notes from your kitchen.
          </Paragraph>
          <ContactForm />
        </div>

        <aside style={{ display: 'grid', gap: '1rem' }}>
          <SidebarCard title="What to Write About" cream>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.7rem' }}>
              {contactReasons.map((reason) => (
                <li key={reason} style={{
                  display: 'flex',
                  gap: '0.65rem',
                  alignItems: 'flex-start',
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '0.95rem',
                  color: '#3D2010',
                  lineHeight: 1.6,
                }}>
                  <span style={{ color: '#E8622A', fontWeight: '700', flexShrink: 0 }}>*</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </SidebarCard>

          <SidebarCard title="Before You Send">
            <Paragraph style={{ fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1rem' }}>
              If your question is about a specific recipe, include the recipe name and what happened so the reply can be more helpful.
            </Paragraph>
            <Link href="/" style={{
              color: '#E8622A',
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.9rem',
              fontWeight: '700',
            }}>
              Browse recipes
            </Link>
          </SidebarCard>

          <div style={{ background: '#1E0E05', color: 'white', borderRadius: '20px', padding: '1.5rem' }}>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.4rem',
              marginBottom: '0.75rem',
            }}>
              Legal Pages
            </h2>
            <div style={{ display: 'grid', gap: '0.65rem', fontFamily: '"Lato", sans-serif', fontSize: '0.9rem' }}>
              <Link href="/privacy-policy" style={{ color: 'rgba(253,246,238,0.75)' }}>Privacy Policy</Link>
              <Link href="/gdpr-policy" style={{ color: 'rgba(253,246,238,0.75)' }}>GDPR Policy</Link>
              <Link href="/disclaimer" style={{ color: 'rgba(253,246,238,0.75)' }}>Disclaimer</Link>
              <Link href="/terms-of-service" style={{ color: 'rgba(253,246,238,0.75)' }}>Terms of Service</Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

function SidebarCard({ title, children, cream = false }) {
  return (
    <div style={{
      background: cream ? '#FDF6EE' : 'white',
      border: '1px solid #F0E6DC',
      borderRadius: '20px',
      padding: '1.5rem',
    }}>
      <h2 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '1.4rem',
        color: '#2C1A0E',
        marginBottom: '0.9rem',
      }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function ContactForm() {
  const inputStyle = {
    border: '1px solid #E8D5C4',
    borderRadius: '10px',
    padding: '0.85rem 1rem',
    font: 'inherit',
    color: '#2C1A0E',
    background: '#FDF6EE',
    outlineColor: '#E8622A',
  }
  const labelStyle = {
    display: 'grid',
    gap: '0.45rem',
    fontFamily: '"Lato", sans-serif',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#3D2010',
  }

  return (
    <form action="mailto:hello@onthestove.com" method="post" encType="text/plain">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem',
      }}>
        <label style={labelStyle}>
          Name
          <input name="name" type="text" required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Email
          <input name="email" type="email" required style={inputStyle} />
        </label>
      </div>

      <label style={{ ...labelStyle, marginBottom: '1rem' }}>
        Subject
        <input name="subject" type="text" required style={inputStyle} />
      </label>

      <label style={{ ...labelStyle, marginBottom: '1.25rem' }}>
        Message
        <textarea
          name="message"
          rows="8"
          required
          style={{ ...inputStyle, resize: 'vertical', minHeight: '180px' }}
        />
      </label>

      <button type="submit" className="full-width-mobile" style={{
        background: '#E8622A',
        color: 'white',
        border: 'none',
        fontFamily: '"Lato", sans-serif',
        fontWeight: '700',
        fontSize: '0.95rem',
        padding: '0.9rem 2rem',
        borderRadius: '50px',
        cursor: 'pointer',
        letterSpacing: '0.4px',
        boxShadow: '0 4px 20px rgba(232,98,42,0.28)',
      }}>
        Send Message
      </button>
    </form>
  )
}
