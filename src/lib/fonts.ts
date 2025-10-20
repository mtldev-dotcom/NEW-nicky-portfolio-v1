import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

export const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

export const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
});
