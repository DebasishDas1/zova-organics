type SizedMedia = {
  url?: string | null
  sizes?: Record<string, { url?: string | null } | undefined> | null
}

/** Prefer a Payload-generated size; fall back to the original upload URL. */
export function getImageUrl(
  media: SizedMedia | null | undefined,
  size: 'thumbnail' | 'card' | 'og' | 'zoom' = 'card',
): string | undefined {
  if (!media) return undefined
  return media.sizes?.[size]?.url ?? media.url ?? undefined
}
