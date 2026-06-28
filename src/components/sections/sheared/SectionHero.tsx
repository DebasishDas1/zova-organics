import { cn } from '@/lib/utils'

type SectionHeroProps = Readonly<{
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
  actions?: React.ReactNode

  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg' | 'xl'

  className?: string
}>

export function SectionHero({
  eyebrow,
  title,
  description,
  children,
  actions,
  align = 'left',
  size = 'lg',
  className,
}: SectionHeroProps) {
  const titleSizes = {
    sm: 'text-4xl sm:text-5xl md:text-6xl',
    md: 'text-5xl sm:text-6xl md:text-7xl',
    lg: 'text-5xl sm:text-6xl md:text-7xl xl:text-8xl',
    xl: 'text-6xl sm:text-7xl md:text-8xl xl:text-[6rem]',
  }

  return (
    <section
      className={cn('container-zova', 'flex items-center', 'py-8', 'min-h-[20vh]', className)}
    >
      <div className={cn('w-full', 'max-w-5xl', align === 'center' && 'mx-auto text-center')}>
        {eyebrow && (
          <p className="mb-4 sm:mb-6 text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground">
            {eyebrow}
          </p>
        )}

        <h2
          className={cn(
            titleSizes[size],
            'text-balance',
            'font-semibold',
            'tracking-tight',
            'leading-[0.95]',
            'text-foreground',
          )}
        >
          {title}
        </h2>

        {description && (
          <p
            className={cn(
              'mt-6 md:mt-8',
              'max-w-xl md:max-w-2xl',
              'text-base sm:text-lg md:text-xl',
              'leading-relaxed',
              'text-muted-foreground',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        )}

        {actions && (
          <div
            className={cn(
              'mt-8 md:mt-10',
              'flex flex-wrap gap-3 md:gap-4',
              align === 'center' && 'justify-center',
            )}
          >
            {actions}
          </div>
        )}

        {children && <div className="mt-12 md:mt-16 lg:mt-20">{children}</div>}
      </div>
    </section>
  )
}
