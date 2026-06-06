import React from 'react';
import { Check, MessageCircle, Zap, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      description: 'Everything you need, totally free',
      price: 0,
      features: [
        'Unlimited reminders',
        'Todo lists with per-item reminders',
        'Personal notes vault',
        'Live data queries (stocks, cricket)',
        'Recurring reminders',
        'Daily morning prompt'
      ],
      icon: MessageCircle,
      color: 'bg-ping-lighter text-ping',
      buttonColor: 'bg-ping text-white hover:bg-ping-dark',
      popular: true
    }
  ];

  const useCases = [
    {
      title: 'Students',
      description: 'Never miss assignments or exam deadlines',
      icon: Star,
    },
    {
      title: 'Professionals',
      description: 'Manage meetings, deadlines, and personal tasks',
      icon: Zap,
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-ping/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-ping font-semibold text-sm tracking-widest uppercase mb-4">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Ping is free to use. No hidden charges, no trial period — just chat.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="flex justify-center mb-20">
            <div className="relative bg-white rounded-2xl p-8 max-w-md w-full ring-2 ring-ping/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-ping text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-6">
                <div className="bg-ping-lighter p-3 rounded-xl inline-block mb-4">
                  <MessageCircle className="h-6 w-6 text-ping" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-500">Everything you need, totally free</p>
              </div>

              <div className="text-center mb-8">
                <span className="text-5xl font-bold text-gray-900">Free</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plans[0].features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-ping-lighter p-0.5 rounded-full mr-3 mt-0.5 flex-shrink-0">
                      <Check className="h-4 w-4 text-ping" />
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className="w-full bg-ping text-white py-3 rounded-xl font-semibold hover:bg-ping-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-block text-center">
                Get Started
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Who is Ping for?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {useCases.map((useCase, index) => (
                <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1">
                  <div className="bg-ping-lighter p-3 rounded-xl inline-block mb-3">
                    <useCase.icon className="h-6 w-6 text-ping" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{useCase.title}</h4>
                  <p className="text-gray-500">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Pricing;
