'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Home, Phone, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#location', label: 'Location' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const getHref = (href: string) => {
    if (pathname !== '/' && href.startsWith('#')) {
      return `/${href}`
    }
    return href
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center",
        scrolled ? "pt-4 sm:pt-6" : "pt-0"
      )}
    >
      <div
        className={cn(
          "relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between gap-4",
          scrolled
            ? "h-[4.5rem] w-[98%] max-w-7xl rounded-full bg-background/80 backdrop-blur-2xl border border-primary/10 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] px-4 md:px-8"
            : "h-24 w-full bg-transparent px-6 lg:px-12 border-b border-transparent"
        )}
      >
        {/* Left: Logo (30% width) */}
        <div className="flex w-[200px] justify-start shrink-0">
          <Link href="/" className="group flex items-center gap-3 relative z-10">
            <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary transition-all duration-500 group-hover:scale-105 overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-primary/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Home className="size-5 transition-transform duration-500 group-hover:scale-110 relative z-10" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-opacity duration-500" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary whitespace-nowrap">
              Mahi PG
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation (Flexible center) */}
        <nav className="hidden lg:flex justify-center flex-1">
          <div className="flex items-center gap-1 rounded-full p-1 bg-foreground/5 transition-colors duration-500 border border-transparent hover:border-border/50">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={getHref(item.href)}
                className="relative px-3 xl:px-4 py-2 text-sm font-semibold text-muted-foreground transition-all duration-300 hover:text-foreground group rounded-full overflow-hidden"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 rounded-full bg-primary/10 scale-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </nav>

        {/* Right: Action Buttons & Mobile Toggle (Fixed width to match left) */}
        <div className="flex min-w-[200px] justify-end items-center gap-3 xl:gap-5 relative z-10 shrink-0">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest leading-none mb-1">Live Support</span>
            <Link href="https://wa.me/917013392233" className="flex items-center gap-1.5 text-sm font-bold hover:text-primary transition-colors">
              <Phone className="size-3.5 text-primary" />
              7013392233
            </Link>
          </div>
          <Button size="sm" className="hidden sm:flex rounded-full h-11 px-6 transition-all duration-500 hover:-translate-y-0.5 group relative overflow-hidden bg-primary text-primary-foreground font-bold" asChild>
            <Link href={getHref('#contact')}>
              <span className="relative z-10 flex items-center gap-2 text-sm tracking-wide">
                Schedule
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>

          {/* Mobile Navigation Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden relative z-10">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary size-11">
                <Menu className="size-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] border-l border-white/10 bg-background/80 backdrop-blur-2xl p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full bg-gradient-to-b from-background/50 to-background">
                <div className="p-6 pb-8 border-b border-border/30">
                  <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
                    <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary transition-all duration-500 group-hover:scale-105 shadow-inner">
                      <Home className="size-6" />
                    </div>
                    <span className="font-serif text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                      Mahi PG
                    </span>
                  </Link>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item, i) => (
                      <Link
                        key={item.href}
                        href={getHref(item.href)}
                        className="group flex items-center gap-4 rounded-2xl px-4 py-4 text-lg font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:pl-6"
                        onClick={() => setIsOpen(false)}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <Sparkles className="size-5 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 text-primary" />
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="p-6 bg-muted/30 border-t border-border/30 flex flex-col gap-4">
                  <Button variant="outline" size="lg" className="w-full rounded-2xl h-14 text-base font-semibold group bg-background" asChild>
                    <Link href="tel:+917013392233" className="flex items-center justify-center gap-2">
                      <Phone className="size-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                      Call Us
                    </Link>
                  </Button>
                  <Button size="lg" className="w-full rounded-2xl h-14 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group" asChild>
                    <Link href={getHref('#contact')} onClick={() => setIsOpen(false)}>
                      <span className="relative z-10">Schedule a Visit</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
