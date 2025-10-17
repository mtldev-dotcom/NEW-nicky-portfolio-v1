'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import { useTranslations } from 'next-intl';

const FAQSection = () => {
  const t = useTranslations('contact.sections.faq');
  const [openFAQ, setOpenFAQ] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const faqVariants = {
    closed: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
  };

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
    <motion.div
      ref={ref}
      className="glass-panel rounded-xl p-8 card-lift"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-3">
          {t('title')}
        </h3>
        <p className="text-muted-foreground">
          {t('subtitle')}
        </p>
      </motion.div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {faqs?.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-border rounded-lg overflow-hidden transition-smooth hover:border-primary/50 group"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            <motion.button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-smooth group-hover:bg-primary/5"
              whileHover={{ backgroundColor: "rgba(0, 255, 209, 0.05)" }}
              whileTap={{ scale: 0.98 }}
            >
              <h4 className="font-medium text-foreground pr-4 group-hover:text-primary transition-colors">
                {faq?.question}
              </h4>
              <motion.div
                animate={{ rotate: openFAQ === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  name="ChevronDown"
                  size={20}
                  className={`text-muted-foreground transition-smooth group-hover:text-primary ${openFAQ === index ? 'text-primary' : ''
                    }`}
                />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {openFAQ === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <div className="pt-2 border-t border-border">
                      <motion.p
                        className="text-muted-foreground whitespace-pre-line leading-relaxed"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {faq?.answer}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 pt-6 border-t border-border"
        variants={itemVariants}
      >
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            {t('cta.title')}
          </p>
          <motion.a
            href="mailto:hello@nickybruno.ca?subject=Question about your services"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              whileHover={{ rotate: 5 }}
            >
              <Icon name="Mail" size={16} />
            </motion.div>
            <span className="font-medium">{t('cta.button')}</span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQSection;
