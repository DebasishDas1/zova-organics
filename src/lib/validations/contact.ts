import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),

  company: z.string().min(2, 'Company name is required').max(150),

  email: z.email('Please enter a valid email address'),

  phone: z.string().min(8, 'Phone number is too short').max(20),

  category: z.enum(['organic-fabrics', 'bags', 'private-label', 'custom-product', 'other']),

  message: z.string().min(20, 'Please provide more details').max(2000),
})

export type ContactFormData = z.infer<typeof contactSchema>
