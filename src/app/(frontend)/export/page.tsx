import type { Metadata } from 'next'
import Link from 'next/link'
import { exportMarkets } from '@/lib/export-markets'

export const metadata: Metadata = {
  title: 'Global Export Markets | Zova Organics',
  description:
    'Zova Organics exports organic cotton bags, tote bags, and sustainable textile products to businesses worldwide.',
}

export default function ExportPage() {
  return (
    <div className="container-zova py-20">
      <h1>Global Export Markets</h1>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {Object.entries(exportMarkets).map(([slug, market]) => (
          <Link key={slug} href={`/export/${slug}`} className="rounded-xl border p-6">
            <h2>{market.name}</h2>
            <p>{market.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
