import type { Metadata } from 'next'
import { Hero } from '@/components/sections/home/Hero'
import { Manifesto } from '@/components/sections/home/Manifesto'
import { Collections } from '@/components/sections/home/Collections'
import { WhyZova } from '@/components/sections/home/WhyZova'
import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { FeatureList } from '@/components/sections/sheared/FeatureList'
import { Search, Package, Globe2, Factory, ShieldCheck, ChevronDownIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { JsonLd } from '@/components/sections/sheared/JsonLd'
import { MarketFlags } from '@/components/sections/home/MarketFlags'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const GlobalReach = dynamic(() =>
  import('@/components/sections/home/GlobalReach').then((mod) => mod.GlobalReach),
)
const CTA = dynamic(() => import('@/components/sections/home/CTA').then((mod) => mod.CTA))

export const metadata: Metadata = {
  title: 'Zova Organics | Wholesale Jute Bags & Eco Packaging Exporter from India',
  description:
    'Zova Organics is a Kolkata-based exporter of wholesale jute bags, juco bags, eco packaging, and private label sustainable products, serving brands and distributors in 30+ countries.',
  keywords: [
    'organic textile exporter',
    'organic cotton bags manufacturer',
    'private label textile manufacturing',
    'sustainable textile supplier india',
    'organic fabric exporter',
    'eco friendly bags manufacturer',
    'ethical sourcing india',
    'custom textile manufacturing',
  ],
  openGraph: {
    title: 'Zova Organics | Wholesale Jute Bags & Eco Packaging Exporter from India',
    description:
      'Zova Organics is a Kolkata-based exporter of wholesale jute bags, juco bags, eco packaging, and private label sustainable products, serving brands and distributors in 30+ countries.',
    url: 'https://zovaorganics.com/',
    siteName: 'Zova Organics',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zovaorganics.com/',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zova Organics',
    description: 'Premium sustainable textiles and private label manufacturing from India.',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zovaorganics.com/#business',
  name: 'Zova Organics',
  url: 'https://zovaorganics.com',
  telephone: '+91-9073896612',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'Your State',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
}

const items = [
  {
    title: 'Jute & Fabric Sourcing from Kolkata',
    description:
      'We source jute, cotton, and natural fibers from certified mills across West Bengal and India',
    icon: Search,
  },
  {
    title: 'Quality Production at Indian Factories',
    description:
      'Strict Quality-controlled production with factory audits and sample approval process.',
    icon: Package,
  },
  {
    title: 'Global Export Logistics from India',
    description: 'Reliable delivery and documentation for global markets',
    icon: Globe2,
  },
]

const steps = [
  {
    title: 'Discovery',
    description:
      'Share your product requirements — type, quantity, customization, timeline. Sampling',
    icon: Search,
  },
  {
    title: 'Sampling',
    description:
      'We send physical samples of jute bags, fabrics, or lifestyle products for approval.',
    icon: Package,
  },
  {
    title: 'Production',
    description: 'Bulk production begins at our vetted Indian manufacturing partners.',
    icon: Factory,
  },
  {
    title: 'Quality Check',
    description: 'Pre-shipment inspection and QC report before goods leave India.',
    icon: ShieldCheck,
  },
  {
    title: 'Global Delivery',
    description: 'FOB/CIF shipping from Indian Port to your country.',
    icon: Globe2,
  },
]

const home_faq = [
  {
    question: 'What types of jute bags does Zova Organics export?',
    answer:
      'We export a wide range of jute bags including jute tote bags, jute shopping bags, jute gift bags, jute wine bags, jute drawstring bags, jute beach bags, and custom printed promotional jute bags. All products are available in bulk with full customization options including size, color, print, and packaging. If you have a specific design in mind, we can work from your brief.',
  },
  {
    question: ' What is the minimum order quantity (MOQ) for jute bags?',
    answer:
      "Our standard MOQ is [500] pieces per design for plain jute bags. For custom printed or private label jute bags, the MOQ is [300–500] pieces depending on the product type. We understand that new buyers sometimes need smaller trial orders — reach out and we'll do our best to accommodate you.",
  },
  {
    question: 'Do you offer custom logo printing and private label services?',
    answer:
      'Yes. Private label and custom branding is one of our core services. We offer screen printing, jute patch branding, heat transfer printing, and embroidery on all jute bag products. You can customize the bag size, fabric weight, handles, inner lining, and packaging. We work directly from your logo files and provide a pre-production sample for approval before bulk production begins.',
  },
  {
    question: 'Which countries do you export jute bags to?',
    answer:
      "We currently export to 30+ countries across North America, Europe, the Middle East, and Asia Pacific. Our key markets include the USA, UK, Germany, France, Australia, UAE, Canada, Netherlands, Japan, and New Zealand. If your country isn't listed, contact us — we ship globally via sea freight and air freight from Kolkata, India.",
  },
  {
    question: 'How long does production and shipping take?',
    answer:
      'Standard production time is 3–4 weeks after order confirmation and sample approval. Shipping from Kolkata by sea freight takes 3–5 weeks to Europe and the USA, and 1–2 weeks to the Middle East. Air freight is also available for urgent orders. We provide full shipment tracking and pre-shipment quality inspection reports with every order.',
  },
  {
    question: 'Can I get samples before placing a bulk order?',
    answer:
      'Yes. We strongly encourage sampling before bulk orders. Sample sets are available upon request. Sampling charges apply but are fully adjustable against your bulk order value. Standard sample lead time is 7–10 working days. WhatsApp us or fill out our inquiry form to request samples.',
  },
]

export default async function HomePage() {
  return (
    <>
      <JsonLd schema={localBusinessSchema} />
      <Hero />
      <Manifesto />
      <Collections />
      <div className="section-padding bg-black">
        <div className="container-zova">
          <h2 className="text-white mb-10">
            Everything You Need to Source & Export Jute Bags from India
          </h2>
          <FeatureList items={items} />
        </div>
      </div>

      <WhyZova />
      <GlobalReach />
      <MarketFlags />
      <div className="container-zova section-padding">
        <SectionHero
          eyebrow="Process"
          title="How to Order Jute Bags from Zova Organics — Simple. Fast. Reliabl"
          description="From your first inquiry about wholesale jute bags to delivery at your warehouse : here's how we work with global buyers and brands."
        />

        <FeatureList items={steps} />
      </div>
      <CTA />

      <section className="my-10">
        <SectionHero
          title="Common Questions from Global Buyers"
          description="Everything you need to know before reaching out."
        />

        <div className="container-zova space-y-4 py-10">
          {home_faq.map((faq, index) => (
            <Collapsible key={index} className="rounded-2xl border bg-card p-4">
              <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-lg font-medium text-start">
                <span>{faq.question}</span>
                <ChevronDownIcon className="h-4 w-4 shrink-0" />
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-4 pt-4">
                <p>{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </section>
    </>
  )
}
