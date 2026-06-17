import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <section className="container-zova flex min-h-[60vh] items-center py-24 md:py-32">
        <div className="w-full">
          <Skeleton className="h-3 w-24 mb-4 uppercase tracking-[0.3em]" />
          <Skeleton className="h-16 md:h-20 max-w-2xl rounded-xl mb-8" />
          <Skeleton className="h-6 max-w-xl rounded-lg" />
          <Skeleton className="h-6 max-w-md rounded-lg mt-2" />
        </div>
      </section>

      <section className="container-zova pb-32">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="aspect-16/10 w-full rounded-2xl" />
              <Skeleton className="h-4 w-24 mt-2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
