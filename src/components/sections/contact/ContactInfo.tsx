'use client'

import { motion } from 'motion/react'
import { Mail, MapPin, Phone } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    title: 'General Inquiries',
    value: 'hello@zovaorganics.com',
    description: 'Questions about products, sourcing, or partnerships.',
  },
  {
    icon: Phone,
    title: 'Export & Wholesale',
    value: '+91 XXXXX XXXXX',
    description: 'Discuss MOQ, customization, logistics, and pricing.',
  },
  {
    icon: MapPin,
    title: 'Based in India',
    value: 'Global Export Operations',
    description: 'Connecting international buyers with trusted manufacturers.',
  },
]

export function ContactInfo() {
  return (
    <section className="pb-32">
      <div className="container-zova">
        <div className="mb-16 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Contact Information
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-medium tracking-tight">
            Multiple ways to connect.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              className="group rounded-3xl border p-8 md:p-10 bg-white"
            >
              <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-secondary">
                <item.icon className="size-5" />
              </div>

              <h3 className="text-xl font-medium">{item.title}</h3>

              <p className="mt-3 text-lg font-medium">{item.value}</p>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
