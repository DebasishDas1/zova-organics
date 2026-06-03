import { ShieldCheck } from 'lucide-react'

export function QualityCommitment() {
  return (
    <section className="section-padding">
      <div className="container-zova text-center">
        <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/80">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>

        <h2 className="mx-auto max-w-5xl text-balance">
          Quality is not a checkpoint. It is part of every decision we make.
        </h2>

        <p className="mx-auto mt-10 max-w-3xl text-xl text-muted-foreground">
          From supplier selection to final shipment, every stage is designed to ensure reliability,
          consistency, and long-term trust.
        </p>
      </div>
    </section>
  )
}
