'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Section } from '@/components/ui/section'
import { cn } from '@/lib/utils'

type FAQItem = {
  question: string
  answer: string
}

type FAQProps = {
  questionList: FAQItem[]

  eyebrow?: string
  title?: string
  description?: string

  className?: string
}

export function FAQ({
  questionList,
  eyebrow = 'FAQ',
  title = 'Frequently asked questions.',
  description,
  className,
}: FAQProps) {
  return (
    <Section className={className}>
      <div className="container-zova">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {eyebrow}
          </span>

          <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">{title}</h2>

          {description && (
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">{description}</p>
          )}
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <Accordion type="single" collapsible className="w-full divide-y">
            {questionList.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`} className="border-none">
                <AccordionTrigger
                  className={cn(
                    'py-8 text-left text-lg font-medium',
                    'hover:no-underline',
                    'transition-colors',
                  )}
                >
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent
                  className={cn('pb-8', 'text-base leading-relaxed', 'text-muted-foreground')}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  )
}
