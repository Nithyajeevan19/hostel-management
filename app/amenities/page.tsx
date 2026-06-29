import type { Metadata } from 'next'
import { 
  Wifi, 
  Utensils, 
  Shirt, 
  Shield, 
  Sparkles, 
  Zap, 
  Droplets, 
  Car,
  Sofa,
  Dumbbell,
  Check
} from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AMENITIES } from '@/lib/amenities'

export const metadata: Metadata = {
  title: 'Amenities | Mahi PG',
  description: 'Discover all the amenities and facilities we offer - from high-speed WiFi to homely meals, laundry service, and 24/7 security.',
}

const iconMap: Record<string, React.ReactNode> = {
  wifi: <Wifi className="size-8" />,
  utensils: <Utensils className="size-8" />,
  shirt: <Shirt className="size-8" />,
  shield: <Shield className="size-8" />,
  sparkles: <Sparkles className="size-8" />,
  zap: <Zap className="size-8" />,
  droplets: <Droplets className="size-8" />,
  car: <Car className="size-8" />,
  sofa: <Sofa className="size-8" />,
  dumbbell: <Dumbbell className="size-8" />,
}

const houseRules = [
  'Maintain cleanliness in rooms and common areas',
  'No smoking or alcohol consumption on premises',
  'Visitors allowed only in common areas during visiting hours',
  'Entry gate closes at 10:30 PM (flexible for working professionals)',
  'Inform management for overnight absence',
  'Respect fellow residents and maintain peaceful environment',
  'Report any maintenance issues promptly',
  'Food delivery allowed until 10:00 PM',
]

export default function AmenitiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-secondary/50 py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
              Amenities & Facilities
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We provide everything you need for a comfortable, hassle-free living experience.
            </p>
          </div>
        </section>

        {/* Amenities Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {AMENITIES.map((amenity) => (
                <Card key={amenity.id} className="group transition-shadow hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {iconMap[amenity.icon]}
                    </div>
                    <CardTitle className="font-serif text-xl">{amenity.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{amenity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Meal Plans */}
        <section className="bg-secondary/30 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-serif text-2xl font-bold md:text-3xl">
              Meal Plans
            </h2>
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-serif text-lg font-semibold">Breakfast</h3>
                    <p className="mt-2 text-sm text-muted-foreground">7:00 AM - 9:30 AM</p>
                    <p className="mt-3 text-sm">Idli, Dosa, Poha, Upma, Bread, Tea/Coffee</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-serif text-lg font-semibold">Lunch</h3>
                    <p className="mt-2 text-sm text-muted-foreground">12:30 PM - 2:30 PM</p>
                    <p className="mt-3 text-sm">Rice, Roti, Dal, Vegetables, Salad, Curd</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-serif text-lg font-semibold">Dinner</h3>
                    <p className="mt-2 text-sm text-muted-foreground">7:30 PM - 9:30 PM</p>
                    <p className="mt-3 text-sm">Rice/Roti, Dal, Vegetables, Sweet (Weekends)</p>
                  </CardContent>
                </Card>
              </div>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                * Menu rotates weekly. Special dietary requirements can be accommodated upon request.
              </p>
            </div>
          </div>
        </section>

        {/* House Rules */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-serif text-2xl font-bold md:text-3xl">
              House Rules
            </h2>
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {houseRules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
