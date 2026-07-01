import React from 'react';
import { MessageCircle, Mail, ArrowRight, Check, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
  const steps = [
    { icon: MessageCircle, text: 'Message Ping on WhatsApp' },
    { icon: Check, text: 'Ping introduces itself instantly' },
    { icon: Sparkles, text: 'Start setting reminders & lists' },
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Talk to Ping',
      subtitle: 'Send a message to start',
      value: '+91 80765 69811',
      action: 'Message Now',
      href: 'https://wa.me/918076569811',
      primary: true,
    },
    {
      icon: Mail,
      title: 'Email Support',
      subtitle: 'For help & inquiries',
      value: 'heypingchat@gmail.com',
      action: 'Send Email',
      href: 'mailto:heypingchat@gmail.com',
      primary: false,
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-ping/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-ping/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-ping-lighter rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-ping" />
              <span className="text-ping font-medium text-sm tracking-wide">Get Started</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-5 tracking-tight">
              Start Using{' '}
              <span className="gradient-text">Ping</span> Today
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              No sign-up, no download needed. Just send a message on WhatsApp and you're all set.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 max-w-5xl mx-auto">
          <div className="lg:col-span-3">
            <ScrollReveal delay={1}>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-8">
                  How to get started
                </h3>

                <div className="space-y-0">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-5 pb-8 relative last:pb-0">
                      {index < steps.length - 1 && (
                        <div className="absolute left-5 top-14 bottom-0 w-px bg-gradient-to-b from-ping/30 to-transparent" />
                      )}
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ping to-ping-dark flex items-center justify-center shadow-lg">
                          <step.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border-2 border-ping flex items-center justify-center">
                          <span className="text-xs font-bold text-ping">{index + 1}</span>
                        </div>
                      </div>
                      <div className="pt-1.5">
                        <p className="text-gray-900 font-medium">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-5 bg-gradient-to-r from-ping-lighter to-blue-50 rounded-xl border border-ping/10">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-ping mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong className="text-gray-900">Pro tip:</strong> Save Ping's WhatsApp number to your contacts so you can start a conversation anytime.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2">
            <ScrollReveal delay={2}>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    className={`group block rounded-2xl p-6 transition-all duration-300 ${
                      method.primary
                        ? 'bg-gradient-to-br from-ping to-ping-dark text-white shadow-xl hover:shadow-2xl hover:-translate-y-0.5'
                        : 'bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                          method.primary ? 'bg-white/20' : 'bg-ping-lighter'
                        }`}
                      >
                        <method.icon className={`h-6 w-6 ${method.primary ? 'text-white' : 'text-ping'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold ${method.primary ? 'text-white' : 'text-gray-900'}`}>
                          {method.title}
                        </div>
                        <div className={`text-xs mt-0.5 ${method.primary ? 'text-white/70' : 'text-gray-400'}`}>
                          {method.subtitle}
                        </div>
                        <div className={`text-sm mt-0.5 truncate ${method.primary ? 'text-white/80' : 'text-gray-500'}`}>
                          {method.value}
                        </div>
                      </div>
                      <ArrowRight
                        className={`h-5 w-5 transition-all duration-300 group-hover:translate-x-1 ${
                          method.primary ? 'text-white' : 'text-gray-400 group-hover:text-ping'
                        }`}
                      />
                    </div>
                  </a>
                ))}

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Why Ping?</h4>
                  <ul className="space-y-2.5">
                    {[
                      'No app installation needed',
                      'No account creation required',
                      'Works on any phone',
                      'Completely free',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
