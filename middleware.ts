import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { defaultLocale, locales } from './src/i18n/config';

// Create the next-intl middleware with proper locale detection
const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  localeDetection: true,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  console.log('🔍 Middleware called for:', request.nextUrl.pathname);
  console.log('🔍 Accept-Language:', request.headers.get('accept-language'));

  // Let next-intl handle the routing with its built-in locale detection
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ],
};
