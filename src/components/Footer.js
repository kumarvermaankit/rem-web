import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' }
    ]
  };


  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <MessageCircle className="h-6 w-6 text-whatsapp mr-2" />
            <span className="font-bold text-lg">Ping</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <div className="flex items-center text-gray-400 text-sm">
              <Mail className="h-4 w-4 mr-2" />
              <span>cyduck1107@gmail.com</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              <span>+91 95554 18627</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <div className="text-gray-400 text-sm">
            © 2024 Ping. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
