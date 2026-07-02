import { ScrollReveal } from '@/components/scroll-reveal'
import { Coffee, BookOpen, Utensils, Moon, Sun, Users } from 'lucide-react'

const timeline = [
  { time: '6:30 AM', icon: Sun, title: 'Rise & Shine', description: 'Start your day with fresh air on the terrace or a quick workout in the fitness area.' },
  { time: '7:30 AM', icon: Utensils, title: 'Wholesome Breakfast', description: 'Hot parathas, idli, dosa, or poha — a rotating regional menu every morning.' },
  { time: '9:00 AM', icon: BookOpen, title: 'Head Out or Log In', description: 'Metro is 5 minutes away. Or use the study lounge for remote work and online classes.' },
  { time: '1:00 PM', icon: Utensils, title: 'Home-Style Lunch', description: 'Dal, rice, roti, sabzi, and salad — packed fresh if you need it at work.' },
  { time: '5:00 PM', icon: Coffee, title: 'Evening Tea & Unwind', description: 'Tea, coffee, and snacks in the common lounge. Catch up with fellow residents.' },
  { time: '8:30 PM', icon: Utensils, title: 'Comforting Dinner', description: 'Proper home-cooked dinner. Weekend specials include biriyani, paneer, and regional dishes.' },
  { time: '10:00 PM', icon: Moon, title: 'Wind Down', description: 'Your clean, quiet room is waiting. Fresh linens, good Wi-Fi, and zero distractions.' },
]

export function ResidentLifeSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary/10 overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal animation="fade-up" className="mb-16 md:mb-20 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Life at SURYA PG</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            A Day in the <span className="text-primary italic">Life</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Here&apos;s what a typical day looks like for our residents. No stress, no surprises — just comfortable, managed living.
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = item.icon
              const isLeft = index % 2 === 0
              return (
                <ScrollReveal key={index} animation="fade-up" delay={index * 80}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 pl-16 md:pl-0 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">{item.time}</span>
                      <h3 className="font-serif text-lg font-bold text-foreground mt-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                    </div>

                    {/* Icon dot */}
                    <div className="absolute left-[22px] md:left-1/2 -translate-x-1/2 flex size-[44px] items-center justify-center rounded-full bg-background border-2 border-primary/20 text-primary shadow-sm z-10">
                      <Icon className="size-4.5" />
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block flex-1 md:w-1/2" />
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>

        <ScrollReveal animation="fade-up" delay={600} className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-5 py-2.5 rounded-full text-sm font-semibold">
            <Users className="size-4" />
            Join 500+ residents enjoying this lifestyle daily
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
