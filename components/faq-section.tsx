'use client'

import { useState } from 'react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'What is included in the monthly rent?',
    answer:
      'Your monthly rent includes accommodation, 3 meals a day (breakfast, lunch, dinner), high-speed Wi-Fi, 24/7 RO drinking water, housekeeping twice a week, and electricity (with a fair-use cap of 200 units). There are no hidden charges — everything is listed in your agreement.',
  },
  {
    question: 'How much is the security deposit, and is it refundable?',
    answer:
      "The security deposit is equivalent to one month's rent. It is 100% refundable upon vacating, provided the room is left in good condition and proper notice has been given. We process refunds within 7–10 working days.",
  },
  {
    question: 'What is the minimum lock-in period?',
    answer:
      'We have a minimum stay of 3 months. After that, you can leave with a 30-day written notice. We do our best to accommodate shorter stays — please speak to our team if you have a specific need.',
  },
  {
    question: 'Is the PG suitable for female residents?',
    answer:
      'Absolutely. We have dedicated female-only floors with separate entrances. We maintain strict visitor policies, 24/7 CCTV monitoring, and trained lady security staff to ensure a safe, comfortable environment.',
  },
  {
    question: 'What are the visiting hours and guest policies?',
    answer:
      'Guests are welcome in the common areas between 9 AM and 8 PM. No overnight stays are allowed for guests. This policy helps us maintain a peaceful and secure environment for all residents.',
  },
  {
    question: 'Can I see the room before committing?',
    answer:
      "Yes, and we strongly encourage it! Schedule a free in-person or virtual tour. We'll walk you through the property, show you real rooms (not just staged ones), and answer every question honestly. No sales pressure.",
  },
  {
    question: 'Do you provide food for all dietary preferences?',
    answer:
      "Yes. Our kitchen offers both vegetarian and non-vegetarian meals. We also accommodate common dietary restrictions — please let us know in advance. Monthly meal calendars are shared so you always know what's being served.",
  },
  {
    question: 'Is there parking available?',
    answer:
      'We offer two-wheeler parking for residents at no extra charge. Four-wheeler parking is available at a nominal monthly fee, subject to availability. Please enquire at booking.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-background py-16 md:py-24" id="faq">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Got Questions?
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need to Know
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We believe in full transparency. If you don't find your answer
              here, call or WhatsApp us — we'll respond within the hour.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border overflow-hidden">
          {faqs.map((faq, idx) => (
              <div key={idx} className="bg-background">
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                  id={`faq-${idx}`}
                >
                  <span className="font-semibold text-foreground">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'size-5 shrink-0 text-muted-foreground transition-transform duration-300',
                      openIndex === idx && 'rotate-180 text-primary'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-in-out',
                    openIndex === idx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
          ))}
        </div>

        <ScrollReveal>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Still have questions?{' '}
            <a
              href="https://wa.me/917013392233"
              className="font-semibold text-primary underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>{' '}
            or{' '}
            <a
              href="tel:+917013392233"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              call 7013392233
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
