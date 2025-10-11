import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './src/i18n/config';

export default createMiddleware({
  defaultLocale,
  locales,
  localeDetection: true,
});

export const config = {
  matcher: ['/', '/(?!_next|.*\\..*|api).+'],
};
