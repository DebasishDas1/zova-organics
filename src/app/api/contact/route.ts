import { NextResponse } from 'next/server'

import { contactSchema } from '@/lib/validations/contact'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = contactSchema.parse(body)

    console.log('Contact form submission:', validatedData)

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
