import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, locales, type Locale} from './config';

export default getRequestConfig(async ({locale}) => {
  const candidate = locale as string | undefined;

  const resolved: Locale =
    candidate && (locales as readonly string[]).includes(candidate)
      ? (candidate as Locale)
      : defaultLocale;

  try {
    const messages = (await import(`./messages/${resolved}.json`)).default;
    return {
      locale: resolved,
      messages
    };
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `next-intl: Missing or invalid messages for locale "${resolved}". Using empty messages.`,
        err
      );
    }
    return {
      locale: resolved,
      messages: {}
    };
  }
});
