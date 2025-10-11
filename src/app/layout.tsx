import type { Metadata } from 'next';
import ScrollToTop from 'components/ScrollToTop';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nicky Bruno | Creative Technologist & Experience Designer',
  description:
    'Step into the immersive experience of Nicky Bruno, a creative technologist blending design, engineering, and AI-driven storytelling.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-background font-inter text-foreground antialiased">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
