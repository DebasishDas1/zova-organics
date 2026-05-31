'use client'

import { motion } from 'motion/react'

export function Manifesto() {
  return (
    <section className="section-padding">
      <div className="container-zova">
        <div className="max-w-6xl">
          <motion.p
            className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Philosophy
          </motion.p>

          <motion.h2
            className="max-w-5xl text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Sourcing should be transparent, sustainable, and beautifully executed.
          </motion.h2>

          <motion.div
            className="mt-16 grid gap-12 lg:grid-cols-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="lg:col-span-4">
              <span className="text-sm text-muted-foreground">Zova Organics</span>
            </div>

            <div className="lg:col-span-8">
              <p className="max-w-3xl text-xl leading-relaxed text-foreground">
                We believe exceptional products begin long before they reach a shelf. They begin
                with responsible sourcing, skilled craftsmanship, and partnerships built on trust.
              </p>

              <p className="mt-8 max-w-3xl text-xl leading-relaxed text-foreground">
                Zova Organics connects global brands with carefully crafted textile and lifestyle
                products rooted in India’s manufacturing heritage and guided by modern standards of
                quality, sustainability, and reliability.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
