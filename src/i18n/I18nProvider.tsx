'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  buildTranslator,
  DEFAULT_LOCALE,
  getBrowserLocale,
  getMessages,
  isRtl,
  LOCALE_NAMES,
  Locale,
  SUPPORTED_LOCALES,
} from '@/i18n/i18n'

const STORAGE_KEY = 'zova_locale'
const COOKIE_NAME = 'zova-locale'

type Messages = ReturnType<typeof getMessages>

type I18nContextType = {
  locale: Locale
  messages: Messages
  t: (key: string, values?: Record<string, string | number>) => string
  setLocale: (locale: Locale) => void
  formatDate: (value: string | number | Date, options?: Intl.DateTimeFormatOptions) => string
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string
  formatCurrency: (value: number, currency: string) => string
  localeName: string
  isRtl: boolean
  availableLocales: Array<{ code: Locale; name: string }>
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function writeLocaleToCookie(locale: Locale) {
  if (typeof document === 'undefined') {
    return
  }
  document.cookie = `${COOKIE_NAME}=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
}

function writeLocaleToStorage(locale: Locale) {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, locale)
}

function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return null
  }

  const locale = window.localStorage.getItem(STORAGE_KEY)
  if (!locale) {
    return null
  }

  return SUPPORTED_LOCALES.includes(locale as Locale) ? (locale as Locale) : null
}

export function LanguageProvider({
  defaultLocale,
  children,
}: {
  defaultLocale: Locale
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [messages, setMessages] = useState(() => getMessages(defaultLocale))

  useEffect(() => {
    const storedLocale = getStoredLocale()
    const browserLocale = getBrowserLocale()
    const resolvedLocale = storedLocale ?? browserLocale ?? defaultLocale

    if (resolvedLocale !== locale) {
      setLocaleState(resolvedLocale)
      setMessages(getMessages(resolvedLocale))
      writeLocaleToCookie(resolvedLocale)
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = resolvedLocale
      document.documentElement.dir = isRtl(resolvedLocale) ? 'rtl' : 'ltr'
    }
  }, [defaultLocale, locale])

  const setLocale = useCallback((selectedLocale: Locale) => {
    const nextLocale = SUPPORTED_LOCALES.includes(selectedLocale) ? selectedLocale : DEFAULT_LOCALE

    setLocaleState(nextLocale)
    setMessages(getMessages(nextLocale))
    writeLocaleToStorage(nextLocale)
    writeLocaleToCookie(nextLocale)

    if (typeof document !== 'undefined') {
      document.documentElement.lang = nextLocale
      document.documentElement.dir = isRtl(nextLocale) ? 'rtl' : 'ltr'
    }
  }, [])

  const t = useMemo(() => buildTranslator(messages), [messages])

  const contextValue = useMemo(
    () => ({
      locale,
      messages,
      t,
      setLocale,
      formatDate: (value: string | number | Date, options?: Intl.DateTimeFormatOptions) => {
        const date =
          typeof value === 'string' || typeof value === 'number' ? new Date(value) : value
        return new Intl.DateTimeFormat(locale, options).format(date)
      },
      formatNumber: (value: number, options?: Intl.NumberFormatOptions) =>
        new Intl.NumberFormat(locale, options).format(value),
      formatCurrency: (value: number, currency: string) =>
        new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value),
      localeName: LOCALE_NAMES[locale],
      isRtl: isRtl(locale),
      availableLocales: SUPPORTED_LOCALES.map((code) => ({ code, name: LOCALE_NAMES[code] })),
    }),
    [locale, messages, setLocale, t],
  )

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used inside LanguageProvider')
  }
  return context
}
