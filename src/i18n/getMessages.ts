import type { Locale } from './config';

export async function getMessages(locale: Locale) {
  try {
    const messages = (await import(`./messages/${locale}.json`)).default;
    return messages;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Missing messages for locale "${locale}". Using empty object.`);
    }
    return {};
  }
}
