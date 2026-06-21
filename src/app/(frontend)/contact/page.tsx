import { ContactInfo } from '@/components/sections/contact/ContactInfo'
import { ContactForm } from '@/components/sections/contact/ContactForm'
import { WhyContact } from '@/components/sections/contact/WhyContact'
import { FAQ } from '@/components/sections/contact/FAQ'
import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { PageCTA } from '@/components/sections/sheared/PageCTA'
import { JsonLd } from '@/components/sections/sheared/JsonLd'

export const metadata = {
  title: 'Contact - Zova Organics',
  description:
    'Contact Zova Organics to discuss sustainable sourcing, private label manufacturing, and global exports.',
  alternates: { canonical: 'https://zovaorganics.com/contact' },
  robots: { index: true, follow: true, 'max-snippet': -1 },
  openGraph: {
    title: 'Contact - Zova Organics',
    description:
      'Contact Zova Organics to discuss sustainable sourcing, private label manufacturing, and global exports.',
    url: 'https://zovaorganics.com/contact',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'Do you offer private label manufacturing?',
    answer:
      'Yes. We work with brands looking to develop products under their own label, including custom packaging and branding.',
  },
  {
    question: 'Can you support international shipping?',
    answer: 'Yes. We coordinate export documentation and logistics for international buyers.',
  },
  {
    question: 'What are your minimum order quantities?',
    answer: 'MOQ varies depending on product category, materials, and customization requirements.',
  },
  {
    question: 'Do you provide product samples?',
    answer: 'Yes. Samples can be arranged before production begins.',
  },
]

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Zova Organics',
  url: 'https://zovaorganics.com/contact',
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://zovaorganics.com/#organization',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['English', 'Hindi'],
      email: 'info@zovaorganics.com',
      contactOption: 'TollFree',
    },
  },
}

export default async function ContactPage() {
  return (
    <>
      <JsonLd schema={contactSchema} />
      <SectionHero
        eyebrow="Contact"
        title="Let's build something meaningful together."
        description="Whether you're sourcing sustainable textiles, launching a private-label collection, or looking for a reliable manufacturing partner, we'd love to hear about your project."
      />
      <ContactInfo />
      <ContactForm />
      <WhyContact />
      <FAQ
        eyebrow="FAQ"
        title="Frequently asked questions."
        description="Here are answers to some of our most commonly asked questions. If you have other inquiries, please don't hesitate to reach out directly."
        questionList={faqs}
      />
      <PageCTA
        title="Every great partnership starts with a conversation."
        description="Tell us about your sourcing goals and we’ll explore how Zova can support your business."
        buttonText="Start a Conversation"
        buttonHref="#contact-form"
      />
    </>
  )
}
