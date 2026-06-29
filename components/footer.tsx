'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Phone, Mail, MapPin, Instagram, MessageCircle, Youtube } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const quickLinks = [
  { href: '#', label: 'Home' },
  { href: '#rooms', label: 'Rooms & Pricing' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#booking-process', label: 'How It Works' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact Us' },
]

const policies = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/refund-policy', label: 'Refund Policy' },
]

export function Footer() {
  const pathname = usePathname()

  const getHref = (href: string) => {
    if (pathname !== '/' && href.startsWith('#')) {
      return `/${href}`
    }
    return href
  }

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Column */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
                <Home className="size-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold">Mahi PG</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Premium paying guest accommodation for students and working
              professionals in Hyderabad. Safe, comfortable, and community-first
              co-living.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://wa.me/917013392233"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Youtube className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-foreground">
              Explore
            </h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getHref(link.href)}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-foreground">
              Contact
            </h3>
            <div className="flex flex-col gap-4 text-sm text-muted-foreground">
              <a
                href="tel:+917013392233"
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <Phone className="size-4 shrink-0 text-primary" />
                7013392233
              </a>
              <a
                href="mailto:info@homestaypg.com"
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <Mail className="size-4 shrink-0 text-primary" />
                info@homestaypg.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  123, Green Avenue, Near Central Mall,
                  <br />
                  Banjara Hills, Hyderabad — 500034
                </span>
              </div>
            </div>
          </div>

          {/* Office Hours + Mini Map Placeholder */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-foreground">
              Office Hours
            </h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Mon – Sat</span>
                <span className="font-medium text-foreground">9 AM – 8 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium text-foreground">10 AM – 4 PM</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>WhatsApp</span>
                <span className="font-medium text-foreground">24/7</span>
              </div>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <MapPin className="size-4" />
              Open in Google Maps
            </a>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Mahi PG. All rights reserved.</p>
          <div className="flex gap-5">
            {policies.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="transition-colors hover:text-primary"
              >
                {p.label}
              </Link>
            ))}
          </div>
          <p>Made with ❤️ in Hyderabad</p>
        </div>
      </div>
    </footer>
  )
}
