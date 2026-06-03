import { LucideIcon } from 'lucide-react'

type FeatureItem = {
  title: string
  description?: string
  icon: LucideIcon
}

type FeatureListProps = {
  items: FeatureItem[]
}

export function FeatureList({ items }: FeatureListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <div key={item.title} className="rounded-3xl bg-white p-8">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/80">
              <Icon className="h-6 w-6 text-primary" />
            </div>

            <h3>{item.title}</h3>
            <p className="mt-4">{item.description}</p>
          </div>
        )
      })}
    </div>
  )
}
