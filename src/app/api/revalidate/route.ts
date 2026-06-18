import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Revalidation not configured' }, { status: 500 })
  }

  let body: { tag?: string; secret?: string } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (body.secret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tag = body.tag
  if (!tag) {
    return NextResponse.json({ error: 'Missing tag' }, { status: 400 })
  }

  revalidateTag(tag, { expire: 0 })

  return NextResponse.json({ revalidated: true, tag, now: Date.now() })
}
