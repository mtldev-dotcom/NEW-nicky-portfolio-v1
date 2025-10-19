import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { detectLocale } from '@/i18n/config';

export default async function RootPage() {
    // Get the Accept-Language header
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');

    // Detect the locale
    const detectedLocale = detectLocale(acceptLanguage);

    // Redirect to the detected locale
    redirect(`/${detectedLocale}`);
}
