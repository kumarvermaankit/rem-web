import React from 'react';
import { Check, MessageCircle, Zap, Star } from 'lucide-react';

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
      notIncluded: [],
      icon: MessageCircle,
      color: 'bg-whatsapp-light text-whatsapp-dark',
      buttonColor: 'bg-whatsapp text-white hover:bg-whatsapp-dark',
      popular: true
    }
  ];

  const useCases = [
    {
      title: 'Students',
      description: 'Never miss assignments or exam deadlines',
      icon: Star,
      recommended: 'Free'
    },
    {
      title: 'Professionals',
      description: 'Manage meetings, deadlines, and personal tasks',
      icon: Zap,
      recommended: 'Free'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Ping is free to use. No hidden charges, no trial period — just chat.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 max-w-md w-full ${
                plan.popular
                  ? 'ring-2 ring-whatsapp shadow-xl transform scale-105'
                  : 'shadow-lg card-hover'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-whatsapp text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className={`p-3 rounded-lg inline-block mb-4 ${plan.color}`}>
                <plan.icon className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {typeof plan.price === 'number' && plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start opacity-50">
                    <div className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
                    </div>
                    <span className="text-gray-500 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.buttonColor}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Who is Ping for?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {useCases.map((useCase, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 p-3 rounded-lg inline-block mb-3">
                  <useCase.icon className="h-6 w-6 text-gray-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{useCase.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{useCase.description}</p>
                <span className="inline-block bg-whatsapp-light text-whatsapp-dark px-3 py-1 rounded-full text-xs font-semibold">
                  {useCase.recommended}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
