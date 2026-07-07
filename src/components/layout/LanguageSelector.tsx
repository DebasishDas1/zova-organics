'use client'

import { useI18n } from '@/i18n/I18nProvider'

export function LanguageSelector() {
  const { locale, availableLocales, setLocale, t } = useI18n()

  return (
    <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <span className="sr-only">{t('language.selectorLabel')}</span>
      <select
        aria-label={t('language.selectorAria')}
        value={locale}
        onChange={(event) => setLocale(event.target.value as any)}
        className="rounded-full border border-border bg-background/90 py-2 pl-3 pr-8 text-sm text-foreground outline-none transition-shadow focus:ring-2 focus:ring-primary"
      >
        {availableLocales.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </label>
  )
}
