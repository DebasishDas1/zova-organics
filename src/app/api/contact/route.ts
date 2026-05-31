import { NextResponse } from 'next/server'

import { contactSchema } from '@/lib/validations/contact'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  try {
    // basic rate-limit by IP (in-memory); replace with Redis in production
    const forwarded = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ success: false, message: 'Rate limit exceeded' }, { status: 429 })
    }

    const body = await req.json()
    const validatedData = contactSchema.parse(body)

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
