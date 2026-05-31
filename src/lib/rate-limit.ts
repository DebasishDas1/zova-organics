type Entry = {
  tokens: number
  last: number
}

const BUCKETS = new Map<string, Entry>()
const MAX_TOKENS = 5
const REFILL_INTERVAL_MS = 60_000 // refill window

export function checkRateLimit(key: string) {
  const now = Date.now()
  const entry = BUCKETS.get(key) || { tokens: MAX_TOKENS, last: now }

  // refill tokens based on elapsed time
  const elapsed = now - entry.last
  if (elapsed > REFILL_INTERVAL_MS) {
    entry.tokens = MAX_TOKENS
    entry.last = now
  }

  if (entry.tokens <= 0) {
    BUCKETS.set(key, entry)
    return false
  }

  entry.tokens -= 1
  entry.last = now
  BUCKETS.set(key, entry)
  return true
}

// NOTE: This in-memory limiter is suitable only for single-instance/dev. Use Redis/Upstash for production.
