import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Clock, Shield, Zap, HelpCircle, Bell } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I start using Ping?",
      answer: "Just send a message to Ping on WhatsApp — that's it. No app to download, no account to create. Ping will introduce itself and you can start setting reminders, creating lists, and more right away.",
      icon: MessageCircle,
      category: "Getting Started"
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. Ping uses end-to-end encryption and never shares your personal information with third parties. All your reminders, lists, and notes are stored securely and can be deleted anytime.",
      icon: Shield,
      category: "Security"
    },
    {
      question: "What types of reminders can I set?",
      answer: "One-time reminders, recurring (daily, weekly, monthly, custom intervals), and even reminders tied to specific items in your to-do lists. Just type naturally like 'remind me to call mom every Sunday at 3pm'.",
      icon: Clock,
      category: "Features"
    },
    {
      question: "How does Ping understand natural language?",
      answer: "Ping is built on AI that understands natural speech with high accuracy. It can parse dates, times, recurring patterns, and complex instructions — just say it like you would to a person.",
      icon: Zap,
      category: "Technology"
    },
    {
      question: "What happens if I miss a reminder?",
      answer: "Ping automatically retries up to 3 times at 15-minute intervals. You can snooze from the notification itself — no need to type anything.",
      icon: Bell,
      category: "Features"
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel anytime with no penalties. Your service continues until the end of your billing period.",
      icon: HelpCircle,
      category: "Billing"
    }
  ];

  const categories = ["Getting Started", "Security", "Features", "Technology", "Billing"];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-ping/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-ping font-semibold text-sm tracking-widest uppercase mb-4">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={Math.min(index + 1, 5)}>
                  <div className="bg-gray-50 rounded-xl overflow-hidden card-hover border border-gray-100 hover:border-ping/20">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`w-full px-6 py-5 text-left flex items-center justify-between transition-colors duration-300 ${activeIndex === index ? 'bg-ping-lighter' : 'hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-4 transition-colors duration-300 ${activeIndex === index ? 'bg-ping text-white' : 'bg-ping-lighter'}`}>
                          <faq.icon className={`h-5 w-5 transition-colors duration-300 ${activeIndex === index ? 'text-white' : 'text-ping'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                          <span className="text-xs text-gray-400">{faq.category}</span>
                        </div>
                      </div>
                      <div className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-5 pt-2">
                        <p className="text-gray-600 pl-14 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal delay={3}>
              <div className="bg-gradient-to-br from-ping-lighter to-blue-50 rounded-2xl p-6 sticky top-24 border border-ping/10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-6">
                  Can't find the answer you're looking for? Message Ping on WhatsApp or reach out to our team.
                </p>

                <div className="space-y-4">
                  <div className="bg-white/90 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-gray-900 mb-2">Chat Support</h4>
                    <p className="text-sm text-gray-500 mb-3">Get instant help via WhatsApp</p>
                    <a href="tel:+919555418627" className="w-full bg-ping text-white py-2 rounded-lg font-medium hover:bg-ping-dark transition-all duration-300 inline-block text-center">
                      Contact Support
                    </a>
                  </div>

                  <div className="bg-white/90 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                    <p className="text-sm text-gray-500 mb-3">cyduck1107@gmail.com</p>
                    <a href="mailto:cyduck1107@gmail.com" className="w-full bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 inline-block text-center">
                      Email Us
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-ping/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Average response time</span>
                    <span className="font-semibold text-gray-900">&lt; 2 hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
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
