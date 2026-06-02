import { Story } from '@/components/sections/about/Story'
import { Beliefs } from '@/components/sections/about/Beliefs'
import { WhyIndia } from '@/components/sections/about/WhyIndia'
import { HowWeWork } from '@/components/sections/about/HowWeWork'
import { Values } from '@/components/sections/about/Values'
import { Vision } from '@/components/sections/about/Vision'
import { AboutCTA } from '@/components/sections/about/AboutCTA'
import { SectionHero } from '@/components/sections/sheared/SectionHero'

export const metadata = {
  title: 'About Us - Zova Organics',
  description:
    'Learn how Zova Organics combines sustainable sourcing, craftsmanship, and global export expertise.',
}

export default function AboutPage() {
  return (
    <>
      <SectionHero
        eyebrow="About Zova Organics"
        title="Built on trust. Driven by craftsmanship."
        description="We connect global brands with responsibly sourced products from India, combining heritage craftsmanship with modern quality standards."
      />
      <Story />
      <Beliefs />
      <WhyIndia />
      <HowWeWork />
      <Values />
      <Vision />
      <AboutCTA />
    </>
  )
}
