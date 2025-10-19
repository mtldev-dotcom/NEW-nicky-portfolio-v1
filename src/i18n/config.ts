export const locales = ['en', 'fr'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Extended locale mapping for better detection
export const localeMapping: Record<string, Locale> = {
    // English variants
    'en': 'en',
    'en-us': 'en',
    'en-ca': 'en',
    'en-gb': 'en',
    'en-au': 'en',
    'en-nz': 'en',
    'en-ie': 'en',
    'en-za': 'en',

    // French variants
    'fr': 'fr',
    'fr-ca': 'fr',
    'fr-fr': 'fr',
    'fr-be': 'fr',
    'fr-ch': 'fr',
    'fr-lu': 'fr',
    'fr-mc': 'fr',
    'fr-sn': 'fr',
    'fr-ci': 'fr',
    'fr-ml': 'fr',
    'fr-bf': 'fr',
    'fr-ne': 'fr',
    'fr-td': 'fr',
    'fr-mg': 'fr',
    'fr-cm': 'fr',
    'fr-cd': 'fr',
    'fr-cg': 'fr',
    'fr-cf': 'fr',
    'fr-gq': 'fr',
    'fr-ga': 'fr',
    'fr-dj': 'fr',
    'fr-km': 'fr',
    'fr-re': 'fr',
    'fr-yt': 'fr',
    'fr-pf': 'fr',
    'fr-nc': 'fr',
    'fr-wf': 'fr',
    'fr-vu': 'fr',
    'fr-bi': 'fr',
    'fr-rw': 'fr',
    'fr-sc': 'fr',
    'fr-mu': 'fr',
};

/**
 * Detects the best matching locale from browser preferences
 * @param acceptLanguage - The Accept-Language header value
 * @returns The detected locale or default locale
 */
export function detectLocale(acceptLanguage?: string | null): Locale {
    if (!acceptLanguage) {
        return defaultLocale;
    }

    // Parse Accept-Language header and extract language codes with quality values
    const languages = acceptLanguage
        .split(',')
        .map(lang => {
            const [locale, qValue] = lang.trim().split(';q=');
            return {
                locale: locale.toLowerCase(),
                quality: qValue ? parseFloat(qValue) : 1.0
            };
        })
        .sort((a, b) => b.quality - a.quality);

    // Check each language preference
    for (const { locale } of languages) {
        // Direct match for supported locales
        if (locales.includes(locale as Locale)) {
            return locale as Locale;
        }

        // Check locale mapping for variants
        if (localeMapping[locale]) {
            return localeMapping[locale];
        }
    }

    // Fallback to default locale if no match found
    return defaultLocale;
}