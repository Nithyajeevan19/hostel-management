'use client'

import Link from 'next/link'
import { Phone, MessageCircle, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down a bit
      setIsVisible(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] md:hidden transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shrink-0 border-primary/20 text-primary bg-primary/5" asChild>
          <Link href="tel:+917013392233" aria-label="Call Us">
            <Phone className="size-5" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shrink-0 border-green-600/20 text-green-600 bg-green-50" asChild>
          <Link href="https://wa.me/917013392233" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <MessageCircle className="size-5" />
          </Link>
        </Button>
        <Button className="flex-1 h-12 rounded-full text-base font-semibold transition-all hover:-translate-y-0.5" asChild>
          <Link href="#contact">
            <Calendar className="mr-2 size-4" />
            Schedule Visit
          </Link>
        </Button>
      </div>
    </div>
  )
}
