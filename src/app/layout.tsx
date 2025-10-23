import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import Script from 'next/script' // 👈 add this
import './globals.css'
import { spaceGrotesk, inter, jetbrainsMono } from '@/lib/fonts'

// Ensure iOS uses full viewport and exposes safe-area insets
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headersList = await headers()
  const locale = headersList.get('x-next-intl-locale') ?? 'en'

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* ✅ Plausible Analytics Script */}
        <Script
          strategy="afterInteractive"
          data-domain="nickybruno.com,localhost"
          src="https://plausible.nickybruno.com/js/script.js"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-background font-inter text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
