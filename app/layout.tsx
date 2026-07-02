import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { MobileStickyCTA } from '@/components/mobile-sticky-cta'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Surya Mens & Women's PG | Premium Paying Guest Accommodation",
  description: 'Find your perfect home away from home. Premium PG accommodation for students and working professionals with modern amenities, homely food, and a comfortable living experience.',
  keywords: ['PG hostel', 'paying guest', 'student accommodation', 'working professional housing', 'affordable rooms', 'hostel near me'],
  openGraph: {
    title: "Surya Mens & Women's PG | Premium Paying Guest Accommodation",
    description: 'Find your perfect home away from home. Premium PG accommodation for students and working professionals.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#8B5A2B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${outfit.variable} bg-background relative`}>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <div className="fixed inset-0 z-[-1] opacity-40 mix-blend-soft-light pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          <MobileStickyCTA />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
