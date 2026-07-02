import { MapPin, Train, GraduationCap, Building2, Hospital, ShoppingBag, Clock, Navigation } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollReveal } from '@/components/scroll-reveal'

const commuteData = {
  forStudents: [
    { name: 'MIT Academy of Engineering (MITAOE)', time: '5 min', mode: 'Walk' },
    { name: 'DY Patil College (Akurdi)', time: '20 min', mode: 'Auto/Bus' },
    { name: 'COEP Tech University (Shivajinagar)', time: '35 min', mode: 'Bus' },
    { name: 'MIT WPU Campus (Kothrud)', time: '45 min', mode: 'Bus/Metro' },
  ],
  forProfessionals: [
    { name: 'Markal Industrial Zone', time: '10 min', mode: 'Auto' },
    { name: 'Chakan MIDC Industrial Area', time: '15 min', mode: 'Auto' },
    { name: 'Talawade Software Park', time: '20 min', mode: 'Auto/Bus' },
    { name: 'Hinjewadi IT Park Phase 1', time: '45 min', mode: 'Bus' },
  ],
}

const nearbyEssentials = [
  { icon: Train, name: 'Alandi Bus ST Stand', distance: '5 min walk' },
  { icon: Hospital, name: 'Indrayani Hospital', distance: '8 min' },
  { icon: ShoppingBag, name: 'Sant Dnyaneshwar Mandir', distance: '10 min walk' },
  { icon: GraduationCap, name: 'MITAOE Campus', distance: '5 min walk' },
  { icon: ShoppingBag, name: 'Bhosari D-Mart', distance: '12 min' },
  { icon: Building2, name: 'SBI & Bank of Maharashtra ATMs', distance: '2 min walk' },
]

const neighborhoodPerks = [
  'Well-lit streets with active security patrols',
  'Multiple restaurant and food delivery options',
  'Pharmacy and medical stores within walking distance',
  'Auto and cab availability at doorstep, 24/7',
]

export function LocationSection() {
  return (
    <section id="location" className="py-20 md:py-28 overflow-hidden bg-white border-t border-border/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollReveal animation="fade-up" className="mb-16 md:mb-20 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Location & Commute</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            Your Daily Commute, <span className="text-primary italic">Sorted</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Located in the peaceful town of Alandi, Pune, close to key educational institutions and industrial zones. Whether you study or work, you&apos;ll spend less time commuting and more time living.
          </p>
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left: Map + Address */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="space-y-6">
              {/* Map Embed */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.09673456789!2d73.8913!3d18.6738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c88fd69ebc4b%3A0xc6cb52504b2c159f!2sShri%20Gajanan%20Maharaj%20Temple%2C%20Alandi!5e0!3m2!1sen!2sin!4v1625550000000!5m2!1sen!2sin"
                  className="absolute inset-0 size-full border-0"
                  loading="lazy"
                  style={{ filter: 'grayscale(15%) contrast(1.05)' }}
                  title="Surya Mens & Women's PG Location"
                />
              </div>

              {/* Address Card */}
              <Card className="border-primary/15 bg-primary/3">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground">Surya Mens & Women&apos;s PG</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                        Anand Nagar, Beside Gajanan Maharaj Mandir, Alandi, Pune 412105
                      </p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full">
                        <Navigation className="size-3" />
                        Landmark: Beside Gajanan Maharaj Mandir
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Neighborhood Perks */}
              <div>
                <h4 className="font-bold text-foreground mb-3">Why This Neighborhood</h4>
                <ul className="space-y-2">
                  {neighborhoodPerks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="size-1.5 bg-primary rounded-full shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Commute Intelligence */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="space-y-8">
              {/* Nearby Essentials */}
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-5">Nearby Essentials</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {nearbyEssentials.map((place) => {
                    const Icon = place.icon
                    return (
                      <div key={place.name} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-background hover:border-primary/20 transition-colors group">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/15">
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{place.name}</p>
                          <p className="text-xs text-primary font-semibold">{place.distance}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Commute for Students */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="size-5 text-primary" />
                  <h3 className="font-serif text-lg font-bold text-foreground">For Students</h3>
                </div>
                <div className="space-y-3">
                  {commuteData.forStudents.map((item) => (
                    <div key={item.name} className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0">
                      <span className="text-sm text-foreground font-medium">{item.name}</span>
                      <div className="flex items-center gap-2 text-right shrink-0">
                        <span className="text-sm font-bold text-primary">{item.time}</span>
                        <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{item.mode}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commute for Professionals */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="size-5 text-primary" />
                  <h3 className="font-serif text-lg font-bold text-foreground">For Working Professionals</h3>
                </div>
                <div className="space-y-3">
                  {commuteData.forProfessionals.map((item) => (
                    <div key={item.name} className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0">
                      <span className="text-sm text-foreground font-medium">{item.name}</span>
                      <div className="flex items-center gap-2 text-right shrink-0">
                        <span className="text-sm font-bold text-primary">{item.time}</span>
                        <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{item.mode}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
