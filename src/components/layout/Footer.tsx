'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/zovaorganicsindia/',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61590585130123',
  },
  {
    name: 'Linkedin',
    href: 'https://www.linkedin.com/company/zova-organics',
  },
]

export function Footer() {
  const { t } = useI18n()

  const companyLinks = [
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.blogs'), href: '/blogs' },
    { name: t('nav.certifications'), href: '/certifications' },
    { name: t('nav.aboutUs'), href: '/about-us' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  return (
    <footer className="bg-background">
      <div className="container-zova">
        {/* Top CTA */}
        <div className="py-20 text-center">
          <span className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            {t('footer.topLabel')}
          </span>

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">
            {t('footer.headline')}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">{t('footer.description')}</p>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-all hover:opacity-90"
          >
            {t('buttons.requestQuote')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Main Footer */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <h3 className="text-xl font-semibold">Zova Organics</h3>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t('footer.brandDescription')}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
              Social Links
            </h4>

            <ul className="space-y-3">
              {socialLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
              {t('footer.companyLabel')}
            </h4>

            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
              {t('footer.contactLabel')}
            </h4>

            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <span>info@zovaorganics.com</span>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <span>+91 9073896612</span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-border py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-foreground">
              {t('footer.privacyPolicy')}
            </Link>

            <Link href="/tac" className="transition-colors hover:text-foreground">
              {t('footer.terms')}
            </Link>

            <Link href="/faq" className="transition-colors hover:text-foreground">
              {t('footer.faq')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
