import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, StickyNote, KeyRound, CreditCard, Plus, Trash2, Eye, EyeOff,
  LogOut, Calendar, CheckCircle2, Circle, Loader2, AlertCircle, RefreshCw,
  ShieldCheck, User, Settings,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiGet, apiPost, apiDelete } from '../api';
import BottomNav from '../components/BottomNav';
import SlideUpModal from '../components/SlideUpModal';
import FloatingActionButton from '../components/FloatingActionButton';

const TABS = [
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'notes', label: 'Notes', icon: StickyNote },
  { id: 'passwords', label: 'Passwords', icon: KeyRound },
  { id: 'subscription', label: 'Plans', icon: CreditCard },
  { id: 'profile', label: 'Profile', icon: User },
];

const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString(undefined, {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

const Dashboard = () => {
  const { user, logout, fetchMe, openAuth } = useAuth();
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
    const reminderDate = remDate ? new Date(remDate).toISOString() : undefined;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const d = await apiPost('/dashboard/reminders', {
      title: remTitle, description: remDesc, reminderDate, timezone,
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

  const getFabLabel = () => {
    switch (tab) {
      case 'reminders': return 'New reminder';
      case 'notes': return 'New note';
      case 'passwords': return 'Add password';
      default: return 'Add';
    }
  };

  const renderReminderForm = () => (
    <form onSubmit={addReminder} className="space-y-4">
      <input
        required
        value={remTitle}
        onChange={(e) => setRemTitle(e.target.value)}
        placeholder="Reminder title, e.g. Call the dentist"
        className="input-field"
      />
      <input
        value={remDesc}
        onChange={(e) => setRemDesc(e.target.value)}
        placeholder="Description (optional)"
        className="input-field"
      />
      <input
        type="datetime-local"
        value={remDate}
        onChange={(e) => setRemDate(e.target.value)}
        className="input-field"
      />
      <p className="text-xs text-gray-400 -mt-2">
        Time is in your timezone ({Intl.DateTimeFormat().resolvedOptions().timeZone})
      </p>
      <div className="flex gap-3">
        <button type="submit" className="btn-ghost flex-1">Create</button>
        <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
      </div>
    </form>
  );

  const renderNoteForm = () => (
    <form onSubmit={addNote} className="space-y-4">
      <input
        required
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Note title"
        className="input-field"
      />
      <textarea
        required
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Write your note..."
        rows={4}
        className="input-field resize-none"
      />
      <div className="flex gap-3">
        <button type="submit" className="btn-ghost flex-1">Save</button>
        <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
      </div>
    </form>
  );

  const renderPasswordForm = () => (
    <form onSubmit={addPassword} className="space-y-4">
      <input
        required
        value={pwService}
        onChange={(e) => setPwService(e.target.value)}
        placeholder="Service, e.g. Gmail"
        className="input-field"
      />
      <input
        value={pwUsername}
        onChange={(e) => setPwUsername(e.target.value)}
        placeholder="Username / email (optional)"
        className="input-field"
      />
      <input
        required
        value={pwValue}
        onChange={(e) => setPwValue(e.target.value)}
        placeholder="Password"
        type="text"
        className="input-field"
      />
      <input
        value={pwUrl}
        onChange={(e) => setPwUrl(e.target.value)}
        placeholder="URL (optional)"
        className="input-field"
      />
      <div className="flex gap-3">
        <button type="submit" className="btn-ghost flex-1">Save</button>
        <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
      </div>
    </form>
  );

  const renderForm = () => {
    switch (tab) {
      case 'reminders': return renderReminderForm();
      case 'notes': return renderNoteForm();
      case 'passwords': return renderPasswordForm();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl font-bold text-gray-900">Hi, {user?.name || 'there'} 👋</h1>
            <PlanBadge hasActiveAccess={subscription?.isPremium || user?.hasActiveAccess} isOnTrial={user?.isOnTrial} plan={user?.plan || 'free'} />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadTab}
              className="p-2.5 rounded-xl text-gray-400 hover:text-ping hover:bg-gray-100 transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Trial notice */}
        {user?.isOnTrial && user?.trialEndsAt && (
          <div className="mb-4 bg-violet-50 border border-violet-200 text-violet-800 rounded-xl px-4 py-3 text-sm">
            Free trial ends {formatDate(user.trialEndsAt)}
          </div>
        )}

        {/* Profile incomplete warning */}
        {user && (!user.phone || !user.name) && (
          <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm flex flex-wrap items-center justify-between gap-3">
            <span>Add your WhatsApp number to complete your profile.</span>
            <button
              onClick={() => openAuth('profile', null, true)}
              className="px-4 py-1.5 bg-amber-600 text-white text-sm font-semibold rounded-lg hover:bg-amber-700"
            >
              Complete profile
            </button>
          </div>
        )}

        {/* Encryption notice */}
        <div className="mb-6 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span>Everything you store is encrypted. Privacy is our priority.</span>
        </div>

        {/* Flash messages */}
        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 text-red-700 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}
        {success && (
          <div className="mb-4 flex items-center gap-2 bg-green-50 text-green-700 rounded-xl px-4 py-3 text-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0" /> {success}
          </div>
        )}

        {/* Desktop Tabs */}
        <div className="hidden lg:flex gap-1 mb-6 bg-gray-100 rounded-xl p-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => switchTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === id ? 'bg-white text-ping shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 text-ping animate-spin" />
          </div>
        )}

        {/* Reminders Tab */}
        {!loading && tab === 'reminders' && (
          <div className="space-y-3">
            {/* Desktop add button */}
            <button
              onClick={() => setShowForm(true)}
              className="hidden lg:flex w-full items-center justify-center gap-2 border-2 border-dashed border-ping/30 text-ping hover:bg-ping/5 rounded-xl py-4 text-sm font-semibold transition-colors"
            >
              <Plus className="h-4 w-4" /> New reminder
            </button>

            {reminders.length === 0 ? (
              <div className="text-center py-16">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No reminders yet</p>
                <p className="text-gray-300 text-xs mt-1">Tap + to create one</p>
              </div>
            ) : (
              reminders.map((r) => (
                <div key={r.id} className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 ${r.isCompleted ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {r.isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-ping mt-0.5 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold text-gray-900 truncate ${r.isCompleted ? 'line-through' : ''}`}>{r.title}</p>
                        {r.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{r.description}</p>}
                        <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                          <Calendar className="h-3.5 w-3.5" /> {formatDate(r.reminderDate)}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => deleteReminder(r.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors" aria-label="Delete reminder">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Notes Tab */}
        {!loading && tab === 'notes' && (
          <div className="space-y-3">
            <button
              onClick={() => setShowForm(true)}
              className="hidden lg:flex w-full items-center justify-center gap-2 border-2 border-dashed border-ping/30 text-ping hover:bg-ping/5 rounded-xl py-4 text-sm font-semibold transition-colors"
            >
              <Plus className="h-4 w-4" /> New note
            </button>

            {notes.length === 0 ? (
              <div className="text-center py-16">
                <StickyNote className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No notes yet</p>
                <p className="text-gray-300 text-xs mt-1">Tap + to create one</p>
              </div>
            ) : (
              notes.map((n) => (
                <div key={n.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-3 whitespace-pre-wrap">{n.content}</p>
                      {n.category && (
                        <span className="inline-block mt-2 text-[11px] font-medium bg-ping-lighter text-ping px-2 py-0.5 rounded-full">
                          {n.category}
                        </span>
                      )}
                    </div>
                    <button onClick={() => deleteNote(n.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors" aria-label="Delete note">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Passwords Tab */}
        {!loading && tab === 'passwords' && (
          <div className="space-y-3">
            <button
              onClick={() => setShowForm(true)}
              className="hidden lg:flex w-full items-center justify-center gap-2 border-2 border-dashed border-ping/30 text-ping hover:bg-ping/5 rounded-xl py-4 text-sm font-semibold transition-colors"
            >
              <Plus className="h-4 w-4" /> Add password
            </button>

            {passwords.length === 0 ? (
              <div className="text-center py-16">
                <KeyRound className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No passwords saved</p>
                <p className="text-gray-300 text-xs mt-1">Tap + to add one</p>
              </div>
            ) : (
              passwords.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{p.service}</p>
                      {p.username && <p className="text-xs text-gray-500 mt-0.5 truncate">{p.username}</p>}
                      <p className="text-xs font-mono text-gray-400 mt-1 truncate">
                        {revealedIds[p.id] || '••••••••'}
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
                </div>
              ))
            )}
          </div>
        )}

        {/* Subscription Tab */}
        {!loading && tab === 'subscription' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Current plan</p>
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

              <div className="flex flex-wrap items-center gap-3 mt-5">
                {subscription?.hasAutopay ? (
                  <>
                    <a href="/subscribe" className="btn-ghost">Change subscription</a>
                    <button
                      onClick={cancelSub}
                      disabled={cancelling}
                      className="px-4 py-2.5 border border-red-200 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-50 disabled:opacity-60 transition-colors"
                    >
                      {cancelling ? 'Cancelling...' : 'Cancel'}
                    </button>
                  </>
                ) : (
                  <a href="/subscribe" className="btn-ghost">
                    {subscription?.isPremium || user?.hasActiveAccess ? 'Change plan' : 'Start subscription'}
                  </a>
                )}
              </div>
            </div>

            {payments.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <p className="text-sm font-semibold text-gray-900 mb-3">Payment history</p>
                <div className="space-y-2">
                  {payments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                      <span className="text-gray-600 capitalize">{p.status.replace(/_/g, ' ')}</span>
                      <span className="text-gray-400 text-xs">{formatDate(p.createdAt)}</span>
                      <span className="font-semibold text-gray-900">₹{p.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {!loading && tab === 'profile' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-ping/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-ping" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-gray-900">{user?.name || 'User'}</h2>
                  <p className="text-sm text-gray-500">{user?.email || user?.phone}</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => openAuth('profile', null, true)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <Settings className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Edit profile</p>
                    <p className="text-xs text-gray-500">Update your name and phone number</p>
                  </div>
                </button>

                <a
                  href="/subscribe"
                  className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Manage subscription</p>
                    <p className="text-xs text-gray-500">View plans and payment history</p>
                  </div>
                </a>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-red-600">Log out</p>
                    <p className="text-xs text-gray-500">Sign out of your account</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={tab} onTabChange={switchTab} />

      {/* Mobile FAB */}
      {(tab === 'reminders' || tab === 'notes' || tab === 'passwords') && (
        <FloatingActionButton onClick={() => setShowForm(true)} label={getFabLabel()} />
      )}

      {/* Mobile Form Modal */}
      <SlideUpModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={getFabLabel()}
      >
        {renderForm()}
      </SlideUpModal>
    </div>
  );
};

export default Dashboard;
