import React, { useState, useEffect } from 'react';
import { Check, Star, Sparkles, MessageCircle, ArrowUpRight, X, Phone } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const SYMBOL_MAP = { USD: '$', INR: '₹', GBP: '£', EUR: '€', AUD: 'A$', CAD: 'C$' };

const DISPLAY_PRICES = {
  helper:    { USD: 0.99, INR: 69, GBP: 0.79, EUR: 0.89, AUD: 1.49, CAD: 1.29 },
  assistant: { USD: 1.29, INR: 89, GBP: 0.99, EUR: 1.19, AUD: 1.99, CAD: 1.79 },
  manager:   { USD: 1.99, INR: 109, GBP: 1.49, EUR: 1.79, AUD: 2.99, CAD: 2.69 },
};

const plans = [
  {
    id: 'helper',
    name: 'Helper',
    stars: 1,
    description: 'Essential reminders & password vault',
    features: [
      'Unlimited reminders',
      'Recurring reminders',
      'Personal notes vault',
      'Password manager',
      'Daily morning prompt',
    ],
    gradient: 'from-ping-light to-ping',
    popular: false,
  },
  {
    id: 'assistant',
    name: 'Assistant',
    stars: 2,
    description: 'To-do lists, calorie tracker & more',
    features: [
      'Everything in Helper',
      'Unlimited to-do lists',
      'Per-item reminders on todos',
      'Calorie & diet tracker',
      'Live stock & cricket queries',
    ],
    gradient: 'from-violet-400 to-purple-500',
    popular: true,
  },
  {
    id: 'manager',
    name: 'Manager',
    stars: 3,
    description: 'Google integration & premium support',
    features: [
      'Everything in Assistant',
      'Google Calendar integration',
      'Google Meet & Docs creation',
      'Google Sheets integration',
      'Priority 24/7 support',
    ],
    gradient: 'from-amber-400 to-orange-500',
    popular: false,
  },
];

const getCountry = () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const region = timezone.split('/')[0];
    const map = { Asia: 'IN', Europe: 'GB', America: 'US', Australia: 'AU', Pacific: 'AU', Africa: 'GB' };
    return map[region] || 'IN';
  } catch { return 'IN'; }
};

