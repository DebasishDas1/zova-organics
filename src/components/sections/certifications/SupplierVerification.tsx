import { ShieldCheck, Search, FileCheck, Globe } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Supplier Screening',
    description:
      'Manufacturing partners are evaluated for capability, quality systems, and export readiness.',
  },
  {
    icon: FileCheck,
    title: 'Documentation Review',
    description: 'Certificates, audit reports, and compliance records are reviewed and verified.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Validation',
    description: 'Products are checked against agreed specifications and international standards.',
  },
  {
    icon: Globe,
    title: 'Global Compliance',
    description:
      'We help ensure products align with destination market requirements and expectations.',
  },
]

export function SupplierVerification() {
  return (
    <section className="section-padding">
      <div className="container-zova">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Our Process</p>

          <h2 className="mt-4">Certifications are only part of the story.</h2>

          <p className="mt-6 text-muted-foreground">
            Beyond certificates, we evaluate manufacturing partners through documentation reviews,
            supplier assessments, quality controls, and ongoing relationship management.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.title} className="rounded-3xl bg-white p-8">
              <step.icon className="mb-6 h-6 w-6" />

              <h3 className="mb-3 text-lg font-medium">{step.title}</h3>

              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
