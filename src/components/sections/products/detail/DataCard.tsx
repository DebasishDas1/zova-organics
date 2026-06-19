import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

export function DataCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value?: string | number | null
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-4 text-primary" />
        </div>

        <div>
          <p className="text-xs text-muted-foreground">{label}</p>

          <p className="font-medium">{value || '-'}</p>
        </div>
      </CardContent>
    </Card>
  )
}
