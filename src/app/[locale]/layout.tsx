import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ScrollToTop from 'components/ScrollToTop';
import Chatbot from '@/components/ui/Chatbot';
import { getMessages } from '@/i18n/getMessages';
import { type Locale, locales } from '@/i18n/config';

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ScrollToTop />
      {children}
      <Chatbot />
    </NextIntlClientProvider>
  );
}
