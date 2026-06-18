export const exportMarkets = {
  usa: {
    name: 'United States',
    title: 'Organic Cotton Bag Manufacturer for USA',
    description:
      'Indian manufacturer and exporter of organic cotton bags, canvas bags, and tote bags supplying businesses across the United States.',
    keywords: [
      'organic cotton bag manufacturer usa',
      'cotton tote bag supplier usa',
      'canvas bag exporter usa',
      'private label cotton bags usa',
    ],
  },

  uk: {
    name: 'United Kingdom',
    title: 'Sustainable Tote Bag Supplier for UK',
    description:
      'Supplier of organic cotton tote bags and sustainable textile products for UK retailers, brands, and wholesalers.',
    keywords: ['organic cotton bags uk', 'canvas bag supplier uk', 'private label tote bags uk'],
  },

  germany: {
    name: 'Germany',
    title: 'Organic Cotton Bag Supplier Germany',
    description:
      'Manufacturer and exporter of sustainable cotton bags and textile products for German businesses.',
    keywords: [
      'cotton bag supplier germany',
      'canvas tote bags germany',
      'sustainable packaging germany',
    ],
  },

  france: {
    name: 'France',
    title: 'Sustainable Textile Exporter for France',
    description: 'Exporting eco-friendly cotton bags and textile products from India to France.',
    keywords: [
      'organic cotton bags france',
      'cotton tote bag supplier france',
      'eco textile exporter france',
    ],
  },

  canada: {
    name: 'Canada',
    title: 'Organic Cotton Bag Manufacturer for Canada',
    description: 'Supplying Canadian businesses with sustainable cotton bags and textile products.',
    keywords: [
      'cotton bag supplier canada',
      'organic tote bags canada',
      'canvas bag exporter canada',
    ],
  },

  australia: {
    name: 'Australia',
    title: 'Eco-Friendly Cotton Bag Supplier Australia',
    description:
      'Manufacturer and exporter of organic cotton bags and sustainable textile products for Australian brands and retailers.',
    keywords: [
      'organic cotton bags australia',
      'canvas bag supplier australia',
      'private label tote bags australia',
    ],
  },
} as const

export type ExportMarketSlug = keyof typeof exportMarkets
