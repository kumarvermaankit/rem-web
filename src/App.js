import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import DataDeletion from './components/DataDeletion';
import NotFound from './components/NotFound';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GoogleCallback from './pages/GoogleCallback';
import WhatsAppReminder from './pages/WhatsAppReminder';
import WhatsAppAssistant from './pages/WhatsAppAssistant';
import ReminderBot from './pages/ReminderBot';
import PersonalAssistant from './pages/PersonalAssistant';
import HowToSetReminders from './pages/HowToSetReminders';
import WhatsAppTodoList from './pages/WhatsAppTodoList';
import WhatsAppReminderApp from './pages/WhatsAppReminderApp';
import WhatsAppNotes from './pages/WhatsAppNotes';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-ping border-t-transparent rounded-full" />
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
}

function HomePage({ scrollToPricing = false }) {
  useEffect(() => {
    if (!scrollToPricing) return;
    const t = setTimeout(() => {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => clearTimeout(t);
  }, [scrollToPricing]);

  return (
    <>
      <Helmet>
        <title>Ping - Free WhatsApp Assistant for Reminders, Lists & Notes</title>
        <meta name="description" content="Meet Ping — your intelligent WhatsApp assistant. Set reminders, manage to-do lists, save notes, check stock prices and cricket scores. No app to install, no sign-up needed." />
      </Helmet>
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
}

function HashScroll() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === '#pricing') {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white font-body">
          <Navbar />
          <HashScroll />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/subscribe" element={<HomePage scrollToPricing />} />
            <Route path="/pricing" element={<HomePage scrollToPricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<GoogleCallback />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/data-deletion" element={<DataDeletion />} />
            <Route path="/whatsapp-reminder" element={<WhatsAppReminder />} />
            <Route path="/whatsapp-assistant" element={<WhatsAppAssistant />} />
            <Route path="/reminder-bot" element={<ReminderBot />} />
            <Route path="/personal-assistant" element={<PersonalAssistant />} />
            <Route path="/how-to-set-reminders-on-whatsapp" element={<HowToSetReminders />} />
            <Route path="/whatsapp-to-do-list" element={<WhatsAppTodoList />} />
            <Route path="/whatsapp-reminder-app" element={<WhatsAppReminderApp />} />
            <Route path="/whatsapp-notes" element={<WhatsAppNotes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
