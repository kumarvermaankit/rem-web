import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Check, ArrowUpRight } from 'lucide-react';

const SeoArticle = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-ping-lighter/60 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/" className="inline-flex items-center text-ping hover:text-ping-dark mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-display prose-p:text-gray-600 prose-a:text-ping">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
};

export const ArticleCta = () => (
  <div className="mt-12 bg-gradient-to-r from-ping to-ping-dark rounded-2xl p-8 text-white text-center">
    <h2 className="text-2xl font-display font-bold mb-3">Try Ping — your free WhatsApp assistant</h2>
    <p className="text-white/80 mb-6">
      No app to download, no sign-up needed. Just message Ping on WhatsApp and start setting reminders.
    </p>
    <a
      href="https://wa.me/918076569811"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-white text-ping-dark font-semibold px-8 py-3 rounded-xl hover:shadow-xl transition-all duration-300"
    >
      <MessageCircle className="w-5 h-5" />
      Message Ping on WhatsApp
    </a>
  </div>
);

export const RelatedArticles = ({ articles }) => (
  <div className="mt-12 pt-8 border-t border-gray-100">
    <h2 className="text-xl font-display font-bold text-gray-900 mb-6">Related Guides</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {articles.map((a) => (
        <Link
          key={a.to}
          to={a.to}
          className="group bg-white border border-gray-100 rounded-xl p-5 hover:border-ping/30 hover:shadow-md transition-all duration-300"
        >
          <h3 className="font-semibold text-gray-900 group-hover:text-ping transition-colors mb-2">
            {a.title}
          </h3>
          <p className="text-sm text-gray-500">{a.description}</p>
        </Link>
      ))}
    </div>
  </div>
);

export const FeatureList = ({ items }) => (
  <ul className="space-y-2 not-prose">
    {items.map((item, i) => (
      <li key={i} className="flex items-start">
        <div className="bg-ping-lighter rounded-full p-0.5 mr-3 mt-0.5 flex-shrink-0">
          <Check className="h-3.5 w-3.5 text-ping" />
        </div>
        <span className="text-gray-600">{item}</span>
      </li>
    ))}
  </ul>
);

export const CtaLink = ({ to, children }) => (
  <Link
    to={to}
    className="inline-flex items-center gap-2 text-ping font-medium hover:text-ping-dark"
  >
    {children}
    <ArrowUpRight className="w-4 h-4" />
  </Link>
);

export default SeoArticle;
