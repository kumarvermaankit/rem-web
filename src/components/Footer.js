import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Data Deletion', href: '/data-deletion' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="Ping" className="h-8 brightness-0 invert mr-2" />
              <span className="font-bold text-lg">Ping</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your intelligent WhatsApp assistant. Reminders, to-do lists, notes, and live data — all through chat.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="flex items-center text-gray-400 text-sm">
              <Mail className="h-4 w-4 mr-2" />
              <span>cyduck1107@gmail.com</span>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 Ping. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
