import { NextResponse } from 'next/server'

import { contactSchema } from '@/lib/validations/contact'
import { checkRateLimit } from '@/lib/rate-limit'
import { getPayloadClient } from '@/lib/payload/client'
import type { Lead } from '@/payload-types'

const categoryMap: Record<string, Lead['category'] extends (infer U)[] | null | undefined ? U : never> = {
  'organic-fabrics': 'organic-fabrics',
  bags: 'bags',
  'private-label': 'custom-oem',
  'custom-product': 'custom-oem',
  other: 'other',
}

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ success: false, message: 'Rate limit exceeded' }, { status: 429 })
    }

    const body = await req.json()
    const data = contactSchema.parse(body)

    const payload = await getPayloadClient()
    const mappedCategory = categoryMap[data.category] ?? 'other'

    await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        message: data.message,
        inquiryType: 'general',
        category: [mappedCategory],
        source: 'website',
        status: 'new',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid request data.'

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 400,
      },
    )
  }
}
