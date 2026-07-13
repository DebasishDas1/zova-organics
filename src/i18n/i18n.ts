import en from './locales/en.json'
import fr from './locales/fr.json'
import de from './locales/de.json'
import es from './locales/es.json'
import it from './locales/it.json'
import pt from './locales/pt.json'
import nl from './locales/nl.json'
import pl from './locales/pl.json'
import ru from './locales/ru.json'
import tr from './locales/tr.json'
import ar from './locales/ar.json'

export const SUPPORTED_LOCALES = [
  'en',
  'fr',
  'de',
  'es',
  'it',
  'pt',
  'nl',
  'pl',
  'ru',
  'tr',
  'ar',
] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const RTL_LOCALES: Locale[] = ['ar']

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  pl: 'Polski',
  ru: 'Русский',
  tr: 'Türkçe',
  ar: 'العربية',
}

export type Messages = typeof en

const localeData = {
  en,
  fr,
  de,
  es,
  it,
  pt,
  nl,
  pl,
  ru,
  tr,
  ar,
} as unknown as Record<Locale, Messages>

function getObjectValue(object: any, path: string) {
  return path.split('.').reduce((value, segment) => {
    if (value === undefined || value === null) {
      return undefined
    }
    return value[segment]
  }, object)
}

function getSupportedLocale(locale: string | null | undefined): Locale {
  if (!locale) {
    return DEFAULT_LOCALE
  }

  const normalized = locale.toLowerCase().replace('_', '-')
  const primary = normalized.split('-')[0]

  if (SUPPORTED_LOCALES.includes(primary as Locale)) {
    return primary as Locale
  }

  if (normalized.startsWith('pt')) {
    return 'pt'
  }

  if (normalized.startsWith('ar')) {
    return 'ar'
  }

  return DEFAULT_LOCALE
}

export function isRtl(locale: string) {
  return RTL_LOCALES.includes(getSupportedLocale(locale))
}

export function getMessages(locale: string) {
  return localeData[getSupportedLocale(locale)]
}

export function getLocaleFromHeader(acceptLanguage: string | null | undefined) {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE
  }

  const candidates = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0].trim().toLowerCase())

  for (const candidate of candidates) {
    const locale = getSupportedLocale(candidate)
    if (SUPPORTED_LOCALES.includes(locale)) {
      return locale
    }
  }

  return DEFAULT_LOCALE
}

export function getLocaleFromCookie(cookieValue: string | undefined | null) {
  if (!cookieValue) {
    return null
  }

  const locale = cookieValue.split(';')[0].trim()
  return SUPPORTED_LOCALES.includes(locale as Locale) ? (locale as Locale) : null
}

export function getBrowserLocale() {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE
  }

  const browserLocales = [navigator.language, ...(navigator.languages ?? [])]
  for (const locale of browserLocales) {
    if (!locale) continue
    const normalized = getSupportedLocale(locale)
    if (SUPPORTED_LOCALES.includes(normalized)) {
      return normalized
    }
  }

  return DEFAULT_LOCALE
}

export function buildTranslator(messages: Messages) {
  return function t(key: string, values?: Record<string, string | number>): string {
    const message = getObjectValue(messages, key)

    if (typeof message !== 'string') {
      return key
    }

    if (!values) {
      return message
    }

    return message.replace(/\{\{\s*([^\s}]+)\s*\}\}/g, (_, valueKey) => {
      const replacement = values[valueKey]
      return replacement === undefined ? '' : String(replacement)
    })
  }
}
