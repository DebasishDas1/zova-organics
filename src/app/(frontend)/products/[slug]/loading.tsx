import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="pb-32">
      {/* Breadcrumb Skeleton */}
      <div className="container-zova py-8">
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Product Hero Skeleton */}
      <section className="container-zova">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Gallery Skeleton */}
          <div className="grid gap-4">
            <Skeleton className="aspect-square w-full rounded-[40px]" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-square rounded-2xl" />)}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="space-y-6 lg:mt-10">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-32 rounded-full mt-8" />
            <div className="space-y-4 pt-8 border-t mt-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
