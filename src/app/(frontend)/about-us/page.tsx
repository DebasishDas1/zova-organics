import { AboutHero } from '@/components/sections/about/AboutHero'
import { Story } from '@/components/sections/about/Story'
import { Beliefs } from '@/components/sections/about/Beliefs'
import { WhyIndia } from '@/components/sections/about/WhyIndia'
import { HowWeWork } from '@/components/sections/about/HowWeWork'
import { Values } from '@/components/sections/about/Values'
import { Vision } from '@/components/sections/about/Vision'
import { AboutCTA } from '@/components/sections/about/AboutCTA'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
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
