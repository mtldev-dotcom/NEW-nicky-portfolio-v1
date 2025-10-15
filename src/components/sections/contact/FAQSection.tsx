'use client';

import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { useTranslations } from 'next-intl';

const FAQSection = () => {
  const t = useTranslations('contact.sections.faq');
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: t('items.timeline.question'),
      answer: t('items.timeline.answer')
    },
    {
      question: t('items.international.question'),
      answer: t('items.international.answer')
    },
    {
      question: t('items.aiServices.question'),
      answer: t('items.aiServices.answer')
    },
    {
      question: t('items.revisions.question'),
      answer: t('items.revisions.answer')
    },
    {
      question: t('items.payment.question'),
      answer: t('items.payment.answer')
    },
    {
      question: t('items.support.question'),
      answer: t('items.support.answer')
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-3">
          {t('title')}
        </h3>
        <p className="text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden transition-smooth hover:border-primary/50"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-smooth"
            >
              <h4 className="font-medium text-foreground pr-4">
                {faq?.question}
              </h4>
              <Icon
                name={openFAQ === index ? "ChevronUp" : "ChevronDown"}
                size={20}
                className={`text-muted-foreground transition-smooth ${openFAQ === index ? 'text-primary' : ''
                  }`}
              />
            </button>

            {openFAQ === index && (
              <div className="px-6 pb-4">
                <div className="pt-2 border-t border-border">
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {faq?.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            {t('cta.title')}
          </p>
          <a
            href="mailto:hello@nickybruno.ca?subject=Question about your services"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
          >
            <Icon name="Mail" size={16} />
            <span className="font-medium">{t('cta.button')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
