import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, MessageCircle, Clock, Shield, Zap, HelpCircle, Bell, Mail, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I start using Ping?',
      answer: 'Just send a message to Ping on WhatsApp — that\'s it. No app to download, no account to create. Ping will introduce itself and you can start setting reminders, creating lists, and more right away.',
      icon: MessageCircle,
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely. Your data is encrypted and never shared with third parties. All your reminders, lists, and notes are stored securely and can be deleted anytime. You can request full data deletion through our Data Deletion page.',
      icon: Shield,
    },
    {
      question: 'What types of reminders can I set?',
      answer: 'One-time reminders, recurring (daily, weekly, monthly, custom intervals), and even reminders tied to specific items in your to-do lists. Just type naturally like "remind me to call mom every Sunday at 3pm".',
      icon: Clock,
    },
    {
      question: 'How does Ping understand natural language?',
      answer: 'Ping is built on AI that understands natural speech with high accuracy. It can parse dates, times, recurring patterns, and complex instructions — just say it like you would to a person.',
      icon: Zap,
    },
    {
      question: 'What happens if I miss a reminder?',
      answer: 'Ping automatically retries up to 3 times at 15-minute intervals. You can snooze from the notification itself — no need to type anything.',
      icon: Bell,
    },
    {
      question: 'Is Ping really free?',
      answer: 'Yes, Ping is completely free. There are no hidden charges, no premium tiers, and no trial period. All features are available to everyone at no cost.',
      icon: HelpCircle,
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="absolute inset-0 pointer-events-none bg-dots" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-ping-lighter rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-ping" />
              <span className="text-ping font-medium text-sm tracking-wide">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-5 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Got questions? We've got answers.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="lg:col-span-3">
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={Math.min(index + 1, 5)}>
                  <div
                    className={`bg-gray-50 rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 ${
                      activeIndex === index ? 'border-ping/20 shadow-md' : 'hover:border-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`w-full px-6 py-5 text-left flex items-center justify-between transition-all duration-300 ${
                        activeIndex === index ? 'bg-white' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            activeIndex === index
                              ? 'bg-ping text-white shadow-md'
                              : 'bg-ping-lighter text-ping'
                          }`}
                        >
                          <faq.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-base md:text-lg pr-4">{faq.question}</h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-all duration-300 ${
                          activeIndex === index ? 'rotate-180 text-ping' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-400 ease-in-out ${
                        activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="pl-14">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <ScrollReveal delay={3}>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-6 md:p-8 sticky top-24 border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ping-lighter to-blue-100 flex items-center justify-center mb-5">
                  <HelpCircle className="h-7 w-7 text-ping" />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                  Talk to Ping
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Message Ping on WhatsApp to start setting reminders, lists, and more.
                </p>

                <div className="space-y-3">
                  <a
                    href="https://wa.me/918076569811"
                    className="group flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 hover:border-ping/20 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-ping-lighter flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="h-5 w-5 text-ping" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm">Message Ping</div>
                      <div className="text-gray-500 text-xs">Start chatting now</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-ping transition-colors" />
                  </a>

                  <a
                    href="mailto:heypingchat@gmail.com"
                    className="group flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 hover:border-ping/20 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-ping-lighter flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-5 w-5 text-ping" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm">Email Support</div>
                      <div className="text-gray-500 text-xs">heypingchat@gmail.com</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-ping transition-colors" />
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm py-1.5">
                    <span className="text-gray-500">Average response time</span>
                    <span className="font-semibold text-gray-900">&lt; 2 hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5">
                    <span className="text-gray-500">Support hours</span>
                    <span className="font-semibold text-gray-900">24/7</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
