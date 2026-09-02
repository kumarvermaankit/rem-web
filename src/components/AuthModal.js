import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, Phone, MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiPost } from '../api';
import { GOOGLE_AUTH_URL } from '../api';
import { COUNTRIES } from '../data/countries';

const getDetectedCountry = () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const region = timezone.split('/')[0];
    if (region === 'Asia') return 'IN';
    if (region === 'Europe') return 'GB';
    if (region === 'Australia') return 'AU';
    return 'US';
  } catch {
    return 'US';
  }
};

const AuthModal = () => {
  const { authModal, closeAuth, login, register } = useAuth();
  const [step, setStep] = useState('login');
  const [forced, setForced] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('US');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneConflict, setPhoneConflict] = useState(false);

  useEffect(() => {
    if (authModal) {
      setStep(authModal.mode || 'login');
      setForced(!!authModal.force);
      setCountry(getDetectedCountry());
      setError('');
      setPassword('');
      setLoading(false);
      setPhoneConflict(false);
    }
  }, [authModal]);

  if (!authModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    let data;
    if (step === 'login') {
      data = await login(email.trim(), password);
    } else if (step === 'register') {
      data = await register(name.trim(), email.trim(), password, phone.trim());
    }
    setLoading(false);
    if (!data || !data.success) {
      setError((data && data.error) || 'Something went wrong. Please try again.');
      return;
    }
    const u = data.user;
    if (!u?.phone || !u?.name) {
      setName(u?.name || '');
      setPhone(u?.phone || '');
      setForced(true);
      setStep('profile');
      return;
    }
    const onSuccess = authModal.onSuccess;
    closeAuth();
    if (onSuccess) onSuccess();
  };

  const submitProfile = async (force) => {
    setError('');
    const digits = phone.replace(/[^0-9]/g, '');
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!digits) {
      setError('Please enter your WhatsApp number with country code (e.g. 919876543210).');
      return;
    }
    setLoading(true);
    const data = await apiPost('/auth/profile', {
      name: name.trim(),
      phone: digits,
      country,
      force,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    setLoading(false);
    if (!data.success) {
      if (data.phoneConflict) {
        setPhoneConflict(true);
        return;
      }
      setError(data.error || 'Failed to save your details.');
      return;
    }
    const onSuccess = authModal.onSuccess;
    closeAuth();
    if (onSuccess) onSuccess();
  };

  const handleProfile = (e) => {
    e.preventDefault();
    submitProfile(false);
  };

  const switchStep = (s) => {
    setStep(s);
    setError('');
  };

  const title = step === 'login' ? 'Welcome back' : step === 'register' ? 'Create your account' : 'Tell us about you';
  const subtitle =
    step === 'login'
      ? 'Log in to subscribe or manage your Ping account'
      : step === 'register'
      ? 'Manage reminders, notes & passwords from one place'
      : 'Your name, WhatsApp number and location help us deliver reminders to you';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={forced ? undefined : closeAuth}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto py-8 px-8">
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-2 bg-red-50 text-red-700 rounded-lg px-4 py-3 text-sm">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {phoneConflict && (
          <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-800">
              This WhatsApp number already exists in our system.
              Would you like to attach it to this email?
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { setPhoneConflict(false); submitProfile(true); }}
                disabled={loading}
                className="px-3 py-1.5 bg-amber-600 text-white text-sm font-semibold rounded-lg hover:bg-amber-700 disabled:opacity-60"
              >
                {loading ? 'Attaching…' : 'Yes, attach this number'}
              </button>
              <button
                onClick={() => { setPhoneConflict(false); setPhone(''); }}
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Use a different number
              </button>
            </div>
          </div>
        )}

        {step !== 'profile' && (
          <>
            <a
              href={GOOGLE_AUTH_URL}
              className="w-full flex items-center justify-center gap-2.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg transition-colors mb-4"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z" />
              </svg>
              Continue with Google
            </a>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </>
        )}

        {step === 'profile' ? (
          <form onSubmit={handleProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                WhatsApp number <span className="text-gray-400 font-normal">(with country code)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={`${country === 'IN' ? '91' : '1'}9876543210`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm bg-white"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-ping hover:bg-ping-dark text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving…' : 'Continue'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
              </div>
            </div>

            {step === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  WhatsApp number <span className="text-gray-400 font-normal">(with country code)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="919876543210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  required
                  minLength={step === 'register' ? 6 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-ping hover:bg-ping-dark text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (step === 'login' ? 'Logging in…' : 'Creating account…') : step === 'login' ? 'Log in' : 'Create account'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        )}

        {step !== 'profile' && (
          <p className="text-center text-sm text-gray-500 mt-5">
            {step === 'login' ? (
              <>
                Don't have an account?{' '}
                <button onClick={() => switchStep('register')} className="text-ping font-medium hover:underline">
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => switchStep('login')} className="text-ping font-medium hover:underline">
                  Log in
                </button>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
