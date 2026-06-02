'use client'

import { motion } from 'motion/react'
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

const titleVariants = {
  sm: 'max-w-3xl text-4xl md:text-5xl',
  md: 'max-w-4xl text-5xl md:text-6xl',
  lg: 'max-w-5xl text-6xl md:text-7xl',
  xl: 'max-w-6xl text-7xl md:text-8xl',
}

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
  return (
    <section
      className={cn('container-zova flex min-h-[60vh] items-center py-24 md:py-32', className)}
    >
      <div className={cn('w-full', align === 'center' && 'mx-auto text-center')}>
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            className={cn(
              'mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </motion.p>
        )}

        {actions && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
            className={cn('mt-10 flex flex-wrap gap-4', align === 'center' && 'justify-center')}
          >
            {actions}
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
            }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
