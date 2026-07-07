'use client'

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Section } from '@/components/ui/section'

import { createContactSchema, type ContactFormData } from '@/lib/validations/contact'
import { useI18n } from '@/i18n/I18nProvider'

type FormFieldProps = {
  label: string
  error?: string
  children: React.ReactNode
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-3">
      <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>

      {children}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export function ContactForm() {
  const { t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const validationMessages = useMemo(
    () => ({
      nameMin: t('contact.form.validation.nameMin'),
      companyMin: t('contact.form.validation.companyMin'),
      email: t('contact.form.validation.email'),
      phoneMin: t('contact.form.validation.phoneMin'),
      messageMin: t('contact.form.validation.messageMin'),
    }),
    [t],
  )

  const contactSchema = useMemo(() => createContactSchema(validationMessages), [validationMessages])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      category: 'organic-fabrics',
      message: '',
    },
  })

  const onSubmit = async (values: ContactFormData) => {
    try {
      setIsSubmitting(true)
      setFeedbackMessage(null)
      setErrorMessage(null)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.message ?? t('contact.form.error'))
      }

      reset()
      setFeedbackMessage(t('contact.form.success'))
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('contact.form.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section
      id="contact-form"
      className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] xl:grid-cols-[0.85fr_1.15fr]"
    >
      <div className="space-y-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-zova-green">
            {t('contact.page.eyebrow')}
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{t('contact.page.title')}</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">{t('contact.page.description')}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-border/60 bg-background/80 p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t('contact.info.items.general.title')}
            </p>
            <p className="mt-3 font-semibold">{t('contact.info.items.general.value')}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('contact.info.items.general.description')}
            </p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-background/80 p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t('contact.info.items.export.title')}
            </p>
            <p className="mt-3 font-semibold">{t('contact.info.items.export.value')}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('contact.info.items.export.description')}
            </p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-background/80 p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t('contact.info.items.basedIn.title')}
            </p>
            <p className="mt-3 font-semibold">{t('contact.info.items.basedIn.value')}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('contact.info.items.basedIn.description')}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-border/60 bg-white/60 p-8 backdrop-blur-sm md:p-12">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-zova-green">
            {t('contact.form.labelInquiry')}
          </p>
          <h3 className="text-2xl font-semibold">{t('contact.form.headline')}</h3>
          <p className="max-w-xl text-muted-foreground">{t('contact.form.description')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField label={t('contact.form.nameLabel')} error={errors.name?.message?.toString()}>
              <Input
                placeholder={t('contact.form.namePlaceholder')}
                {...register('name')}
                className="h-14 rounded-2xl border-border/60 bg-background/80 px-5 shadow-none"
              />
            </FormField>
            <FormField
              label={t('contact.form.companyLabel')}
              error={errors.company?.message?.toString()}
            >
              <Input
                placeholder={t('contact.form.companyPlaceholder')}
                {...register('company')}
                className="h-14 rounded-2xl border-border/60 bg-background/80 px-5 shadow-none"
              />
            </FormField>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label={t('contact.form.emailLabel')}
              error={errors.email?.message?.toString()}
            >
              <Input
                type="email"
                placeholder={t('contact.form.emailPlaceholder')}
                {...register('email')}
                className="h-14 rounded-2xl border-border/60 bg-background/80 px-5 shadow-none"
              />
            </FormField>
            <FormField
              label={t('contact.form.phoneLabel')}
              error={errors.phone?.message?.toString()}
            >
              <Input
                placeholder={t('contact.form.phonePlaceholder')}
                {...register('phone')}
                className="h-14 rounded-2xl border-border/60 bg-background/80 px-5 shadow-none"
              />
            </FormField>
          </div>

          <FormField
            label={t('contact.form.categoryLabel')}
            error={errors.category?.message?.toString()}
          >
            <select
              {...register('category')}
              className="h-14 w-full rounded-2xl border border-border/60 bg-background/80 px-5 text-sm outline-none"
            >
              <option value="organic-fabrics">
                {t('contact.form.categoryOptions.organicFabrics')}
              </option>
              <option value="bags">{t('contact.form.categoryOptions.bags')}</option>
              <option value="private-label">
                {t('contact.form.categoryOptions.privateLabel')}
              </option>
              <option value="custom-product">
                {t('contact.form.categoryOptions.customProduct')}
              </option>
              <option value="other">{t('contact.form.categoryOptions.other')}</option>
            </select>
          </FormField>

          <FormField
            label={t('contact.form.projectDetailsLabel')}
            error={errors.message?.message?.toString()}
          >
            <Textarea
              rows={8}
              placeholder={t('contact.form.messagePlaceholder')}
              {...register('message')}
              className="min-h-[180px] rounded-2xl border-border/60 bg-background/80 px-5 py-4 shadow-none"
            />
          </FormField>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 rounded-full px-8 text-sm font-medium"
            >
              {isSubmitting ? t('buttons.sendingInquiry') : t('buttons.sendInquiry')}
              {!isSubmitting && <ArrowUpRight className="ml-2 size-4" />}
            </Button>
          </div>

          {feedbackMessage && (
            <div className="rounded-2xl border border-green-200 bg-green-50/80 p-4 text-sm text-green-700">
              {feedbackMessage}
            </div>
          )}

          {errorMessage && (
            <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700">
              {errorMessage || t('contact.form.error')}
            </div>
          )}
        </form>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-border/60 bg-background/80 p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t('contact.form.responseTimeTitle')}
            </p>
            <p className="mt-3 text-base font-semibold">{t('contact.form.responseTimeValue')}</p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-background/80 p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t('contact.form.moqSupportTitle')}
            </p>
            <p className="mt-3 text-base font-semibold">{t('contact.form.moqSupportValue')}</p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-background/80 p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t('contact.form.shippingTitle')}
            </p>
            <p className="mt-3 text-base font-semibold">{t('contact.form.shippingValue')}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
