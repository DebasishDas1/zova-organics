import { getServerURL } from './server-url'

/** Trigger on-demand ISR revalidation from Payload hooks. */
export async function triggerRevalidation(tag: string) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    console.warn('[revalidate] REVALIDATE_SECRET not set — skipping tag:', tag)
    return
  }

  const base = getServerURL()

  try {
    const res = await fetch(`${base}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag, secret }),
    })

    if (!res.ok) {
      console.error('[revalidate] failed:', tag, res.status, await res.text())
    }
  } catch (error) {
    console.error('[revalidate] failed:', tag, error)
  }
}
