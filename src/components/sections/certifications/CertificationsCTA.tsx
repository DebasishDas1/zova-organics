import { ArrowRight, ShieldCheck } from 'lucide-react'

export function CertificationsCTA() {
  return (
    <section className="bg-primary py-32 text-primary-foreground">
      <div className="container-zova text-center">
        <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-primary-foreground">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <h2 className="mx-auto max-w-4xl">Need certification details for your project?</h2>

        <p className="mx-auto mt-8 max-w-2xl text-primary-foreground/70">
          We're happy to discuss compliance requirements and provide supporting documentation where
          applicable.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="/contact"
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5"
          >
            Contact us
            <ArrowRight className="ml-3 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
