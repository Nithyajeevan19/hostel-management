import Link from 'next/link'
import { Phone, MessageCircle, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
      {/* Decorative blobs */}
      <div className="absolute -left-24 -top-24 size-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="container relative mx-auto px-4 text-center">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
            Limited Rooms Available
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-primary-foreground md:text-5xl">
            Your Perfect Room is Waiting.
            <br />
            <span className="text-primary-foreground/80">
              Visit Us Today.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-primary-foreground/75">
            Don't settle for a generic PG. Experience premium co-living — where
            your safety, comfort, and productivity are our first priority.
            Schedule a free tour and see for yourself.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="h-14 gap-2 px-8 text-base font-semibold transition-all hover:-translate-y-0.5"
              asChild
            >
              <Link href="#contact">
                <Calendar className="size-5" />
                Schedule a Free Visit
              </Link>
            </Button>
            <Button
              size="lg"
              className="h-14 gap-2 border-2 border-primary-foreground/40 bg-transparent px-8 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a
                href="https://wa.me/917013392233?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20rooms%20at%20Mahi%20PG"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-5" />
                WhatsApp Us
              </a>
            </Button>
            <Button
              size="lg"
              className="h-14 gap-2 border-2 border-primary-foreground/40 bg-transparent px-8 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a href="tel:+917013392233">
                <Phone className="size-5" />
                Call: 7013392233
              </a>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/60">
            <span>✓ No booking fee</span>
            <span>✓ 100% refundable deposit</span>
            <span>✓ Flexible move-in dates</span>
            <span>✓ Cancel anytime with 30-day notice</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
