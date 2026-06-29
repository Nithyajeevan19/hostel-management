import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { TrustSection } from '@/components/trust-section'
import { RoomsSection } from '@/components/rooms-section'
import { AmenitiesSection } from '@/components/amenities-section'
import { GallerySection } from '@/components/gallery-section'
import { LocationSection } from '@/components/location-section'
import { ResidentLifeSection } from '@/components/resident-life-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { BookingProcessSection } from '@/components/booking-process-section'
import { FAQSection } from '@/components/faq-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { MobileStickyCTA } from '@/components/mobile-sticky-cta'
import { ContactForm } from '@/components/contact-form'
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 1. Hero — First impression, headline + trust signals */}
        <Hero />

        {/* 2. Trust — Safety, food, WiFi, management */}
        <TrustSection />

        {/* 3. Rooms — Filterable room cards with pricing transparency */}
        <RoomsSection />

        {/* 4. Amenities — Lifestyle-grouped amenities */}
        <AmenitiesSection />

        {/* 5. Resident Life — A day in the life storytelling */}
        <ResidentLifeSection />

        {/* 6. Gallery — Bento-box visual showcase */}
        <GallerySection />

        {/* 7. Location — Commute intelligence + neighborhood map */}
        <LocationSection />

        {/* 8. Testimonials — Social proof carousel */}
        <TestimonialsSection />

        {/* 9. Booking Process — 4-step transparent journey */}
        <BookingProcessSection />

        {/* 10. FAQ — Answers that remove final objections */}
        <FAQSection />

        {/* 11. CTA — Final conversion push */}
        <CTASection />

        {/* 12. Contact Form Anchor Section */}
        <section id="contact" className="py-20 bg-secondary/30 relative scroll-mt-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold md:text-4xl text-foreground">
                Get in Touch
              </h2>
              <p className="mt-4 text-muted-foreground">
                Schedule a visit or send us your questions. We're here to help.
              </p>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
              {/* Contact Info Sidebar */}
              <div className="flex flex-col gap-4">
                <div className="bg-background rounded-2xl p-6 border shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Call Us</h3>
                    <p className="text-sm text-muted-foreground mt-1">7013392233</p>
                  </div>
                </div>
                <div className="bg-background rounded-2xl p-6 border shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <p className="text-sm text-muted-foreground mt-1">info@homestaypg.com</p>
                  </div>
                </div>
                <div className="bg-background rounded-2xl p-6 border shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Visit Us</h3>
                    <p className="text-sm text-muted-foreground mt-1">123 Green Avenue, Near Central Mall, City Center</p>
                  </div>
                </div>
              </div>

              {/* Form Area */}
              <div className="lg:col-span-2 bg-background rounded-3xl p-8 border shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <MessageCircle className="size-32" />
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Floating mobile CTA bar */}
      <MobileStickyCTA />
    </div>
  )
}
