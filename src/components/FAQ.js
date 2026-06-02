import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Clock, Shield, Zap, HelpCircle, Bell } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I start using the WhatsApp bot?",
      answer: "Simply click 'Start Free Trial' on our website, enter your phone number, and you'll receive a WhatsApp message to start the setup process. It takes less than 2 minutes to get started!",
      icon: MessageCircle,
      category: "Getting Started"
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely! We use end-to-end encryption and never share your personal information with third parties. All your reminders and tasks are stored securely and can be deleted at any time.",
      icon: Shield,
      category: "Security"
    },
    {
      question: "What types of reminders can I set?",
      answer: "You can set one-time reminders, recurring reminders (daily, weekly, monthly), location-based reminders, and even complex schedules. Just type naturally like 'Remind me to call mom every Sunday at 3pm'.",
      icon: Clock,
      category: "Features"
    },
    {
      question: "How accurate is the natural language processing?",
      answer: "Our AI understands natural language with 95%+ accuracy. It can parse dates, times, recurring patterns, and even complex scheduling instructions automatically.",
      icon: Zap,
      category: "Technology"
    },
    {
      question: "What happens if I miss a reminder?",
      answer: "The bot will automatically retry sending the reminder up to 3 times at 15-minute intervals. You can also set custom retry preferences in your settings.",
      icon: Bell,
      category: "Features"
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely! You can cancel your subscription at any time with no penalties. Your service will continue until the end of your billing period.",
      icon: HelpCircle,
      category: "Billing"
    }
  ];

  const categories = ["Getting Started", "Security", "Features", "Technology", "Billing"];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers. If you don't see your question here, feel free to contact our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg overflow-hidden card-hover"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="bg-whatsapp-light p-2 rounded-lg mr-4">
                        <faq.icon className="h-5 w-5 text-whatsapp-dark" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                        <span className="text-xs text-gray-500">{faq.category}</span>
                      </div>
                    </div>
                    {activeIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {activeIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 pl-12">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-whatsapp-light to-green-50 rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-700 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Chat Support</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Get instant help via WhatsApp
                  </p>
                  <a href="tel:+919555418627" className="w-full bg-whatsapp text-white py-2 rounded-lg font-medium hover:bg-whatsapp-dark transition-colors inline-block text-center">
                    Contact Support
                  </a>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    cyduck1107@gmail.com
                  </p>
                  <a href="mailto:cyduck1107@gmail.com" className="w-full bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors inline-block text-center">
                    Email Us
                  </a>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Average response time</span>
                  <span className="font-semibold text-gray-900">&lt; 2 hours</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-700">Support hours</span>
                  <span className="font-semibold text-gray-900">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Browse by Category
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-whatsapp-light hover:text-whatsapp-dark transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
