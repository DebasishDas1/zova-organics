import type { Metadata } from 'next'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { ChevronDownIcon } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Zova Organics',
  description:
    'Find answers to common questions about Zova Organics, our products, certifications, and sustainable manufacturing practices.',
  openGraph: {
    title: 'Frequently Asked Questions | Zova Organics',
    description:
      'Find answers to common questions about Zova Organics, our products, certifications, and sustainable manufacturing practices.',
    url: 'https://zovaorganics.com/faq',
    siteName: 'Zova Organics',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Zova Organics',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

const category_faqList = [
  {
    question: 'What is Zova Organics?',
    answer:
      "Zova Organics is a premier exporter of premium jute bags, Jute products, Cotton Bags, organic fabrics, and sustainable lifestyle products based in Kolkata, West Bengal, India. We connect global brands, retailers, and distributors with high-quality, ethically sourced jute and textile products. Unlike a manufacturer, as a merchant exporter we work with a curated network of India's best jute mills and production partners , giving you access to a broader product range, better flexibility, and faster turnaround.",
  },
  {
    question: 'Where is Zova Organics located?',
    answer:
      "We are based in Kolkata, West Bengal, India - the heart of the global jute industry. Kolkata is the world's largest hub for jute production and processing, which gives us unmatched access to premium raw jute, skilled manufacturing partners, and competitive pricing.",
  },
  {
    question: 'What is the difference between a merchant exporter and a manufacturer?',
    answer:
      'A manufacturer produces goods in their own factory. A merchant exporter like Zova Organics sources from multiple specialized manufacturers and mills, quality checks the products, and exports them to global buyers. This means you get access to a wider range of products, better quality control across multiple production units, and the flexibility to mix products from different specialists — all through a single trusted export partner.',
  },
  {
    question: 'Is Zova Organics a registered export company?',
    answer:
      'Yes. Zova Organics is a registered merchant exporter with all required Indian export documentation including IEC (Import Export Code), GST registration, and JPDEPC, etc. We provide all standard export documentation including commercial invoice, packing list, bill of lading, certificate of origin, and phytosanitary certificates where required.',
  },
]

const product_faq = [
  {
    question: 'What jute bag products does Zova Organics export?',
    answer:
      "We export a comprehensive range of jute bags and jute products:\nJute Tote Bags (plain, printed, laminated)\nJute Shopping Bags (with and without gusset)\nJute Gift Bags (with ribbon handles, tissue paper)\nJute Wine Bags (single bottle, double bottle)\nJute Drawstring Bags (small to large)\nJute Beach Bags (large format, open top)\nJute Promotional Bags (custom logo, bulk branding)\nJute Lunch Bags (insulated lining options)\nJute Grocery Bags (reinforced handles)\nJute Cosmetic/Toiletry Bags\nJute Backpacks\nJute Pouches and Coin Bags\nCotton Bags\nJUCO Bags\nJute Sacs\nIf you need a product type not listed above, contact us with your specifications and we'll source it for you.",
  },
  {
    question: 'Do you sell only jute bags or other products too?',
    answer:
      'In addition to jute bags, we export:\nOrganic cotton bags and tote bags\nJuco bags (jute-cotton blend)\nOrganic and natural fabrics (jute fabric, organic cotton fabric, linen)\nSustainable lifestyle products (home décor, accessories)\nEco-friendly retail packaging and gifting products\nWe are a one‑stop source for brands looking to build a sustainable product range.',
  },
  {
    question: 'What fabric weights and jute grades do you offer?',
    answer:
      'We offer jute bags in fabric weights ranging from 200 GSM (lightweight) to 500 GSM (heavy-duty) depending on the application. Standard export grade is 350 GSM for shopping and tote bags. We use Hessian (plain weave) and sacking jute, and can source specific grades based on buyer requirements. All jute is natural, biodegradable, and free from harmful chemicals.',
  },
  {
    question: 'Can I get jute bags in custom colors?',
    answer:
      'Natural jute comes in its characteristic golden‑brown color. We offer:\nNatural undyed jute (most popular for eco brands)\nBleached jute (off‑white / cream)\nDyed jute in custom colors (subject to MOQ for dyeing)\nColored cotton webbing or rope handles on natural jute bags\nColored inner lining in cotton or non‑woven fabric\nCustom dyeing has a higher MOQ and lead time. Contact us with your Pantone color reference for a feasibility check.',
  },
  {
    question: 'Do your jute bags have any certifications?',
    answer:
      'Yes Zova Organics is working with all Highly Efficient and Globally Certified Manufacturers\nGOTS (Global Organic Textile Standard) sourcing available on request\nOeko‑Tex Standard 100 compliant materials available\nProducts meet EU eco‑labeling standards for import\nAll products are 100% natural, biodegradable, and free from AZO dyes\nWe provide test reports and material safety documentation for buyers importing into the EU, USA, and Australia where compliance standards apply. Contact us for certification requirements specific to your market.',
  },
  {
    question: 'Are your jute bags food‑safe or suitable for grocery retail?',
    answer:
      'Yes. Our natural jute grocery bags are suitable for dry food products and general grocery retail use. For food‑contact applications, we can provide laminated jute bags with a food‑safe inner lining. Please specify your intended use when requesting a quote so we can recommend the appropriate product specification.',
  },
  {
    question: 'Can you create a completely new jute bag design from scratch?',
    answer:
      'Yes. If you have a design idea, reference image, or technical specification, our product development team can create samples from scratch. We handle design consultation, prototype creation, fabric selection, handle options, print placement, and packaging — all before bulk production begins. Development sampling lead time is 2–3 weeks.',
  },
]

const ordering_faq = [
  {
    question: 'What is the minimum order quantity (MOQ)?',
    answer:
      'Our standard MOQs are:\nPlain jute tote bags (standard sizes): 3000–5000 pieces\nCustom printed jute bags: 3000–5000 pieces\nCustom sized / new design jute bags: 5000–10000 pieces\nOrganic cotton bags: 3000–5000 pieces\nMOQs may vary based on design complexity and product type. First‑time buyers can discuss trial order quantities with our team.',
  },
  {
    question: 'How do I place an order with Zova Organics?',
    answer:
      'Our ordering process is simple:\nInquiry — Contact us via WhatsApp, email, or our inquiry form with your product requirements\nQuotation — We send a detailed quote within 24–48 hours\nSampling — We send physical samples for your approval\nOrder Confirmation — You confirm the order with a purchase order and advance payment\nProduction — Bulk production begins at our partner mills\nQuality Check — Pre‑shipment inspection and QC report\nShipment — Goods dispatched from Kolkata with full documentation\nDelivery — Tracking provided until goods arrive at your destination.',
  },
  {
    question: 'What payment terms do you offer?',
    answer:
      'Standard payment terms are 30–50% advance payment against order confirmation, with the balance due before shipment. For long‑term clients with established relationships, we can discuss extended payment terms. We accept bank wire transfer (TT), LC (Letter of Credit), and other standard trade payment methods.',
  },
  {
    question: 'Do you work with new buyers or only established companies?',
    answer:
      'We welcome new buyers. Many of our long‑term clients started with a single sample request. We understand that trust is built over time and we make the process as easy as possible for first‑time importers — including detailed documentation, clear communication at every step, and flexible sampling.',
  },
  {
    question: 'Can I mix different products in one container?',
    answer:
      'Yes. We regularly handle mixed container shipments with multiple product types, for example, a mix of jute tote bags, jute gift bags, and organic cotton bags in one container. This is one of the key advantages of working with a merchant exporter - you get product variety from multiple specialists, consolidated into a single shipment.',
  },
]

const customization_faq = [
  {
    question: 'What customization options are available for jute bags?',
    answer:
      'We offer end‑to‑end customization:\nSize — Custom width, height, gusset dimensions\nFabric weight — 200 GSM to 500 GSM\nColor — Natural, bleached, or dyed jute\nHandles — Jute rope, cotton webbing, leather‑look, ribbon\nPrinting — Screen print, digital print, heat transfer, embroidery, jute patch\nLining — Unlined, cotton lining, laminated, insulated\nClosure — Open top, zip, button, drawstring, magnetic snap\nPackaging — Individual poly bags, custom boxes, hang tags, tissue paper\nBranding — Your logo, brand name, tagline, website URL, care instructions',
  },
  {
    question: 'What file formats do you need for logo/artwork printing?',
    answer:
      'For best print quality, please provide artwork in:\nVector formats (preferred): .AI, .EPS, .PDF (vector)\nHigh‑resolution raster: .PNG or .TIFF at minimum 300 DPI at print size\nPlease also specify Pantone (PMS) color codes for brand‑accurate color matching. We provide a digital artwork proof for approval before printing begins.',
  },
  {
    question: 'Do you offer white label / private label packaging?',
    answer:
      "Yes. We offer complete white label and private label services. Your products can be delivered with your brand's hang tags, stickers, custom inner tissue paper, branded polybag, custom box, and care label — with zero Zova Organics branding visible. Many of our clients sell these products under their own brand to retail chains and e‑commerce platforms.",
  },
  {
    question: 'Can you match a sample or reference product I send you?',
    answer:
      'Yes. If you have an existing product you want us to replicate or improve upon, send us a physical sample or detailed photos and specifications. We will match fabric, construction, dimensions, print placement, and finish as closely as possible and send you a counter‑sample for approval.',
  },
  {
    question: 'Do you provide product development consultation?',
    answer:
      "Yes. If you are building a new eco‑product line and need guidance on materials, design direction, market‑appropriate specifications, or pricing tiers, our team can consult with you before sampling begins. We've helped brands develop jute bag collections from concept to container.",
  },
]

const shipping_faq = [
  {
    question: 'What are your shipping terms (Incoterms)?',
    answer:
      'We offer the following Incoterms:\nFOB Kolkata — Most common. You arrange freight from Kolkata Port.\nCIF (Cost, Insurance, Freight) — We arrange and pay for freight + insurance to destination port.\nEx‑Works — You collect from our warehouse in Kolkata.\nDDP (Delivered Duty Paid) — Available for select destinations on request.\nWe work with reliable freight forwarders for both sea freight (FCL and LCL) and air freight.',
  },
  {
    question: 'How long does shipping take to my country?',
    answer:
      'Approximate sea freight transit times from Kolkata:\nUK / Germany / Netherlands: 20–28 days\nUSA (East Coast): 25–35 days\nUSA (West Coast): 30–40 days\nAustralia: 18–25 days\nUAE / Middle East: 10–14 days\nJapan / Singapore: 12–18 days\nCanada: 28–38 days\nAir freight is 5–10 days to most destinations. Transit times are estimates and may vary by shipping line and season.',
  },
  {
    question: 'Do you handle all export documentation?',
    answer:
      'Yes. We provide complete export documentation including:\nCommercial Invoice\nPacking List\nBill of Lading (Sea) / Airway Bill (Air)\nCertificate of Origin (COO)\nPhytosanitary Certificate (where required for natural fiber products)\nGSP (Generalized System of Preferences) Form A for duty benefits\nTest reports and material certificates on request\nWe ensure all documentation complies with the import requirements of your country.',
  },
  {
    question:
      'Do you offer FCL (Full Container Load) and LCL (Less than Container Load) shipments?',
    answer:
      'Yes. We handle both:\nLCL — Ideal for smaller orders or new buyers testing a product range. Your goods share container space with other exporters.\nFCL — For larger orders. We fill a 20‑foot or 40‑foot container entirely with your goods. More cost‑effective per unit.\nWe can advise on the most cost‑efficient shipping option based on your order volume.',
  },
  {
    question: 'Can you ship samples by courier (DHL / FedEx)?',
    answer:
      'Yes. Sample sets are shipped via DHL, FedEx, or UPS with full tracking. Courier charges are billed to the buyer or can be shipped on your courier account. Typical sample courier time is 3–7 business days to most countries.',
  },
]

const quality_faq = [
  {
    question: 'What quality control processes do you follow?',
    answer:
      "Our quality control process includes:\nRaw material inspection — Jute fabric checked for weight, weave consistency, and defects before cutting\nIn‑line production checks — Quality monitored during stitching and assembly\nPre‑shipment inspection — Final inspection of finished goods against your approved sample\nQC report — Written quality report with photos provided before shipment\nThird‑party inspection (SGS, Bureau Veritas, Intertek) can be arranged on buyer's request.",
  },
  {
    question: 'Are your jute bags genuinely eco‑friendly and biodegradable?',
    answer:
      "Yes. Jute is one of the most sustainable natural fibers in the world. It is:\n100% natural, plant‑based, and biodegradable\nGrown without pesticides or irrigation in India's climate\nCarbon‑negative — absorbs more CO₂ than it produces\nDurable and reusable — a jute bag can replace hundreds of plastic bags over its lifetime\nWe are committed to sourcing jute that is processed without harmful chemicals, and we can provide AZO‑free and formaldehyde‑free certifications for our materials on request.",
  },
  {
    question: 'Do you support fair trade or ethical production practices?',
    answer:
      'All our manufacturing partners are audited for basic social compliance standards including fair wages, safe working conditions, and no child labor. We prioritize long‑term relationships with partners who share our values. We can provide factory audit reports for buyers who require ethical sourcing documentation for their own compliance or CSR requirements.',
  },
]

const faqSections = [
  {
    title: 'About Zova Organics',
    items: category_faqList,
  },
  {
    title: 'Products',
    items: product_faq,
  },
  {
    title: 'Ordering, Samples & MOQ',
    items: ordering_faq,
  },
  {
    title: 'Customization & Private Label',
    items: customization_faq,
  },
  {
    title: 'Shipping & Logistics',
    items: shipping_faq,
  },
  {
    title: 'Quality & Sustainability',
    items: quality_faq,
  },
]

export default function FAQPage() {
  return (
    <div className="container-zova py-20">
      <SectionHero
        title="Frequently Asked Questions | Zova Organics"
        description="Have questions about sourcing jute bags from India? We've answered everything below. If you don't find what you're looking for, WhatsApp us directly."
      />
      <Image
        src="/page/shered/factory.jpeg"
        alt="FAQ"
        width={1920}
        height={1080}
        className="w-full h-auto"
      />

      {faqSections.map((section) => (
        <section key={section.title}>
          <SectionHero title={section.title} />

          <div className="container-zova space-y-4 py-4">
            {section.items.map((faq, index) => (
              <Collapsible
                key={`${section.title}-${index}`}
                className="rounded-2xl border bg-card p-4"
              >
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
      ))}
    </div>
  )
}
