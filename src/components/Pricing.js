import React from 'react';
import { Check, MessageCircle, Zap, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Pricing = () => {
  const plan = {
    name: 'Free',
    description: 'Everything you need, totally free — forever',
    price: 0,
    features: [
      'Unlimited reminders',
      'Todo lists with per-item reminders',
      'Personal notes vault',
      'Live data queries (stocks, cricket)',
      'Recurring reminders',
      'Daily morning prompt',
      'Priority support',
    ],
    gradient: 'from-ping via-ping-dark to-blue-700',
  };

  const stats = [
    { value: 'Free', label: 'Always free, no trial' },
    { value: 'Zero', label: 'Apps to download' },
    { value: 'Unlimited', label: 'Reminders & lists' },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-ping/20 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-ping/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-ping/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-ping-lighter rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-ping" />
              <span className="text-ping font-medium text-sm tracking-wide">Pricing</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-5 tracking-tight">
              Simple, Transparent{' '}
              <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Ping is completely free to use. No hidden charges, no trial period — just chat.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="flex justify-center mb-16 md:mb-20">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-ping via-ping-light to-ping-dark rounded-3xl blur-xl opacity-30" />
              <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-ping to-ping-dark text-white px-5 py-1.5 rounded-full text-sm font-semibold shadow-lg inline-flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Most Popular
                  </span>
                </div>

                <div className="text-center mb-6 mt-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ping-lighter to-blue-100 flex items-center justify-center mx-auto mb-5">
                    <MessageCircle className="h-8 w-8 text-ping" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-1">Free</h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                  <span className="text-6xl font-display font-bold text-gray-900">Free</span>
                  <span className="text-gray-400 ml-1">/ forever</span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="bg-ping-lighter rounded-full p-0.5 mr-3 mt-0.5 flex-shrink-0">
                        <Check className="h-4 w-4 text-ping" />
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="w-full bg-gradient-to-r from-ping to-ping-dark text-white py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-ping/25 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2 text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Get Started Free
                </a>

                <p className="text-center text-xs text-gray-400 mt-4">No credit card required · Cancel anytime</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-2xl font-display font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Pricing;
