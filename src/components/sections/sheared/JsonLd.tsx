import { getNonce } from '@/lib/nonce'

export async function JsonLd({ schema }: { schema: object }) {
  const nonce = await getNonce()
  return (
    <script
      nonce={nonce}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning // ← nonce differs between server/client, that's fine
    />
  )
}
