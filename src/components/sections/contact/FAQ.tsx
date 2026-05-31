'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Section, SectionHeader } from '@/components/ui/section'

const faqs = [
  {
    question: 'Do you offer private label manufacturing?',
    answer:
      'Yes. We work with brands looking to develop products under their own label, including custom packaging and branding.',
  },
  {
    question: 'Can you support international shipping?',
    answer: 'Yes. We coordinate export documentation and logistics for international buyers.',
  },
  {
    question: 'What are your minimum order quantities?',
    answer: 'MOQ varies depending on product category, materials, and customization requirements.',
  },
  {
    question: 'Do you provide product samples?',
    answer: 'Yes. Samples can be arranged before production begins.',
  },
]

export function FAQ() {
  return (
    <Section>
      <div className="container-zova max-w-4xl">
        <SectionHeader label="FAQ" title="Frequently asked questions." />

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>

              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}
