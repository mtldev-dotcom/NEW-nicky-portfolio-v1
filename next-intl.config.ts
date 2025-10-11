export default {
  // Supported locales for the site
  locales: ['en', 'fr'],

  // Default locale to use
  defaultLocale: 'en',

  // With the app directory structure using /[locale]/..., we must ALWAYS prefix the locale
  // so that / redirects to /en and routes like /en/about-section resolve correctly.
  localePrefix: 'always'
};
