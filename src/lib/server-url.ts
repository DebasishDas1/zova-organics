/**
 * Runtime server URL for Payload auth (CSRF/CORS/cookies).
 * Prefer SERVER_URL — it is read at runtime and is not baked into the client bundle.
 */
export function getServerURL(): string {
  return (
    process.env.SERVER_URL ??
    process.env.NEXT_PUBLIC_SERVER_URL ??
    'http://localhost:3000'
  )
}

/** Full origins trusted by Payload CSRF/CORS checks. */
export function getTrustedOrigins(serverURL = getServerURL()): string[] {
  const origins = new Set<string>([serverURL])

  try {
    const url = new URL(serverURL)
    const altHost = url.hostname.startsWith('www.')
      ? url.hostname.slice(4)
      : `www.${url.hostname}`
    origins.add(`${url.protocol}//${altHost}`)
  } catch {
    // ignore malformed URL
  }

  if (process.env.NODE_ENV !== 'production') {
    origins.add('http://localhost:3000')
  }

  return [...origins]
}

/** Hostnames allowed to invoke Next.js Server Actions behind a reverse proxy. */
export function getAllowedActionOrigins(serverURL = getServerURL()): string[] {
  const origins = new Set<string>()

  try {
    const { hostname } = new URL(serverURL)
    origins.add(hostname)
    if (hostname.startsWith('www.')) {
      origins.add(hostname.slice(4))
    } else {
      origins.add(`www.${hostname}`)
    }
  } catch {
    // ignore malformed URL
  }

  if (process.env.NODE_ENV !== 'production') {
    origins.add('localhost')
  }

  return [...origins]
}
