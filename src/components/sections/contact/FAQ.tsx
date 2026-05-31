'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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
    <section className="section-padding">
      <div className="container-zova max-w-4xl">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">FAQ</span>

          <h2 className="mt-4">Frequently asked questions.</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>

              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
