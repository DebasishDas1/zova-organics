import { Skeleton } from '@/components/ui/skeleton'

// Mirrors the category pill rail
function CategoryRailSkeleton() {
  return (
    <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-28 shrink-0 rounded-full" />
      ))}
    </div>
  )
}

// Mirrors a single ProductCard
function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Image */}
      <Skeleton className="aspect-4/3 w-full rounded-2xl" />
      {/* Badges row */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      {/* Title */}
      <Skeleton className="h-6 w-3/4 rounded-md" />
      {/* Subtitle / description */}
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-2/3 rounded-md" />
      {/* MOQ + CTA row */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>
    </div>
  )
}

export function ProductsGridSkeleton() {
  return (
    <section className="pb-32">
      <div className="container-zova">
        <CategoryRailSkeleton />

        {/* Results header */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-8 w-32 rounded-md" />
          </div>
        </div>

        {/* Cards grid — show 6 ghost cards */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
