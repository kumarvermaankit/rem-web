import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, StickyNote, KeyRound, CreditCard, Plus, Trash2, Eye, EyeOff,
  LogOut, Calendar, CheckCircle2, Circle, Loader2, AlertCircle, RefreshCw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiGet, apiPost, apiDelete } from '../api';

const TABS = [
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'notes', label: 'Notes', icon: StickyNote },
  { id: 'passwords', label: 'Passwords', icon: KeyRound },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
];

const dateInputValue = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString(undefined, {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

const Dashboard = () => {
  const { user, logout, fetchMe } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('reminders');

  const [reminders, setReminders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [passwords, setPasswords] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [revealedIds, setRevealedIds] = useState({});

  const flash = (msg, isError = false) => {
    if (isError) setError(msg);
    else setSuccess(msg);
    setTimeout(() => { setError(''); setSuccess(''); }, 3000);
  };

  const loadTab = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      if (tab === 'reminders') {
        const d = await apiGet('/dashboard/reminders');
        if (d.success) setReminders(d.reminders || []);
      } else if (tab === 'notes') {
        const d = await apiGet('/dashboard/notes');
        if (d.success) setNotes(d.notes || []);
      } else if (tab === 'passwords') {
        const d = await apiGet('/dashboard/passwords');
        if (d.success) setPasswords(d.passwords || []);
      } else if (tab === 'subscription') {
        const d = await apiGet('/dashboard/subscription');
        if (d.success) { setSubscription(d.subscription); setPayments(d.payments || []); }
      }
    } catch {
      flash('Failed to load data', true);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => { loadTab(); }, [loadTab]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const PlanBadge = ({ hasActiveAccess, isOnTrial, plan }) => {
    if (isOnTrial) return <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-2.5 py-1 rounded-full">Trial</span>;
    if (hasActiveAccess && plan !== 'free') return <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">{plan[0].toUpperCase() + plan.slice(1)}</span>;
    return <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">Free</span>;
  };

  // ── Reminders ──
  const [remTitle, setRemTitle] = useState('');
  const [remDesc, setRemDesc] = useState('');
  const [remDate, setRemDate] = useState('');

  const addReminder = async (e) => {
    e.preventDefault();
    const d = await apiPost('/dashboard/reminders', {
      title: remTitle, description: remDesc, reminderDate: remDate || undefined,
    });
    if (d.success) {
      setRemTitle(''); setRemDesc(''); setRemDate(''); setShowForm(false);
      flash('Reminder created');
      loadTab();
    } else flash(d.error || 'Failed to create reminder', true);
  };

  const deleteReminder = async (id) => {
    const d = await apiDelete(`/dashboard/reminders/${id}`);
    if (d.success) { flash('Reminder deleted'); loadTab(); }
    else flash(d.error || 'Failed to delete', true);
  };

  // ── Notes ──
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const addNote = async (e) => {
    e.preventDefault();
    const d = await apiPost('/dashboard/notes', { title: noteTitle, content: noteContent });
    if (d.success) {
      setNoteTitle(''); setNoteContent(''); setShowForm(false);
      flash('Note saved');
      loadTab();
    } else flash(d.error || 'Failed to save note', true);
  };

  const deleteNote = async (id) => {
    const d = await apiDelete(`/dashboard/notes/${id}`);
    if (d.success) { flash('Note deleted'); loadTab(); }
    else flash(d.error || 'Failed to delete', true);
  };

  // ── Passwords ──
  const [pwService, setPwService] = useState('');
  const [pwUsername, setPwUsername] = useState('');
  const [pwValue, setPwValue] = useState('');
  const [pwUrl, setPwUrl] = useState('');

  const addPassword = async (e) => {
    e.preventDefault();
    const d = await apiPost('/dashboard/passwords', {
      service: pwService, username: pwUsername, password: pwValue, url: pwUrl,
    });
    if (d.success) {
      setPwService(''); setPwUsername(''); setPwValue(''); setPwUrl(''); setShowForm(false);
      flash('Password saved');
      loadTab();
    } else flash(d.error || 'Failed to save password', true);
  };

  const revealPassword = async (id) => {
    if (revealedIds[id]) {
      setRevealedIds((r) => ({ ...r, [id]: false }));
      return;
    }
    const d = await apiGet(`/dashboard/passwords/${id}`);
    if (d.success) {
      setRevealedIds((r) => ({ ...r, [id]: d.password.encryptedPassword }));
    } else flash(d.error || 'Password not found', true);
  };

  const deletePassword = async (id) => {
    const d = await apiDelete(`/dashboard/passwords/${id}`);
    if (d.success) { flash('Password deleted'); loadTab(); }
    else flash(d.error || 'Failed to delete', true);
  };

  // ── Subscription ──
  const [cancelling, setCancelling] = useState(false);
  const cancelSub = async () => {
    if (!window.confirm('Cancel your subscription? You will lose premium access when the current period ends.')) return;
    setCancelling(true);
    const d = await apiPost('/dashboard/subscription/cancel', {});
    setCancelling(false);
    if (d.success) { flash('Subscription cancelled'); fetchMe(); loadTab(); }
    else flash(d.error || 'Failed to cancel', true);
  };

  const switchTab = (t) => {
    setTab(t);
    setShowForm(false);
    setRevealedIds({});
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-ping-lighter/40 via-white to-white px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900">Hi, {user?.name || 'there'} 👋</h1>
            <div className="flex items-center gap-2 mt-2">
              <PlanBadge hasActiveAccess={subscription?.isPremium || user?.hasActiveAccess} isOnTrial={user?.isOnTrial} plan={user?.plan || 'free'} />
              {user?.isOnTrial && user?.trialEndsAt && (
                <span className="text-xs text-gray-500">Trial ends {formatDate(user.trialEndsAt)}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadTab}
              className="p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:text-ping hover:border-ping transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 transition-colors text-sm font-medium"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 bg-red-50 text-red-700 rounded-lg px-4 py-3 text-sm">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" /> <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 flex items-start gap-2 bg-green-50 text-green-700 rounded-lg px-4 py-3 text-sm">
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" /> <span>{success}</span>
          </div>
        )}

        <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => switchTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                tab === id ? 'bg-white text-ping shadow' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 text-ping animate-spin" />
          </div>
        )}

        {!loading && tab === 'reminders' && (
          <div className="space-y-3">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-ping/40 text-ping hover:bg-ping-lighter/50 rounded-xl py-3.5 text-sm font-semibold transition-colors"
              >
                <Plus className="h-4 w-4" /> New reminder
              </button>
            )}
            {showForm && (
              <form onSubmit={addReminder} className="bg-white rounded-xl border border-gray-100 shadow p-4 space-y-3">
                <input
                  required
                  value={remTitle}
                  onChange={(e) => setRemTitle(e.target.value)}
                  placeholder="Reminder title, e.g. Call the dentist"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
                <input
                  value={remDesc}
                  onChange={(e) => setRemDesc(e.target.value)}
                  placeholder="Description (optional)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
                <input
                  type="datetime-local"
                  value={remDate}
                  onChange={(e) => setRemDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-ping text-white text-sm font-semibold rounded-lg hover:bg-ping-dark">Create</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">Cancel</button>
                </div>
              </form>
            )}
            {reminders.length === 0 && !showForm ? (
              <p className="text-center text-gray-400 text-sm py-10">No reminders yet.</p>
            ) : (
              reminders.map((r) => (
                <div key={r.id} className={`flex items-start justify-between gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 ${r.isCompleted ? 'opacity-60' : ''}`}>
                  <div className="flex items-start gap-3">
                    {r.isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-ping mt-0.5 shrink-0" />
                    )}
                    <div>
                      <p className={`text-sm font-semibold text-gray-800 ${r.isCompleted ? 'line-through' : ''}`}>{r.title}</p>
                      {r.description && <p className="text-xs text-gray-500 mt-0.5">{r.description}</p>}
                      <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-1.5">
                        <Calendar className="h-3.5 w-3.5" /> {formatDate(r.reminderDate)}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => deleteReminder(r.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors" aria-label="Delete reminder">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {!loading && tab === 'notes' && (
          <div className="space-y-3">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-ping/40 text-ping hover:bg-ping-lighter/50 rounded-xl py-3.5 text-sm font-semibold transition-colors"
              >
                <Plus className="h-4 w-4" /> New note
              </button>
            )}
            {showForm && (
              <form onSubmit={addNote} className="bg-white rounded-xl border border-gray-100 shadow p-4 space-y-3">
                <input
                  required
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Note title"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
                <textarea
                  required
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Write your note…"
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm resize-none"
                />
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-ping text-white text-sm font-semibold rounded-lg hover:bg-ping-dark">Save</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">Cancel</button>
                </div>
              </form>
            )}
            {notes.length === 0 && !showForm ? (
              <p className="text-center text-gray-400 text-sm py-10">No notes yet.</p>
            ) : (
              notes.map((n) => (
                <div key={n.id} className="flex items-start justify-between gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap break-words">{n.content}</p>
                    {n.category && <span className="inline-block mt-2 text-[11px] font-medium bg-ping-lighter text-ping px-2 py-0.5 rounded-full">{n.category}</span>}
                  </div>
                  <button onClick={() => deleteNote(n.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors" aria-label="Delete note">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {!loading && tab === 'passwords' && (
          <div className="space-y-3">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-ping/40 text-ping hover:bg-ping-lighter/50 rounded-xl py-3.5 text-sm font-semibold transition-colors"
              >
                <Plus className="h-4 w-4" /> Add password
              </button>
            )}
            {showForm && (
              <form onSubmit={addPassword} className="bg-white rounded-xl border border-gray-100 shadow p-4 space-y-3">
                <input
                  required
                  value={pwService}
                  onChange={(e) => setPwService(e.target.value)}
                  placeholder="Service, e.g. Gmail"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
                <input
                  value={pwUsername}
                  onChange={(e) => setPwUsername(e.target.value)}
                  placeholder="Username / email (optional)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
                <input
                  required
                  value={pwValue}
                  onChange={(e) => setPwValue(e.target.value)}
                  placeholder="Password"
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
                <input
                  value={pwUrl}
                  onChange={(e) => setPwUrl(e.target.value)}
                  placeholder="URL (optional)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-ping focus:ring-2 focus:ring-ping/20 outline-none text-sm"
                />
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-ping text-white text-sm font-semibold rounded-lg hover:bg-ping-dark">Save</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">Cancel</button>
                </div>
              </form>
            )}
            {passwords.length === 0 && !showForm ? (
              <p className="text-center text-gray-400 text-sm py-10">No passwords saved.</p>
            ) : (
              passwords.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{p.service}</p>
                    {p.username && <p className="text-xs text-gray-500 mt-0.5">{p.username}</p>}
                    <p className="text-xs font-mono text-gray-400 mt-1">
                      {revealedIds[p.id] || p.encryptedPassword || '••••••••'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => revealPassword(p.id)} className="p-2 text-gray-400 hover:text-ping transition-colors" aria-label="Reveal password">
                      {revealedIds[p.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button onClick={() => deletePassword(p.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors" aria-label="Delete password">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {!loading && tab === 'subscription' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Current plan</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-display font-bold text-gray-900 capitalize">{subscription?.plan || user?.plan || 'free'}</span>
                    <PlanBadge hasActiveAccess={subscription?.isPremium} isOnTrial={!!subscription?.trialEndsAt} plan={subscription?.plan || 'free'} />
                  </div>
                </div>
                {subscription?.hasAutopay && (
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Razorpay status</p>
                    <p className={`text-sm font-semibold capitalize ${subscription?.razorpayStatus === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
                      {subscription?.razorpayStatus || 'unknown'}
                    </p>
                    {subscription?.currentEnd && (
                      <p className="text-xs text-gray-400 mt-0.5">Renews {formatDate(subscription.currentEnd)}</p>
                    )}
                  </div>
                )}
              </div>

              {subscription?.planExpiresAt && (
                <p className="text-xs text-gray-500 mt-3">Premium valid until {formatDate(subscription.planExpiresAt)}</p>
              )}
              {subscription?.trialEndsAt && (
                <p className="text-xs text-violet-600 mt-1">Free trial ends {formatDate(subscription.trialEndsAt)}</p>
              )}

              {subscription?.hasAutopay && (
                <button
                  onClick={cancelSub}
                  disabled={cancelling}
                  className="mt-5 px-4 py-2 border border-red-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 disabled:opacity-60"
                >
                  {cancelling ? 'Cancelling…' : 'Cancel subscription'}
                </button>
              )}
              {!subscription?.hasAutopay && (
                <a
                  href="/subscribe"
                  className="mt-5 inline-block px-4 py-2 bg-ping text-white text-sm font-semibold rounded-lg hover:bg-ping-dark"
                >
                  {subscription?.isPremium || user?.hasActiveAccess ? 'Manage plan' : 'Start subscription'}
                </a>
              )}
            </div>

            {payments.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <p className="text-sm font-semibold text-gray-800 mb-3">Payment history</p>
                <div className="space-y-2">
                  {payments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-sm border-b border-gray-50 pb-2 last:border-0">
                      <span className="text-gray-600 capitalize">{p.status.replace(/_/g, ' ')}</span>
                      <span className="text-gray-400 text-xs">{formatDate(p.createdAt)}</span>
                      <span className="font-semibold text-gray-800">₹{p.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
