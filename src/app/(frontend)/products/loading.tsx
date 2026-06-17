import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <section className="container-zova flex min-h-[60vh] items-center py-24 md:py-32">
        <div className="w-full">
          <Skeleton className="h-3 w-24 mb-4" />
          <Skeleton className="h-16 md:h-20 max-w-2xl rounded-xl mb-8" />
          <Skeleton className="h-6 max-w-xl rounded-lg" />
          <Skeleton className="h-6 max-w-md rounded-lg mt-2" />
        </div>
      </section>

      <section className="pb-32">
        <div className="container-zova">
          {/* Categories Rail Skeleton */}
          <div className="flex gap-4 overflow-x-auto pb-4 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-10 w-32 shrink-0 rounded-full" />
            ))}
          </div>

          {/* Results Header Skeleton */}
          <div className="mb-12">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-32 rounded-lg" />
          </div>

          {/* Product Grid Skeleton */}
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-4/5 w-full rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