const getCurrency = (country) => {
  const map = { US: 'USD', IN: 'INR', GB: 'GBP', UK: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', AU: 'AUD', CA: 'CAD' };
  return map[country] || 'USD';
};



const renderStars = (count) => {
  return Array.from({ length: 3 }, (_, i) => (
    <Star key={i} className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
  ));
};

const API_BASE = 'https://reminder-backend-production-ping.up.railway.app';

const Pricing = () => {
  const [country, setCountry] = useState('IN');
  const [submitting, setSubmitting] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const currency = getCurrency(country);

  useEffect(() => {
    setCountry(getCountry());
  }, []);

  const openCheckout = (planId) => {
    setCheckoutPlan(planId);
    setCheckoutPhone('');
  };

  const closeCheckout = () => {
    setCheckoutPlan(null);
    setSubmitting(false);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!checkoutPhone) return;
    setSubmitting(true);

    try {
      const userRes = await fetch(`${API_BASE}/razorpay/find-or-create-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: checkoutPhone }),
      });
      const userData = await userRes.json();
      if (!userData.success) {
        alert('Could not identify user.');
        setSubmitting(false);
        return;
      }

      const custRes = await fetch(`${API_BASE}/razorpay/create-customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userData.userId,
          contact: checkoutPhone,
        }),
      });
      const custData = await custRes.json();
      if (!custData.success) {
        alert('Failed to create customer.');
        setSubmitting(false);
        return;
      }

      const linkRes = await fetch(`${API_BASE}/razorpay/create-subscription-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: checkoutPlan,
          userId: userData.userId,
          customerId: custData.customerId,
          interval: 'monthly',
          country,
        }),
      });
      const linkData = await linkRes.json();
      if (!linkData.success) {
        alert('Failed to create subscription.');
        setSubmitting(false);
        return;
      }

      window.location.href = linkData.shortUrl;
    } catch {
      alert('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  const SYMBOL = SYMBOL_MAP[currency] || currency;
  const showCountryName = country === 'IN' ? 'India' : country === 'US' ? 'USA' : country === 'GB' || country === 'UK' ? 'UK' : country;

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-gray-50/80 overflow-hidden">
      <div className="absolute inset-0 bg-pattern pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />

      <div className="absolute -top-40 -right-40 w-96 h-96 bg-ping/[0.03] rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-ping/[0.03] rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="up">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-ping-lighter/80 rounded-full px-4 py-1.5 mb-5 border border-ping/10">
              <Sparkles className="w-3.5 h-3.5 text-ping" />
              <span className="text-ping font-medium text-sm tracking-wide">Pricing</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4 tracking-tight">
              Plans for{' '}
              <span className="gradient-text">Everyone</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Prices shown in <span className="font-semibold text-gray-700">{currency}</span> based on your region ({showCountryName}).
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const displayPrice = DISPLAY_PRICES[plan.id][currency] || DISPLAY_PRICES[plan.id].USD;

            return (
              <ScrollReveal key={plan.id} delay={index + 1} variant={index === 0 ? 'left' : index === 2 ? 'right' : 'up'}>
                <div className={`relative group ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}>
                  <div className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${plan.popular ? 'opacity-20' : ''}`} />

                  <div className={`relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border transition-all duration-500 h-full flex flex-col ${
                    plan.popular ? 'border-ping/30 shadow-xl shadow-ping/5 ring-2 ring-ping/10' : 'border-white/80 shadow-lg hover:shadow-xl'
                  }`}>
                    {plan.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-to-r from-ping to-ping-dark text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex items-center gap-1 mb-1">
                      {renderStars(plan.stars)}
                    </div>

                    <h3 className="text-xl font-display font-bold text-gray-900 mt-1">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-4">{plan.description}</p>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                        {SYMBOL}{displayPrice}
                      </span>
                      <span className="text-gray-400 text-sm">/month</span>
                    </div>

                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className="bg-ping-lighter rounded-full p-0.5 mr-3 mt-0.5 flex-shrink-0">
                            <Check className="h-3.5 w-3.5 text-ping" />
                          </div>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => openCheckout(plan.id)}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm ${
                        plan.popular
                          ? 'bg-gradient-to-r from-ping to-ping-dark text-white hover:shadow-xl hover:shadow-ping/25 hover:-translate-y-0.5'
                          : 'bg-gray-50 text-gray-900 border border-gray-200 hover:border-ping/30 hover:bg-ping-lighter/50 hover:-translate-y-0.5'
                      }`}
                    >
                      Subscribe - {SYMBOL}{displayPrice}/mo
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={4}>
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              All plans include a 7-day free trial. Cancel anytime. Prices may vary by region.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {checkoutPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative">
            <button onClick={closeCheckout} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ping-light to-ping flex items-center justify-center mx-auto mb-3 shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900">
                Subscribe to {plans.find(p => p.id === checkoutPlan)?.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {SYMBOL}{DISPLAY_PRICES[checkoutPlan]?.[currency] || DISPLAY_PRICES[checkoutPlan]?.USD}/mo — monthly autopay
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-3.5 h-3.5 inline mr-1" />
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={checkoutPhone}
                  onChange={e => setCheckoutPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-ping to-ping-dark text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-ping/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? 'Processing...' : `Start Autopay - ${SYMBOL}${DISPLAY_PRICES[checkoutPlan]?.[currency] || DISPLAY_PRICES[checkoutPlan]?.USD}/mo`}
              </button>

              <p className="text-xs text-gray-400 text-center">
                You'll be redirected to Razorpay's secure checkout to authorize monthly payments.
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
