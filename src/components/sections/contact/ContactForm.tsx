'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Section } from '@/components/ui/section'

import { contactSchema, type ContactFormData } from '@/lib/validations/contact'

type FormFieldProps = {
  label: string
  error?: string
  children: React.ReactNode
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>

      {children}

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  )
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema as any),

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
        throw new Error(result?.message ?? 'Failed to submit inquiry')
      }

      reset()

      setFeedbackMessage(
        'Thank you for reaching out. Our team will review your inquiry and get back to you within 24 business hours.',
      )
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section className="pb-32">
      <div className="container-zova">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Content */}
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Inquiry Form
            </span>

            <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">
              Tell us about your sourcing requirements.
            </h2>

            <p className="mt-6 text-muted-foreground">
              Whether you're looking for organic fabrics, custom bags, private label manufacturing,
              or long-term sourcing partnerships, we'd love to learn more.
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <p className="font-medium">Response Time</p>

                <p className="text-sm text-muted-foreground">Within 24 business hours</p>
              </div>

              <div>
                <p className="font-medium">MOQ Support</p>

                <p className="text-sm text-muted-foreground">
                  Flexible solutions for growing brands and importers
                </p>
              </div>

              <div>
                <p className="font-medium">Global Shipping</p>

                <p className="text-sm text-muted-foreground">
                  Air and sea freight available worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border bg-card p-8 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField label="Your Name" error={errors.name?.message}>
                    <Input placeholder="John Doe" {...register('name')} />
                  </FormField>

                  <FormField label="Company" error={errors.company?.message}>
                    <Input placeholder="Company Name" {...register('company')} />
                  </FormField>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField label="Work Email" error={errors.email?.message}>
                    <Input type="email" placeholder="john@company.com" {...register('email')} />
                  </FormField>

                  <FormField label="Phone Number" error={errors.phone?.message}>
                    <Input placeholder="+1 234 567 890" {...register('phone')} />
                  </FormField>
                </div>

                <FormField label="Product Category" error={errors.category?.message}>
                  <select
                    {...register('category')}
                    className="flex h-12 w-full rounded-xl border bg-background px-4 text-sm"
                  >
                    <option value="organic-fabrics">Organic Fabrics</option>

                    <option value="bags">Tote Bags & Pouches</option>

                    <option value="private-label">Private Label</option>

                    <option value="custom-product">Custom Product</option>

                    <option value="other">Other</option>
                  </select>
                </FormField>

                <FormField label="Project Details" error={errors.message?.message}>
                  <Textarea
                    rows={8}
                    placeholder="Tell us about your product requirements, customization needs, expected quantity, certifications, and target market..."
                    {...register('message')}
                  />
                </FormField>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-14 rounded-full px-8"
                >
                  {isSubmitting ? 'Sending Inquiry...' : 'Request Quote'}
                </Button>

                {feedbackMessage && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                    {feedbackMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
