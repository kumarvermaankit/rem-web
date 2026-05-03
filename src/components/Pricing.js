import React, { useState } from 'react';
import { Check, MessageCircle, Calendar, Users, Zap, Crown, Star } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for personal use',
      price: billingCycle === 'monthly' ? 0 : 0,
      features: [
        '10 reminders per month',
        'Basic task management',
        'One user account',
        'Standard notifications',
        'Email support'
      ],
      notIncluded: [
        'Recurring reminders',
        'Priority support',
        'Advanced analytics',
        'Team collaboration'
      ],
      icon: MessageCircle,
      color: 'bg-gray-100 text-gray-600',
      buttonColor: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      popular: false
    },
    {
      name: 'Pro',
      description: 'For power users and professionals',
      price: billingCycle === 'monthly' ? 9.99 : 99,
      features: [
        'Unlimited reminders',
        'Advanced task management',
        'Recurring reminders',
        'Priority notifications',
        'Email & chat support',
        'Basic analytics',
        'Calendar integration'
      ],
      notIncluded: [
        'Team collaboration',
        'Advanced analytics',
        'Custom integrations'
      ],
      icon: Calendar,
      color: 'bg-whatsapp-light text-whatsapp-dark',
      buttonColor: 'bg-whatsapp text-white hover:bg-whatsapp-dark',
      popular: true
    },
    {
      name: 'Business',
      description: 'For teams and organizations',
      price: billingCycle === 'monthly' ? 29.99 : 299,
      features: [
        'Everything in Pro',
        'Team collaboration (5 users)',
        'Advanced analytics dashboard',
        'Custom integrations',
        'Priority support (24/7)',
        'White-label options',
        'API access',
        'Custom workflows'
      ],
      notIncluded: [],
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      buttonColor: 'bg-purple-600 text-white hover:bg-purple-700',
      popular: false
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      price: 'Custom',
      features: [
        'Everything in Business',
        'Unlimited users',
        'Dedicated account manager',
        'Custom development',
        'SLA guarantee',
        'On-premise deployment',
        'Advanced security features',
        'Custom training'
      ],
      notIncluded: [],
      icon: Crown,
      color: 'bg-gold-100 text-gold-600',
      buttonColor: 'bg-gray-900 text-white hover:bg-gray-800',
      popular: false
    }
  ];

  const useCases = [
    {
      title: 'Students',
      description: 'Never miss assignment deadlines or exam dates',
      icon: Star,
      recommended: 'Free'
    },
    {
      title: 'Professionals',
      description: 'Manage meetings, deadlines, and personal tasks',
      icon: Zap,
      recommended: 'Pro'
    },
    {
      title: 'Small Teams',
      description: 'Collaborate on projects and shared deadlines',
      icon: Users,
      recommended: 'Business'
    },
    {
      title: 'Large Organizations',
      description: 'Enterprise-grade task management and automation',
      icon: Crown,
      recommended: 'Enterprise'
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
            Choose the plan that fits your needs. Start free and upgrade as you grow.
          </p>
          
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-whatsapp text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-whatsapp text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 ${
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
                  {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                </span>
                {typeof plan.price === 'number' && (
                  <span className="text-gray-600 ml-2">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                )}
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
                {plan.price === 'Custom' ? 'Contact Sales' : plan.price === 0 ? 'Start Free' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Who is this for?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
