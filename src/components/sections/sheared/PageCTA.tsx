import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

type PageCTAProps = {
  title: string
  description: string
  buttonText: string
  buttonHref: string
}

export function PageCTA({ title, description, buttonText, buttonHref }: PageCTAProps) {
  return (
    <section className="bg-primary py-32 text-primary-foreground">
      <div className="container-zova text-center">
        <h2 className="mx-auto max-w-4xl text-balance">{title}</h2>

        <p className="mx-auto mt-8 max-w-2xl text-primary-foreground/70">{description}</p>

        <Button className="mt-10 flex justify-center mx-auto">
          <Link
            href={buttonHref}
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5"
          >
            {buttonText}
            <ArrowRight className="ml-3 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
