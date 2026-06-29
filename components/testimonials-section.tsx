'use client'

import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { TESTIMONIALS } from '@/lib/testimonials'

export function TestimonialsSection() {
  return (
    <section id="reviews" className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Testimonials</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
            What Our Residents Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Hear from our happy residents about their experience living at Mahi PG.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="mx-auto w-full max-w-5xl"
        >
          <CarouselContent>
            {TESTIMONIALS.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <Quote className="mb-4 size-8 text-primary/30" />
                    <p className="mb-6 flex-1 text-muted-foreground">{testimonial.content}</p>
                    <div className="flex items-center gap-4">
                      <Avatar className="size-12 bg-primary/10 text-primary">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star 
                            key={i} 
                            className="size-4 fill-amber-500 text-amber-500 animate-in fade-in zoom-in duration-500" 
                            style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Resident for {testimonial.stayDuration}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  )
}
