'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-zova min-h-screen pb-16 flex items-center">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Sustainable • Ethical • Export Ready
              </span>
            </motion.div>

            <motion.h1
              className="mt-8 max-w-4xl text-balance"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              Crafted in India.
              <br />
              Trusted Worldwide.
            </motion.h1>

            <motion.p
              className="mt-8 max-w-xl text-lg"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              Premium textile and lifestyle products sourced from India for global brands,
              retailers, and distributors.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
            >
              <Button size="lg" className="rounded-full px-8">
                Explore Collections
                <ArrowRight className="ml-2 size-4" />
              </Button>

              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <Link href="/contact">Become a Partner</Link>
              </Button>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            <div className="aspect-4/5 overflow-hidden rounded-[3rem] bg-secondary">
              <img
                src="/hero-product.jpg"
                alt="Premium sustainable products"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
