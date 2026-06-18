'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight } from 'lucide-react'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
    <Section id="contact-form" className="pb-32">
      <div className="container-zova">
        <div className="grid gap-20 lg:grid-cols-12">
          {/* Left Content */}
          <div className="lg:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Inquiry Form
            </span>

            <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl lg:text-6xl">
              Tell us about your sourcing requirements.
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Whether you&apos;re looking for organic fabrics, custom bags, private-label
              manufacturing, or long-term sourcing partnerships, we&apos;d love to hear about your
              project.
            </p>

            <div className="mt-16 border-t border-border/60 pt-10">
              <div className="space-y-10">
                <div>
                  <p className="text-sm font-medium">Response Time</p>
                  <p className="mt-1 text-sm text-muted-foreground">Within 24 business hours</p>
                </div>

                <div>
                  <p className="text-sm font-medium">MOQ Support</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Flexible solutions for growing brands and importers
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Global Shipping</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Air and sea freight available worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] border border-border/60 bg-white/60 p-8 backdrop-blur-sm md:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField label="Your Name" error={errors.name?.message}>
                    <Input
                      placeholder="John Doe"
                      {...register('name')}
                      className="h-14 rounded-2xl border-border/60 bg-background/80 px-5 shadow-none"
                    />
                  </FormField>

                  <FormField label="Company" error={errors.company?.message}>
                    <Input
                      placeholder="Company Name"
                      {...register('company')}
                      className="h-14 rounded-2xl border-border/60 bg-background/80 px-5 shadow-none"
                    />
                  </FormField>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField label="Work Email" error={errors.email?.message}>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      {...register('email')}
                      className="h-14 rounded-2xl border-border/60 bg-background/80 px-5 shadow-none"
                    />
                  </FormField>

                  <FormField label="Phone Number" error={errors.phone?.message}>
                    <Input
                      placeholder="+1 234 567 890"
                      {...register('phone')}
                      className="h-14 rounded-2xl border-border/60 bg-background/80 px-5 shadow-none"
                    />
                  </FormField>
                </div>

                <FormField label="Product Category" error={errors.category?.message}>
                  <select
                    {...register('category')}
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-border/60
                      bg-background/80
                      px-5
                      text-sm
                      outline-none
                    "
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
                    placeholder="Tell us about your product requirements, customization needs, expected quantities, certifications, and target markets..."
                    {...register('message')}
                    className="
                      min-h-[180px]
                      rounded-2xl
                      border-border/60
                      bg-background/80
                      px-5
                      py-4
                      shadow-none
                    "
                  />
                </FormField>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      h-14
                      rounded-full
                      px-8
                      text-sm
                      font-medium
                    "
                  >
                    {isSubmitting ? 'Sending Inquiry...' : 'Request Quote'}

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
