'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

const collections = [
  {
    title: 'Organic Fabrics',
    description: 'Premium natural fabrics crafted for fashion, retail, and private-label brands.',
  },
  {
    title: 'Sustainable Bags',
    description: 'Thoughtfully produced bags designed for conscious businesses worldwide.',
  },
  {
    title: 'Lifestyle Products',
    description: 'Curated sustainable products expanding beyond textiles.',
  },
]

export function Collections() {
  return (
    <section className="section-padding">
      <div className="container-zova">
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Collections
          </span>

          <h2 className="mt-4 max-w-4xl">Crafted for global brands and retailers.</h2>
        </div>

        <div className="space-y-6">
          {collections.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-3xl border p-8 lg:p-12"
            >
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <h3 className="text-3xl">{item.title}</h3>
                </div>

                <div className="lg:col-span-5">
                  <p>{item.description}</p>
                </div>

                <div className="lg:col-span-2 flex lg:justify-end">
                  <ArrowRight className="transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
