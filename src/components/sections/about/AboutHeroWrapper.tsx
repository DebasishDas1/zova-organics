'use client'

import dynamic from 'next/dynamic'

const AboutHeroClient = dynamic(() => import('./AboutHeroClient'), {
  ssr: false,
  loading: () => (
    <div aria-hidden className="container-zova py-24">
      Loading...
    </div>
  ),
})

export default function AboutHeroWrapper() {
  return <AboutHeroClient />
}
