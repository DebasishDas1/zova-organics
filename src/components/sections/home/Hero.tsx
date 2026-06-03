'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, ShieldCheck, Globe2, Leaf, Handshake } from 'lucide-react'

import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Leaf,
    label: 'Sustainable Materials',
  },
  {
    icon: ShieldCheck,
    label: 'Certified Quality',
  },
  {
    icon: Globe2,
    label: 'Global Export',
  },
  {
    icon: Handshake,
    label: 'Ethical Partnerships',
  },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-zova min-h-screen">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 max-w-4xl text-6xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
            >
              Crafted in <br /> India. <br /> Trusted Worldwide.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 max-w-xl text-xl leading-relaxed text-muted-foreground"
            >
              Premium organic textiles, bags, fabrics, and sustainable lifestyle products sourced
              from India for global brands, retailers, and distributors.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <Button size="lg" className="h-14 w-auto rounded-full px-8" asChild>
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="h-14 rounded-full px-8" asChild>
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </motion.div>

            {/* Trust Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
            >
              {features.map((feature) => (
                <div key={feature.label} className="flex flex-col items-start">
                  <feature.icon className="mb-4 h-6 w-6 text-primary" />

                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {feature.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[3rem]">
              <Image
                src="/hero-product.jpg"
                alt="Zova Organics products"
                width={1400}
                height={1400}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
