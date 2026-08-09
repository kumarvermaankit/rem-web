import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { user, logout } = useAuth();

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
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100'
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-100/50'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <a href="#hero" className="flex items-center gap-2 group" aria-label="Ping home">
            <img src="/logo.png" alt="Ping" className={`h-9 md:h-10 transition-all duration-300`} />
            <span className="font-display font-bold text-lg text-gray-900 transition-colors duration-300">
              Ping
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
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
              <div className="h-5 w-px bg-gray-200 mx-2" />
              {user ? (
                <>
                  <a
                    href="/dashboard"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-ping hover:bg-ping-lighter transition-colors duration-300"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </a>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors duration-300"
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-ping hover:bg-ping-lighter transition-colors duration-300"
                >
                  Log in
                </a>
              )}
              <a
                href="/data-deletion"
                className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-ping text-white hover:bg-ping-dark shadow-md hover:shadow-lg transition-all duration-300"
              >
                Data Deletion
              </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl">
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
            {user ? (
              <>
                <a
                  href="/dashboard"
                  className="block px-4 py-3 rounded-lg text-base font-medium text-ping hover:bg-ping-lighter"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </a>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-500 hover:text-red-600 hover:bg-gray-50"
                >
                  Log out
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="block px-4 py-3 rounded-lg text-base font-medium text-ping hover:bg-ping-lighter"
                onClick={() => setIsOpen(false)}
              >
                Log in
              </a>
            )}
            <a
              href="/privacy-policy"
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-500 hover:text-ping hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-500 hover:text-ping hover:bg-gray-50"
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
