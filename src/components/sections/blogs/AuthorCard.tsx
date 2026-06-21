import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Globe, Leaf, Sparkles } from 'lucide-react'

interface AuthorCardProps {
  title?: string
  description?: string
}

export function AuthorCard({
  title = 'Zova Organics Editorial Team',
  description = 'Experts in organic textiles, ethical manufacturing, sustainable sourcing and international exports.',
}: AuthorCardProps) {
  return (
    <section className="mt-32">
      <Card
        className="
          overflow-hidden
          rounded-[36px]
          border
          bg-linear-to-br
          from-background
          to-muted/30
          shadow-sm
        "
      >
        <CardContent className="p-10 lg:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <Avatar className="h-20 w-20 rounded-3xl">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                ZO
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <Badge variant="outline" className="mb-5 rounded-full">
                Editorial Team
              </Badge>

              <h3
                className="
                  text-3xl
                  font-semibold
                  tracking-tight
                "
              >
                {title}
              </h3>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-lg
                  leading-8
                  text-muted-foreground
                "
              >
                {description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
                  <Leaf className="h-4 w-4" />
                  Organic Products
                </div>

                <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
                  <Globe className="h-4 w-4" />
                  Global Exports
                </div>

                <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
                  <Sparkles className="h-4 w-4" />
                  Industry Insights
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
