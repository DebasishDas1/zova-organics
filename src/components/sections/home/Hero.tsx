'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ShieldCheck, Globe2, Leaf, Handshake } from 'lucide-react'

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
              Zova Organics is a premier exporter based in Kolkata, India, helping global brands
              source high-quality jute bags, juco bags, organic fabrics, and eco-friendly packaging
              through audited manufacturing partners, strict quality control, and reliable export
              logistics.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 md:mb-14 flex gap-4"
            >
              <Button
                size="lg"
                className="h-14 flex-1 rounded-full px-4 sm:flex-none sm:px-8"
                asChild
              >
                <Link href="/products">Explore our Collections</Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-14 flex-1 rounded-full border-zova-green px-4 font-bold text-zova-green sm:flex-none sm:px-8"
                asChild
              >
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </motion.div>

            {/* Trust Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 hidden md:grid"
            >
              {features.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center sm:items-start sm:text-left"
                >
                  <Icon className="size-8 text-primary" />
                  <span className="text-xs font-medium pt-4 uppercase tracking-[0.12em] text-muted-foreground">
                    {label}
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 md:hidden"
          >
            {features.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <Icon className="size-8 text-primary" />
                <span className="text-xs font-medium pt-4 uppercase tracking-[0.12em] text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
