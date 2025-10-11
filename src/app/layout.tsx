import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = headers().get('x-next-intl-locale') ?? 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-background font-inter text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
