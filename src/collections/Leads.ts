import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'country', 'inquiryType', 'status', 'createdAt'],
    group: 'CRM',
  },

  fields: [
    // ─── Contact info ─────────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'company',
      type: 'text',
      required: true,
    },

    {
      name: 'email',
      type: 'email',
      required: true,
    },

    {
      name: 'phone',
      type: 'text',
    },

    {
      name: 'country',
      type: 'text',
      admin: {
        description: 'Buyer country — important for export compliance & market tracking',
      },
    },

    {
      name: 'website',
      type: 'text',
    },

    // ─── Inquiry details ──────────────────────────────────────────────
    {
      name: 'inquiryType',
      type: 'select',
      required: true,
      defaultValue: 'rfq',
      options: [
        { label: 'Request for quote (RFQ)', value: 'rfq' },
        { label: 'Sample request', value: 'sample' },
        { label: 'Catalogue download', value: 'catalogue' },
        { label: 'Private label / OEM', value: 'private-label' },
        { label: 'Partnership', value: 'partnership' },
        { label: 'General inquiry', value: 'general' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'category',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Organic fabrics', value: 'organic-fabrics' },
        { label: 'Bags', value: 'bags' },
        { label: 'Pouches', value: 'pouches' },
        { label: 'Home textiles', value: 'home-textiles' },
        { label: 'Yoga & wellness', value: 'yoga-wellness' },
        { label: 'Custom / OEM', value: 'custom-oem' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Product categories the buyer is interested in',
      },
    },

    {
      name: 'interestedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        description: 'Link specific products they enquired about',
      },
    },

    {
      name: 'estimatedOrderQty',
      type: 'text',
      label: 'Estimated order quantity',
      admin: {
        description: 'e.g. 500 units, 200 metres — free text so buyers can be flexible',
      },
    },

    {
      name: 'targetDeliveryDate',
      type: 'date',
      admin: {
        description: 'When does the buyer need the goods?',
      },
    },

    {
      name: 'message',
      type: 'textarea',
      required: true,
    },

    // ─── Source tracking ──────────────────────────────────────────────
    {
      name: 'source',
      type: 'select',
      defaultValue: 'website',
      options: [
        { label: 'Website contact form', value: 'website' },
        { label: 'IndiaMART', value: 'indiamart' },
        { label: 'Alibaba', value: 'alibaba' },
        { label: 'Trade show', value: 'trade-show' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Referral', value: 'referral' },
        { label: 'Email campaign', value: 'email-campaign' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Where did this lead come from?',
      },
    },

    {
      name: 'utmSource',
      type: 'text',
      label: 'UTM source',
      admin: {
        position: 'sidebar',
        description: 'Auto-filled from URL params if using tracking links',
      },
    },

    // ─── CRM pipeline ─────────────────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Sample sent', value: 'sample-sent' },
        { label: 'Negotiating', value: 'negotiating' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'priority',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Team member handling this lead',
      },
    },

    {
      name: 'followUpDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Schedule next follow-up',
      },
    },

    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes — not visible to the buyer',
      },
    },
  ],
}
