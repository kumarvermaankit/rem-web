import React, { useState, useEffect } from 'react';
import { Check, Star, Sparkles, MessageCircle, ArrowUpRight, X, Phone, User, MapPin, ShieldCheck, CreditCard, Gift } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const SYMBOL_MAP = { USD: '$', INR: '₹', GBP: '£', EUR: '€', AUD: 'A$', CAD: 'C$' };

const DISPLAY_PRICES = {
  helper:    { USD: 0.99, INR: 69, GBP: 0.79, EUR: 0.89, AUD: 1.49, CAD: 1.29 },
  assistant: { USD: 1.29, INR: 89, GBP: 0.99, EUR: 1.19, AUD: 1.99, CAD: 1.79 },
  manager:   { USD: 1.99, INR: 109, GBP: 1.49, EUR: 1.79, AUD: 2.99, CAD: 2.69 },
};

const COUNTRY_OPTIONS = [
  { code: 'IN', label: 'India' },
  { code: 'US', label: 'United States' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'AU', label: 'Australia' },
  { code: 'CA', label: 'Canada' },
  { code: 'DE', label: 'Germany' },
  { code: 'FR', label: 'France' },
  { code: 'SG', label: 'Singapore' },
  { code: 'AE', label: 'UAE' },
];

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

const WHATSAPP_URL = 'https://wa.me/918076569811?text=Hi%20Ping';
const TRIAL_DAYS = 5;
const API_BASE = process.env.REACT_APP_API_BASE;

const getCountry = () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const region = timezone.split('/')[0];
    const map = { Asia: 'IN', Europe: 'GB', America: 'US', Australia: 'AU', Pacific: 'AU', Africa: 'GB' };
    return map[region] || 'IN';
  } catch { return 'IN'; }
};

