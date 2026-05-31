import { ContactHero } from '@/components/sections/contact/ContactHero'
import { ContactInfo } from '@/components/sections/contact/ContactInfo'
import { ContactForm } from '@/components/sections/contact/ContactForm'
import { WhyContact } from '@/components/sections/contact/WhyContact'
import { FAQ } from '@/components/sections/contact/FAQ'
import { ContactCTA } from '@/components/sections/contact/ContactCTA'

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <WhyContact />
      <FAQ />
      <ContactCTA />
    </>
  )
}
