import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <section className="min-h-[85vh] flex items-center pt-24 pb-12 relative overflow-hidden">
        <div className="container-zova w-full relative z-10">
          <div className="max-w-5xl space-y-6">
            <Skeleton className="h-16 md:h-24 lg:h-[100px] w-full rounded-2xl" />
            <Skeleton className="h-16 md:h-24 lg:h-[100px] w-4/5 rounded-2xl" />
            <Skeleton className="h-6 md:h-8 w-2/3 mt-8" />
            <Skeleton className="h-6 md:h-8 w-1/2 mt-2" />
            <div className="flex gap-4 mt-12 pt-8">
              <Skeleton className="h-14 w-40 rounded-full" />
              <Skeleton className="h-14 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
