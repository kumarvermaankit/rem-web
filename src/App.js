import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
    <Router>
      <div className="min-h-screen bg-white font-body">
        <Navbar />
        <HashScroll />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subscribe" element={<HomePage scrollToPricing />} />
          <Route path="/pricing" element={<HomePage scrollToPricing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
