import { Hero } from '@/components/sections/home/Hero'
import { Manifesto } from '@/components/sections/home/Manifesto'
import { Collections } from '@/components/sections/home/Collections'
import { Capabilities } from '@/components/sections/home/Capabilities'
import { WhyZova } from '@/components/sections/home/WhyZova'
import { GlobalReach } from '@/components/sections/home/GlobalReach'
import { Process } from '@/components/sections/home/Process'
import { CTA } from '@/components/sections/home/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Collections />
      <Capabilities />
      <WhyZova />
      <GlobalReach />
      <Process />
      <CTA />
    </>
  )
}
