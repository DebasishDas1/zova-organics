'use client'

import { motion } from 'motion/react'

export function AboutHero() {
  return (
    <section className="container-zova flex min-h-[75vh] items-center">
      <div className="max-w-5xl">
        <motion.span
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Zova
        </motion.span>

        <motion.h1
          className="mt-6 text-balance"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built on trust.
          <br />
          Driven by craftsmanship.
        </motion.h1>

        <motion.p
          className="mt-8 max-w-2xl text-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          We connect global brands with responsibly sourced products from India, combining heritage
          craftsmanship with modern quality standards.
        </motion.p>
      </div>
    </section>
  )
}
