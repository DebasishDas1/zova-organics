import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="py-32 bg-primary text-primary-foreground">
      <div className="container-zova text-center">
        <h2 className="max-w-4xl mx-auto">Let's build something global together.</h2>

        <p className="mx-auto mt-8 max-w-2xl text-primary-foreground/70">
          Partner with Zova Organics for sustainable sourcing, reliable manufacturing, and worldwide
          delivery.
        </p>

        <Button asChild size="lg" variant="secondary" className="mt-10 rounded-full px-8">
          <Link href="/contact">
            Become a Partner
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
