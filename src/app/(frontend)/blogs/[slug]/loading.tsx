import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <article className="pb-32">
      <section className="container-zova pt-20">
        <div className="mx-auto max-w-4xl">
          <Skeleton className="h-4 w-48 mb-8" />
          <Skeleton className="h-4 w-24 mb-6" />
          <Skeleton className="h-16 md:h-20 w-full mb-4" />
          <Skeleton className="h-16 md:h-20 w-4/5 mb-8" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6 mt-2" />
          <Skeleton className="h-6 w-4/6 mt-2 mb-10" />
          <div className="flex gap-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </section>

      <section className="container-zova mt-16">
        <Skeleton className="aspect-16/8 w-full rounded-[40px]" />
      </section>

      <section className="container-zova mt-24">
        <div className="grid gap-24 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="mx-auto w-full max-w-3xl space-y-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full mt-8" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-64 w-full rounded-[24px] mt-8" />
          </div>
          <div className="space-y-8">
            <Skeleton className="h-64 w-full rounded-[28px]" />
          </div>
        </div>
      </section>
    </article>
  )
}
