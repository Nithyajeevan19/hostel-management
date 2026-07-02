import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: "Contact Us | Surya Mens & Women's PG",
  description: "Get in touch with Surya Mens & Women's PG. Schedule a visit, ask questions, or book your room today.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-secondary/50 py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Have questions? Want to schedule a visit? We&apos;re here to help you find your perfect home.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif text-xl">
                    <MessageCircle className="size-5 text-primary" />
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="flex flex-col gap-6">
                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Phone className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <a href="tel:+917013392233" className="mt-1 block text-muted-foreground hover:text-primary">
                        7013392233
                      </a>
                      <a href="tel:+919876543211" className="block text-muted-foreground hover:text-primary">
                        7013392233
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <a href="mailto:info@homestaypg.com" className="mt-1 block text-muted-foreground hover:text-primary">
                        info@homestaypg.com
                      </a>
                      <a href="mailto:bookings@homestaypg.com" className="block text-muted-foreground hover:text-primary">
                        bookings@homestaypg.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="mt-1 text-muted-foreground">
                        Anand Nagar, Beside Gajanan Maharaj Mandir,<br />
                        Alandi, Pune — 412105
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Landmark: Beside Gajanan Maharaj Mandir
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Clock className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Office Hours</h3>
                      <p className="mt-1 text-muted-foreground">
                        Monday - Saturday: 9:00 AM - 8:00 PM<br />
                        Sunday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-12 md:py-16 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
              <h2 className="font-serif text-3xl font-bold md:text-4xl text-foreground">
                Find Us
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Visit us to experience the premium PG lifestyle in person.
              </p>
            </div>
            
            <div className="group relative w-full h-[450px] overflow-hidden rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-1000 fill-mode-both delay-300">
              {/* Real Google Map iframe embedded as background */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.09673456789!2d73.8913!3d18.6738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c88fd69ebc4b%3A0xc6cb52504b2c159f!2sShri%20Gajanan%20Maharaj%20Temple%2C%20Alandi!5e0!3m2!1sen!2sin!4v1625550000000!5m2!1sen!2sin" 
                className="absolute inset-0 size-full border-0 opacity-70 transition-opacity duration-500 group-hover:opacity-90" 
                loading="lazy" 
                style={{ filter: "grayscale(20%) contrast(1.1)" }}
              />
              {/* Overlay to catch clicks and style the container */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
                
                {/* Pulsing Animated Map Marker */}
                <div className="relative mb-4 flex size-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping duration-1000" />
                  <div className="absolute inset-2 rounded-full bg-primary/30 animate-pulse" />
                  <div className="relative flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/50">
                    <MapPin className="size-7 animate-bounce" style={{ animationDuration: '2s' }} />
                  </div>
                </div>

                <div className="bg-background/80 backdrop-blur-md px-8 py-5 rounded-xl shadow-lg border border-border/50 pointer-events-auto transition-transform duration-300 hover:scale-105">
                  <h3 className="font-serif text-xl font-bold text-foreground">Surya Mens & Women&apos;s PG</h3>
                  <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                    Anand Nagar, Beside Gajanan Maharaj Mandir,<br />
                    Alandi, Pune — 412105
                  </p>
                  <a
                    href="https://maps.google.com/?q=18.6738,73.8913"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
                  >
                    <MapPin className="size-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
