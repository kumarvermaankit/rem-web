import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Helmet>
        <title>404 - Page Not Found | Ping - WhatsApp Assistant</title>
        <meta name="description" content="The page you are looking for does not exist. Return to Ping's homepage to set reminders, manage to-do lists, and more." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-ping-lighter mb-6">
          <Search className="w-10 h-10 text-ping" />
        </div>

        <h1 className="text-6xl font-display font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Page not found</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to your reminders.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-ping to-ping-dark text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-ping/25 transition-all duration-300"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
