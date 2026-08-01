import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Data Deletion', href: '/data-deletion' },
  ];

  const guideLinks = [
    { name: 'WhatsApp Reminder', href: '/whatsapp-reminder' },
    { name: 'WhatsApp Assistant', href: '/whatsapp-assistant' },
    { name: 'Reminder Bot', href: '/reminder-bot' },
    { name: 'Personal Assistant', href: '/personal-assistant' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-ping/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-ping/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Ping" className="h-8 brightness-0 invert" />
              <span className="font-display font-bold text-lg text-white">Ping</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your intelligent WhatsApp assistant. Reminders, to-do lists, notes, and live data — all through chat. No app to install, no account to create.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://wa.me/918076569811"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-ping/20 transition-all duration-300 group"
                aria-label="Message Ping on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 text-gray-400 group-hover:text-ping transition-colors" />
              </a>
              <a
                href="mailto:heypingchat@gmail.com"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-ping/20 transition-all duration-300 group"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 text-gray-400 group-hover:text-ping transition-colors" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Guides</h4>
            <ul className="space-y-3">
              {guideLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Talk to Ping</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://wa.me/918076569811" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Message on WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:heypingchat@gmail.com" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Ping. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-300 group"
          >
            Back to top
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