const getCurrency = (country) => {
  const map = { US: 'USD', IN: 'INR', GB: 'GBP', UK: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', AU: 'AUD', CA: 'CAD', SG: 'USD', AE: 'USD' };
  return map[country] || 'USD';
};

const renderStars = (count) => {
  return Array.from({ length: 3 }, (_, i) => (
    <Star key={i} className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
  ));
};

const Pricing = () => {
  const [country, setCountry] = useState('IN');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // checkout wizard
  const [step, setStep] = useState(null); // null | 'form' | 'options' | 'done'
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', country: 'IN' });
  const [userStatus, setUserStatus] = useState(null);
  const [doneMeta, setDoneMeta] = useState(null); // { mode, shortUrl?, trialEndsAt? }

  const currency = getCurrency(country);
  const SYMBOL = SYMBOL_MAP[currency] || currency;
  const showCountryName = COUNTRY_OPTIONS.find((c) => c.code === country)?.label || country;
  const planName = plans.find((p) => p.id === checkoutPlan)?.name;
  const displayPrice = checkoutPlan
    ? (DISPLAY_PRICES[checkoutPlan]?.[currency] || DISPLAY_PRICES[checkoutPlan]?.USD)
    : 0;

  useEffect(() => {
    const detected = getCountry();
    setCountry(detected);
    setForm((f) => ({ ...f, country: detected }));
  }, []);

  const openCheckout = (planId) => {
    setCheckoutPlan(planId);
    setStep('form');
    setError('');
    setUserStatus(null);
    setDoneMeta(null);
    setSubmitting(false);
  };

  const closeCheckout = () => {
    setStep(null);
    setCheckoutPlan(null);
    setSubmitting(false);
    setError('');
    setUserStatus(null);
    setDoneMeta(null);
  };

  const updateForm = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key === 'country') setCountry(value);
  };

  const handleIdentify = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.country) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/razorpay/find-or-create-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          country: form.country,
          location: form.country,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Could not identify user.');
        setSubmitting(false);
        return;
      }
      setUserStatus(data);
      setStep('options');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const ensureCustomer = async () => {
    const custRes = await fetch(`${API_BASE}/razorpay/create-customer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userStatus.userId,
        name: form.name.trim(),
        contact: form.phone.trim(),
      }),
    });
    const custData = await custRes.json();
    if (!custData.success) {
      throw new Error(custData.error || 'Failed to create customer');
    }
    return custData.customerId;
  };

  const createAutopayLink = async (withTrial) => {
    const customerId = await ensureCustomer();
    const payload = {
      planId: checkoutPlan,
      userId: userStatus.userId,
      customerId,
      interval: 'monthly',
      country: form.country,
      contact: form.phone.trim(),
    };
    if (withTrial) payload.trialDays = TRIAL_DAYS;

    const linkRes = await fetch(`${API_BASE}/razorpay/create-subscription-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const linkData = await linkRes.json();
    if (!linkData.success) {
      throw new Error(linkData.error || 'Failed to create subscription');
    }
    return linkData;
  };

  const handleStartTrialOnly = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/razorpay/start-trial`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userStatus.userId,
          planId: checkoutPlan,
          trialDays: TRIAL_DAYS,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Could not start trial.');
        setSubmitting(false);
        return;
      }
      setDoneMeta({
        mode: 'trial',
        trialEndsAt: data.trialEndsAt,
        whatsappUrl: data.whatsappUrl || WHATSAPP_URL,
      });
      setStep('done');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartTrialWithAutopay = async () => {
    setSubmitting(true);
    setError('');
    try {
      const linkData = await createAutopayLink(true);
      setDoneMeta({
        mode: 'trial_autopay',
        shortUrl: linkData.shortUrl,
        trialEndsAt: null,
        whatsappUrl: linkData.whatsappUrl || WHATSAPP_URL,
      });
      setStep('done');
    } catch (err) {
      setError(err.message || 'Failed to set up trial + autopay.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAutopayOnly = async () => {
    setSubmitting(true);
    setError('');
    try {
      const linkData = await createAutopayLink(false);
      setDoneMeta({
        mode: 'autopay',
        shortUrl: linkData.shortUrl,
        whatsappUrl: linkData.whatsappUrl || WHATSAPP_URL,
      });
      setStep('done');
    } catch (err) {
      setError(err.message || 'Failed to set up autopay.');
    } finally {
      setSubmitting(false);
    }
  };

  const statusBanner = () => {
    if (!userStatus) return null;
    if (userStatus.isOnTrial) {
      return `You're on a free trial${userStatus.daysRemaining?.trial ? ` (${userStatus.daysRemaining.trial}d left)` : ''}. Set up autopay so Ping keeps working after trial.`;
    }
    if (userStatus.trialEligible) {
      return userStatus.isNewUser
        ? `Welcome! Start your ${TRIAL_DAYS}-day free trial, with or without autopay.`
        : `You're eligible for a ${TRIAL_DAYS}-day free trial.`;
    }
    if (userStatus.hasActiveAccess && userStatus.hasAutopay) {
      return 'Your plan is active. You can chat with Ping anytime.';
    }
    return 'Your free trial has ended. Set up autopay to keep using Ping.';
  };

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
            const price = DISPLAY_PRICES[plan.id][currency] || DISPLAY_PRICES[plan.id].USD;

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
                        {SYMBOL}{price}
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
                      Start free trial
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-gray-400 text-center mt-2">
                      or subscribe · {SYMBOL}{price}/mo
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={4}>
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              All plans include a {TRIAL_DAYS}-day free trial. Cancel anytime. Prices may vary by region.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {step && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={closeCheckout} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ping-light to-ping flex items-center justify-center mx-auto mb-3 shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900">
                {step === 'done' ? 'You\'re all set' : `${planName} plan`}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {SYMBOL}{displayPrice}/mo
                {step === 'form' && ' — tell us who you are'}
                {step === 'options' && ' — choose how to continue'}
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 text-red-600 text-sm px-3 py-2 border border-red-100">
                {error}
              </div>
            )}

            {step === 'form' && (
              <form onSubmit={handleIdentify} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="w-3.5 h-3.5 inline mr-1" />
                    Full name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-3.5 h-3.5 inline mr-1" />
                    WhatsApp number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-3.5 h-3.5 inline mr-1" />
                    Location
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => updateForm('country', e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none transition-all bg-white"
                  >
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-ping to-ping-dark text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-ping/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {submitting ? 'Checking...' : 'Continue'}
                </button>
              </form>
            )}

            {step === 'options' && userStatus && (
              <div className="space-y-4">
                <div className="rounded-xl bg-ping-lighter/60 border border-ping/10 px-3 py-2.5 text-sm text-gray-600">
                  {statusBanner()}
                </div>

                {userStatus.trialEligible && (
                  <>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={handleStartTrialOnly}
                      className="w-full bg-gradient-to-r from-ping to-ping-dark text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-ping/25 disabled:opacity-50 transition-all inline-flex items-center justify-center gap-2"
                    >
                      <Gift className="w-4 h-4" />
                      {submitting ? 'Starting...' : `Start ${TRIAL_DAYS}-day free trial`}
                    </button>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={handleStartTrialWithAutopay}
                      className="w-full bg-white text-gray-900 border border-gray-200 py-3 rounded-xl font-semibold hover:border-ping/30 hover:bg-ping-lighter/40 disabled:opacity-50 transition-all inline-flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-ping" />
                      Trial + set up autopay
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      Autopay starts after the {TRIAL_DAYS}-day trial. Cancel anytime.
                    </p>
                  </>
                )}

                {!userStatus.trialEligible && !(userStatus.hasActiveAccess && userStatus.hasAutopay) && (
                  <>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={handleAutopayOnly}
                      className="w-full bg-gradient-to-r from-ping to-ping-dark text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-ping/25 disabled:opacity-50 transition-all inline-flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      {submitting ? 'Creating link...' : `Set up autopay — ${SYMBOL}${displayPrice}/mo`}
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      You'll authorize a secure Razorpay mandate for monthly billing.
                    </p>
                  </>
                )}

                {(userStatus.hasActiveAccess || userStatus.isOnTrial) && (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-ping" />
                    Talk to Ping on WhatsApp
                  </a>
                )}
              </div>
            )}

            {step === 'done' && doneMeta && (
              <div className="space-y-4 text-center">
                {doneMeta.mode === 'trial' && (
                  <p className="text-sm text-gray-600">
                    Your {TRIAL_DAYS}-day free trial is live. Message Ping on WhatsApp to get started.
                  </p>
                )}
                {(doneMeta.mode === 'trial_autopay' || doneMeta.mode === 'autopay') && (
                  <p className="text-sm text-gray-600">
                    {doneMeta.mode === 'trial_autopay'
                      ? `Trial started. Complete autopay authorization so billing begins after ${TRIAL_DAYS} days.`
                      : 'Complete autopay authorization on Razorpay, then chat with Ping.'}
                  </p>
                )}

                {doneMeta.shortUrl && (
                  <a
                    href={doneMeta.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-ping to-ping-dark text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-ping/25 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Complete autopay on Razorpay
                  </a>
                )}

                <a
                  href={doneMeta.whatsappUrl || WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-all inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Talk to Ping on WhatsApp
                </a>

                <button
                  type="button"
                  onClick={closeCheckout}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
