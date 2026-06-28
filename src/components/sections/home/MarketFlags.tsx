import { cn } from '@/lib/utils'

const markets = [
  { flag: '🇺🇸', name: 'USA' },
  { flag: '🇬🇧', name: 'UK' },
  { flag: '🇩🇪', name: 'Germany' },
  { flag: '🇫🇷', name: 'France' },
  { flag: '🇦🇺', name: 'Australia' },
  { flag: '🇦🇪', name: 'UAE' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇳🇱', name: 'Netherlands' },
  { flag: '🇯🇵', name: 'Japan' },
]

export function MarketFlags() {
  return (
    <section className="pt-14 container-zova">
      <h2
        className={cn(
          'text-balance',
          'font-semibold',
          'tracking-tight',
          'leading-[0.95]',
          'text-foreground',
          'pb-8',
        )}
      >
        Markets we serve
      </h2>
      <div className="flex flex-wrap gap-6">
        {markets.map((market) => (
          <div
            key={market.name}
            className="flex flex-col items-center bg-white rounded-md p-4 w-40"
          >
            <span className="text-6xl">{market.flag}</span>
            <span className="mt-2 text-xl font-medium text-black">{market.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
