'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle, Shield, Lock, FileCheck } from 'lucide-react';

interface PrivacyItemProps {
    text: string;
    delay: number;
}

function PrivacyItem({ text, delay }: PrivacyItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex items-center space-x-3"
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle className="h-5 w-5" />
            </div>
            <span className="text-muted-foreground">{text}</span>
        </motion.div>
    );
}

export default function PrivacyAssurance() {
    const t = useTranslations('contact.privacyAssurance');

    const privacyItems = t.raw('items') as string[];

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-4xl"
                >
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                            <Shield className="mr-2 h-4 w-4" />
                            Privacy Guaranteed
                        </div>

                        <h2 className="mb-6 font-space-grotesk text-3xl font-bold text-foreground md:text-4xl">
                            {t('title')}
                        </h2>
                    </div>

                    {/* Privacy Items Grid */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {privacyItems.map((item, index) => (
                            <PrivacyItem
                                key={index}
                                text={item}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>

                    {/* Additional Security Icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 flex justify-center space-x-8"
                    >
                        <div className="flex flex-col items-center space-y-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Lock className="h-6 w-6" />
                            </div>
                            <span className="text-sm text-muted-foreground">Encrypted</span>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <FileCheck className="h-6 w-6" />
                            </div>
                            <span className="text-sm text-muted-foreground">GDPR Compliant</span>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Shield className="h-6 w-6" />
                            </div>
                            <span className="text-sm text-muted-foreground">Secure</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
