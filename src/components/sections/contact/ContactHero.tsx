'use client'

import { motion } from 'motion/react'

export function ContactHero() {
  return (
    <section className="container-zova flex min-h-[70vh] items-center pt-32">
      <div className="max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          Contact
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-balance"
        >
          Let's build something
          <br />
          meaningful together.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-2xl text-xl text-muted-foreground"
        >
          Whether you're sourcing sustainable textiles, launching a private-label collection, or
          looking for a reliable manufacturing partner, we'd love to hear about your project.
        </motion.p>
      </div>
    </section>
  )
}
