import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { RoomCard } from '@/components/room-card'
import { CTASection } from '@/components/cta-section'
import { ROOMS } from '@/lib/products'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Rooms | SURYA PG',
  description: 'Explore our range of single, double, and triple sharing rooms with AC and non-AC options. Find the perfect accommodation for your needs.',
}

export default function RoomsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Editorial Page Header */}
        <section className="bg-secondary/20 pt-20 pb-16 md:pt-32 md:pb-24 border-b border-border/40">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">
                Accommodations
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                Find your perfect space.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Whether you need the quiet privacy of a single room to focus, or the shared energy of a double, every space is designed for modern comfort. 
                Transparent pricing. No hidden fees.
              </p>
            </div>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
              {ROOMS.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </section>

        {/* Included in All Rooms - Editorial Style */}
        <section className="bg-foreground text-background py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-4">
                  The Standard
                </p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Uncompromising comfort, standard in every room.
                </h2>
                <p className="mt-6 text-background/70 leading-relaxed">
                  We believe true hospitality means not nickel-and-diming our residents. These essentials are included in your monthly rent, regardless of which room type you choose.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                {[
                  { title: 'Daily Housekeeping', desc: 'Professional cleaning of your room and en-suite every single day.' },
                  { title: 'High-Speed Wi-Fi', desc: 'Enterprise-grade mesh network, unthrottled and unlimited.' },
                  { title: 'Power Backup', desc: '100% generator backup for uninterrupted work and comfort.' },
                  { title: '3 Chef-Prepared Meals', desc: 'Nutritious breakfast, lunch, and dinner cooked fresh daily.' },
                  { title: 'RO Drinking Water', desc: 'Purified drinking water stations available 24/7 on every floor.' },
                  { title: '24/7 Security', desc: 'Biometric access and round-the-clock trained security personnel.' },
                  { title: 'Laundry Service', desc: 'Twice-a-week wash and fold service included in your rent.' },
                  { title: 'Responsive Maintenance', desc: 'App-based ticketing system with guaranteed 24-hour resolution.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <CheckCircle2 className="size-6 text-primary shrink-0 opacity-80" />
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="mt-2 text-sm text-background/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
