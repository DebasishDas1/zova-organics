'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

export function Manifesto() {
  return (
    <section className="relative isolate overflow-hidden mt-6 md:mt-0">
      {/* Background Image */}
      <Image
        src="/page/home/Sourcing_img.png"
        alt="Zova Organics sourcing"
        width={1800}
        height={1200}
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 container-zova flex min-h-[70vh] items-center py-20 md:min-h-[80vh] lg:min-h-screen">
        <div className="max-w-5xl text-white">
          <motion.p
            className="mb-6 text-xs uppercase tracking-[0.3em] text-white/70"
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
            Sourcing should be transparent, sustainable, and beautifully executed
          </motion.h2>

          <motion.div
            className="mt-10 max-w-3xl space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="block text-sm uppercase tracking-wider text-white/60">
              Zova Organics
            </span>

            <p className="text-lg leading-relaxed md:text-xl">
              We believe exceptional products begin long before they reach a shelf. They begin with
              responsible sourcing, skilled craftsmanship, and partnerships built on trust.
            </p>

            <p className="text-base leading-8 text-white/80 md:text-lg">
              Zova Organics connects global brands with premium jute bags, organic fabrics, and
              eco-lifestyle products rooted in Kolkata&apos;s jute manufacturing heritage. We work
              with India&apos;s finest mills to deliver export-quality products with modern
              standards of quality, sustainability, and reliability.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
