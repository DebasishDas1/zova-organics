import { NextResponse } from 'next/server'

import { contactSchema } from '@/lib/validations/contact'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const validatedData = contactSchema.parse(body)

    console.log(validatedData)

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 400,
      },
    )
  }
}
