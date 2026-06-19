import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'
import type { LucideIcon } from 'lucide-react'

type SectionProps = ComponentPropsWithoutRef<'section'>

type SectionHeaderProps = {
  icon?: LucideIcon
  label?: string
  title?: string
  description?: string
  className?: string
  iconClassName?: string
  labelClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section className={cn('section-padding', className)} {...props}>
      {children}
    </section>
  )
}

export function SectionHeader({
  icon: Icon,
  label,
  title,
  description,
  className,
  iconClassName,
  labelClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-10 flex gap-4', className)}>
      {Icon && (
        <div
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10',
            iconClassName,
          )}
        >
          <Icon className="size-5 text-primary" />
        </div>
      )}

      <div>
        {label && (
          <p
            className={cn(
              'text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground',
              labelClassName,
            )}
          >
            {label}
          </p>
        )}

        {title && (
          <h2
            className={cn(
              'mt-2 max-w-4xl text-balance text-3xl font-semibold tracking-tight md:text-4xl',
              titleClassName,
            )}
          >
            {title}
          </h2>
        )}

        {description && (
          <p className={cn('mt-3 max-w-3xl text-muted-foreground', descriptionClassName)}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
