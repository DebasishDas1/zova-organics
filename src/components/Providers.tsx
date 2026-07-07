'use client'

import type { ReactNode } from 'react'
import { LanguageProvider } from '@/i18n/I18nProvider'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/i18n'

export function Providers({
  children,
  defaultLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode
  defaultLocale?: Locale
}) {
  return <LanguageProvider defaultLocale={defaultLocale}>{children}</LanguageProvider>
}
