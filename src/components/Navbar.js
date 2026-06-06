import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'features', 'pricing', 'faq', 'contact'];
      const scrollPos = window.scrollY + 150;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#hero" className="flex items-center">
            <img src="/logo.png" alt="Ping" className="h-10 transition-transform duration-300 hover:scale-105" />
          </a>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'bg-ping-lighter text-ping'
                    : 'text-gray-600 hover:text-ping hover:bg-gray-50'
                }`}
              >
                {item.name}
              </a>
            ))}
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <a
              href="/privacy-policy"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-ping transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-ping transition-colors duration-300"
            >
              Terms
            </a>
            <a
              href="/data-deletion"
              className="bg-ping text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-ping-dark transition-all duration-300 hover:shadow-lg"
            >
              Data Deletion
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-ping p-2 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'bg-ping-lighter text-ping'
                    : 'text-gray-600 hover:text-ping hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <a
              href="/privacy-policy"
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-ping hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-ping hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Terms of Service
            </a>
            <a
              href="/data-deletion"
              className="block px-4 py-3 rounded-lg text-base font-medium bg-ping text-white hover:bg-ping-dark text-center"
              onClick={() => setIsOpen(false)}
            >
              Data Deletion
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
