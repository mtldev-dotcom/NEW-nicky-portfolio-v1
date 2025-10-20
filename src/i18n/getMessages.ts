import type { Locale } from './config';

export async function getMessages(locale: Locale) {
  try {
    // Load all translation files for the locale
    const [global, home, about, services, portfolio, showroom, contact, chatbot] = await Promise.all([
      import(`./messages/${locale}/global.json`).then(m => m.default).catch(() => ({})),
      import(`./messages/${locale}/home.json`).then(m => m.default).catch(() => ({})),
      import(`./messages/${locale}/about.json`).then(m => m.default).catch(() => ({})),
      import(`./messages/${locale}/services.json`).then(m => m.default).catch(() => ({})),
      import(`./messages/${locale}/portfolio.json`).then(m => m.default).catch(() => ({})),
      import(`./messages/${locale}/showroom.json`).then(m => m.default).catch(() => ({})),
      import(`./messages/${locale}/contact.json`).then(m => m.default).catch(() => ({})),
      import(`./messages/${locale}/chatbot.json`).then(m => m.default).catch(() => ({}))
    ]);

    // Merge all translations into a single object
    return {
      global,
      home,
      about,
      services,
      portfolio,
      showroom,
      contact,
      chatbot
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Missing messages for locale "${locale}". Using empty object.`, error);
    }
    return {
      global: {},
      home: {},
      about: {},
      services: {},
      portfolio: {},
      showroom: {},
      contact: {},
      chatbot: {}
    };
  }
}
