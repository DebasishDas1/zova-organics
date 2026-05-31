'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Section, SectionHeader } from '@/components/ui/section'

import { contactSchema, type ContactFormData } from '@/lib/validations/contact'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
      setFeedbackMessage('Thanks for reaching out! We will get back to you shortly.')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section>
      <div className="container-zova">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              label="Inquiry Form"
              title="Tell us about your project."
              className="mb-0"
            />
          </div>

          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input placeholder="Full Name" {...register('name')} />

                {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <Input placeholder="Company Name" {...register('company')} />

                {errors.company && (
                  <p className="mt-2 text-sm text-red-500">{errors.company.message}</p>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Input type="email" placeholder="Email Address" {...register('email')} />

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Input placeholder="Phone Number" {...register('phone')} />

                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <select
                  {...register('category')}
                  className="flex h-12 w-full rounded-xl border bg-background px-4 text-sm"
                >
                  <option value="organic-fabrics">Organic Fabrics</option>

                  <option value="bags">Bags</option>

                  <option value="private-label">Private Label</option>

                  <option value="custom-product">Custom Product</option>

                  <option value="other">Other</option>
                </select>

                {errors.category && (
                  <p className="mt-2 text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>

              <div>
                <Textarea
                  rows={8}
                  placeholder="Tell us about your sourcing requirements..."
                  {...register('message')}
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="rounded-full px-8">
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </Button>

              {feedbackMessage ? (
                <p className="mt-4 text-sm text-green-600">{feedbackMessage}</p>
              ) : null}

              {errorMessage ? <p className="mt-4 text-sm text-red-600">{errorMessage}</p> : null}
            </form>
          </div>
        </div>
      </div>
    </Section>
  )
}
