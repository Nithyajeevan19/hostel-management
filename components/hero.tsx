import Link from 'next/link'
import { ArrowRight, MapPin, Users, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
              Premium PG Accommodation
            </Badge>
            <h1 className="text-balance font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-150">
              Premium PG Living for <span className="text-primary italic">Professionals</span> & Students in Mumbai.
            </h1>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-300">
              Experience a fully managed, stress-free stay with homely meals, high-speed Wi-Fi, and daily housekeeping—all in a safe, vibrant community.
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap gap-6 text-sm font-medium text-foreground/80 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-500">
              <div className="flex items-center gap-2.5 transition-transform hover:-translate-y-1 bg-background/50 px-3 py-1.5 rounded-full border border-border/50 shadow-sm backdrop-blur-sm">
                <Shield className="size-4 text-green-600" />
                <span>24/7 Biometric Security</span>
              </div>
              <div className="flex items-center gap-2.5 transition-transform hover:-translate-y-1 bg-background/50 px-3 py-1.5 rounded-full border border-border/50 shadow-sm backdrop-blur-sm">
                <MapPin className="size-4 text-primary" />
                <span>Prime Commute Access</span>
              </div>
              <div className="flex items-center gap-2.5 transition-transform hover:-translate-y-1 bg-background/50 px-3 py-1.5 rounded-full border border-border/50 shadow-sm backdrop-blur-sm">
                <Users className="size-4 text-blue-600" />
                <span>Premium Community</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-700">
              <Button size="lg" className="h-14 px-8 text-base font-semibold transition-all hover:-translate-y-0.5 rounded-full" asChild>
                <Link href="#contact" className="flex items-center gap-2">
                  Schedule a Visit
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-base font-semibold transition-all hover:-translate-y-0.5 bg-background rounded-full hover:bg-primary/5 hover:text-primary border-border" asChild>
                <Link href="/rooms">Explore Rooms</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-1000">
              <div className="group flex flex-col gap-1">
                <p className="font-serif text-4xl font-bold text-primary transition-transform group-hover:scale-110 origin-left tracking-tight">500+</p>
                <p className="text-sm font-medium text-muted-foreground">Happy Residents</p>
              </div>
              <div className="group flex flex-col gap-1">
                <p className="font-serif text-4xl font-bold text-primary transition-transform group-hover:scale-110 origin-left tracking-tight">4.8<span className="text-2xl text-yellow-500 ml-1">★</span></p>
                <p className="text-sm font-medium text-muted-foreground">Google Rating</p>
              </div>
              <div className="group flex flex-col gap-1">
                <p className="font-serif text-4xl font-bold text-primary transition-transform group-hover:scale-110 origin-left tracking-tight">5+</p>
                <p className="text-sm font-medium text-muted-foreground">Years in Hospitality</p>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative hidden lg:block animate-in fade-in zoom-in-95 duration-1000 fill-mode-both delay-500">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted shadow-lg transition-transform hover:scale-105 duration-500">
                  <img 
                    src="/images/hero-1.jpg" 
                    alt="Comfortable PG room interior" 
                    className="size-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-lg transition-transform hover:scale-105 duration-500">
                  <img 
                    src="/images/hero-2.jpg" 
                    alt="Common dining area" 
                    className="size-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-lg transition-transform hover:scale-105 duration-500">
                  <img 
                    src="/images/hero-3.jpg" 
                    alt="Study area with desk" 
                    className="size-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted shadow-lg transition-transform hover:scale-105 duration-500">
                  <img 
                    src="/images/hero-4.jpg" 
                    alt="Clean bathroom facilities" 
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 -z-10 size-72 rounded-full bg-primary/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -bottom-4 -left-4 -z-10 size-72 rounded-full bg-accent/20 blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
