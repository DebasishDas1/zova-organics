import { LucideIcon } from 'lucide-react'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type DataCardProps = {
  icon: LucideIcon
  label: string
  value?: string | number | null
}

export function DataCard({ icon: Icon, label, value }: DataCardProps) {
  return (
    <Card className="group h-full rounded-[28px] border border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      <CardHeader className="flex h-full flex-col items-center p-5 text-center sm:p-7">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border/60 bg-primary/5 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/10">
          <Icon className="size-6 text-primary" />
        </div>

        <CardTitle className="mt-6 text-sm font-medium text-muted-foreground sm:text-base">
          {label}
        </CardTitle>

        <CardDescription className="mt-4 flex-1 text-balance text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-3xl lg:text-4xl">
          {value ?? '—'}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
