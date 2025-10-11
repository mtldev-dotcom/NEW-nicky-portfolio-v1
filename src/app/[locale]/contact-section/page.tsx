import ContactSection from 'components/sections/contact/ContactSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Nicky Bruno | Creative Technologist',
  description:
    "Let's collaborate on your next project—connect with Nicky Bruno for AI-driven design, development, and strategy.",
  alternates: {
    canonical: '/contact-section',
  },
  openGraph: {
    title: 'Contact - Nicky Bruno',
    description:
      "Start a conversation about creative technology, AI automation, and digital transformation.",
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactSection />;
}
