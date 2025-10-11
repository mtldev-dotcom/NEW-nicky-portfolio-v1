'use client';

import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "What\'s your typical project timeline?",
      answer: `Project timelines vary based on scope and complexity:\n\n• Simple websites: 2-4 weeks\n• Complex web applications: 6-12 weeks\n• AI integration projects: 4-8 weeks\n• Full rebrand + website: 8-16 weeks\n\nI always provide detailed timelines during our initial consultation, and I'm transparent about any potential delays or changes throughout the process.`
    },
    {
      question: "Do you work with international clients?",
      answer: `Absolutely! While I'm based in Montreal, I work with clients globally. I've successfully collaborated with teams across North America, Europe, and Asia.\n\nI'm comfortable working across different time zones and use modern collaboration tools to ensure smooth communication. For international projects, I typically price in USD and can accommodate various payment methods.`
    },
    {
      question: "What\'s included in your AI integration services?",
      answer: `My AI integration services cover the full spectrum:\n\n• AI strategy and consultation\n• Custom AI model integration\n• Automation workflow design\n• API integrations (OpenAI, Claude, etc.)\n• Performance optimization\n• Training and documentation\n\nI focus on practical AI implementations that solve real business problems, not just adding AI for the sake of it.`
    },
    {
      question: "How do you handle project revisions?",
      answer: `I believe in collaborative design and include revision rounds in all my projects:\n\n• Initial concepts: 2-3 revision rounds\n• Design refinements: Unlimited minor tweaks\n• Development changes: Scope-dependent\n• Content updates: 30 days post-launch\n\nMajor scope changes are discussed separately to ensure timeline and budget alignment.`
    },
    {
      question: "What\'s your payment structure?",
      answer: `I use a milestone-based payment structure for transparency:\n\n• 30% deposit to start the project\n• 40% at design approval/development midpoint\n• 30% upon project completion\n\nFor larger projects (50K+), we can discuss custom payment schedules. I accept wire transfers, checks, and major credit cards.`
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: `Yes! I offer several post-launch support options:\n\n• 30 days free bug fixes and minor adjustments\n• Monthly maintenance packages available\n• On-demand support for updates and changes\n• Performance monitoring and optimization\n• Content management training\n\nI believe in long-term partnerships, not just one-off projects.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-3">
          Frequently Asked Questions
        </h3>
        <p className="text-muted-foreground">
          Quick answers to common questions about working together
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
                className={`text-muted-foreground transition-smooth ${
                  openFAQ === index ? 'text-primary' : ''
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
            Don't see your question answered?
          </p>
          <a
            href="mailto:hello@nickybruno.ca?subject=Question about your services"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
          >
            <Icon name="Mail" size={16} />
            <span className="font-medium">Ask me directly</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
