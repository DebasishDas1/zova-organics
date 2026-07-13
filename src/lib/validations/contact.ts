import { z } from 'zod'

export type ContactValidationMessages = {
  nameMin: string
  companyMin: string
  email: string
  phoneMin: string
  messageMin: string
}

export const createContactSchema = (messages: ContactValidationMessages) =>
  z.object({
    name: z.string().min(2, messages.nameMin).max(100),

    company: z.string().min(2, messages.companyMin).max(150),

    email: z.string().email(messages.email),

    phone: z.string().min(8, messages.phoneMin).max(20),

    category: z.enum(['organic-fabrics', 'bags', 'private-label', 'custom-product', 'other']),

    message: z.string().min(20, messages.messageMin).max(2000),
  })

export const contactSchema = createContactSchema({
  nameMin: 'Name must be at least 2 characters',
  companyMin: 'Company name is required',
  email: 'Please enter a valid email address',
  phoneMin: 'Phone number is too short',
  messageMin: 'Please provide more details',
})

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>
