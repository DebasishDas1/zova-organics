import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type SectionProps = ComponentPropsWithoutRef<'section'>

type SectionHeaderProps = {
  label?: string
  title?: string
  description?: string
  className?: string
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
  label,
  title,
  description,
  className,
  labelClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-10', className)}>
      {label ? (
        <span
          className={cn('text-xs uppercase tracking-[0.3em] text-muted-foreground', labelClassName)}
        >
          {label}
        </span>
      ) : null}

      {title ? (
        <h2 className={cn('mt-4 max-w-4xl text-balance', titleClassName)}>{title}</h2>
      ) : null}

      {description ? (
        <p className={cn('mt-6 max-w-3xl text-xl text-muted-foreground', descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
