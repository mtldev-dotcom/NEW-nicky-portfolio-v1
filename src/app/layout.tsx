import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import './globals.css';
import { spaceGrotesk, inter, jetbrainsMono } from '@/lib/fonts';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') ?? 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-background font-inter text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
