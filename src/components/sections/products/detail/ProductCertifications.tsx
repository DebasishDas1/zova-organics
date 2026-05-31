import type { Certification, Media } from '@/payload-types'
import { Download } from 'lucide-react'

type Props = { certs: Certification[] }

export function ProductCertifications({ certs }: Props) {
  if (!certs.length) return null

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Certifications</h2>
      <ul className="space-y-3">
        {certs.map((cert) => {
          const file = typeof cert.certificateFile === 'object'
            ? (cert.certificateFile as Media)
            : null

          return (
            <li key={cert.id} className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
              <div>
                <p className="text-sm font-medium">{cert.name}</p>
                {cert.issuingBody && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{cert.issuingBody}</p>
                )}
                {cert.validUntil && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Valid until {new Date(cert.validUntil).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </p>
                )}
              </div>
              {file?.url && (
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label={`Download ${cert.name}`}
                >
                  <Download className="h-3.5 w-3.5" />
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
