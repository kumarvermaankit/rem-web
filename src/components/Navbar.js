import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Features', 'Pricing', 'FAQ', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <MessageCircle className="h-8 w-8 text-whatsapp mr-2" />
            <span className="font-bold text-xl text-gray-900">Cyduck</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-whatsapp px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href="/privacy-policy"
                className="text-gray-700 hover:text-whatsapp px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-gray-700 hover:text-whatsapp px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/data-deletion"
                className="bg-whatsapp text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-whatsapp-dark transition-colors"
              >
                Data Deletion
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-whatsapp p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-whatsapp block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="/privacy-policy"
              className="text-gray-700 hover:text-whatsapp block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-gray-700 hover:text-whatsapp block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Terms of Service
            </a>
            <a
              href="/data-deletion"
              className="bg-whatsapp text-white block px-3 py-2 rounded-md text-base font-medium text-center"
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
