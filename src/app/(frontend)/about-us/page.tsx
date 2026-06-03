import { Story } from '@/components/sections/about/Story'
import { Beliefs } from '@/components/sections/about/Beliefs'
import { WhyIndia } from '@/components/sections/about/WhyIndia'
import { Values } from '@/components/sections/about/Values'
import { Vision } from '@/components/sections/about/Vision'
import { AboutCTA } from '@/components/sections/about/AboutCTA'
import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { FeatureList } from '@/components/sections/sheared/FeatureList'
import { Compass, Package, Factory, CheckCircle, Globe2 } from 'lucide-react'

export const metadata = {
  title: 'About Us - Zova Organics',
  description:
    'Learn how Zova Organics combines sustainable sourcing, craftsmanship, and global export expertise.',
}

const steps = [
  { title: 'Discover', icon: Compass },
  { title: 'Source', icon: Package },
  { title: 'Produce', icon: Factory },
  { title: 'Inspect', icon: CheckCircle },
  { title: 'Deliver', icon: Globe2 },
]

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
      <SectionHero
        eyebrow="How We Work"
        title="A streamlined process designed around reliability."
        description="A streamlined process designed around reliability."
      />
      <div className="container-zova">
        <FeatureList items={steps} />
      </div>
      <Values />
      <Vision />
      <AboutCTA />
    </>
  )
}
