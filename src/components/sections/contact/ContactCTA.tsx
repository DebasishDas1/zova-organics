import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ContactCTA() {
  return (
    <section className="bg-primary py-32 text-primary-foreground">
      <div className="container-zova text-center">
        <h2 className="mx-auto max-w-4xl text-balance">
          Every great partnership starts with a conversation.
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-primary-foreground/70">
          Tell us about your sourcing goals and we'll explore how Zova can support your business.
        </p>

        <Button asChild size="lg" variant="secondary" className="mt-10 rounded-full px-8">
          <Link href="#contact-form">
            Start a Conversation
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
