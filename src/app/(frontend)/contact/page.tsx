import { ContactInfo } from '@/components/sections/contact/ContactInfo'
import { ContactForm } from '@/components/sections/contact/ContactForm'
import { WhyContact } from '@/components/sections/contact/WhyContact'
import { FAQ } from '@/components/sections/contact/FAQ'
import { ContactCTA } from '@/components/sections/contact/ContactCTA'
import { SectionHero } from '@/components/sections/sheared/SectionHero'

export const metadata = {
  title: 'Contact - Zova Organics',
  description:
    'Contact Zova Organics to discuss sustainable sourcing, private label manufacturing, and global exports.',
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

export default function ContactPage() {
  return (
    <>
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
      <ContactCTA />
    </>
  )
}
