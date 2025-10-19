import { detectLocale, type Locale } from '@/i18n/config';

/**
 * Utility functions for locale detection and handling
 */

/**
 * Test the locale detection with various Accept-Language headers
 * Useful for development and testing
 */
export function testLocaleDetection(): void {
    const testCases = [
        'fr-CA,fr;q=0.9,en;q=0.8',
        'en-US,en;q=0.9',
        'fr-FR,fr;q=0.9,en;q=0.8',
        'es-ES,es;q=0.9',
        'de-DE,de;q=0.9',
        'fr-BE,fr;q=0.9,en;q=0.8',
        'en-GB,en;q=0.9',
        'fr-CH,fr;q=0.9,en;q=0.8',
    ];

    console.log('Locale Detection Test Results:');
    console.log('================================');

    testCases.forEach(acceptLanguage => {
        const detected = detectLocale(acceptLanguage);
        console.log(`${acceptLanguage} → ${detected}`);
    });
}

/**
 * Get the user's preferred locale from browser
 * Can be used in client components
 */
export function getUserPreferredLocale(): Locale {
    if (typeof window === 'undefined') {
        return 'en'; // Default for SSR
    }

    return detectLocale(navigator.language);
}

/**
 * Check if a locale is French (any variant)
 */
export function isFrenchLocale(locale: string): boolean {
    return locale.startsWith('fr');
}

/**
 * Check if a locale is English (any variant)
 */
export function isEnglishLocale(locale: string): boolean {
    return locale.startsWith('en');
}
