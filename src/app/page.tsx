import {redirect} from 'next/navigation';
import {defaultLocale} from '@/i18n/config';

// Fallback server-side redirect from "/" to "/<defaultLocale>"
// Ensures root path works even if middleware doesn't match "/"
export default function RootRedirect() {
  redirect(`/${defaultLocale}`);
}
