import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Check, ArrowUpRight, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

const SeoArticle = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-ping-lighter/70 via-ping-lighter/30 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-ping text-sm font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <span className="inline-flex items-center gap-1.5 bg-ping/10 text-ping-dark text-xs font-semibold px-3 py-1.5 rounded-full">
              <BookOpen className="h-3.5 w-3.5" />
              Ping Guide
            </span>
          </div>

          <article
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:leading-tight prose-h1:mb-6
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:my-4
              prose-a:text-ping prose-a:font-medium prose-a:no-underline hover:prose-a:text-ping-dark hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-em:text-gray-700
              prose-ol:text-gray-600 prose-ol:space-y-2
              prose-ul:text-gray-600 prose-ul:space-y-2
              prose-li:leading-relaxed
              prose-lead:text-xl prose-lead:text-gray-700 prose-lead:font-normal prose-lead:leading-relaxed
              prose-table:text-gray-600 prose-thead:text-gray-900 prose-th:font-semibold prose-th:bg-ping-lighter/60 prose-th:py-3 prose-th:px-4
              prose-td:py-3 prose-td:px-4 prose-td:align-middle
              prose-tr:border-gray-100"
          >
            {children}
          </article>
        </div>
      </div>
    </div>
  );
};

export const ArticleCta = () => (
  <div className="relative mt-14 overflow-hidden bg-gradient-to-br from-ping via-ping-dark to-[#1450A8] rounded-2xl p-8 sm:p-10 text-white text-center">
    <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
    <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-ping-light/30 rounded-full blur-3xl pointer-events-none" />
    <div className="relative">
      <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm">
        <Sparkles className="h-3.5 w-3.5" />
        Free to Start
      </div>
      <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
        Try Ping — your free WhatsApp assistant
      </h2>
      <p className="text-white/85 max-w-lg mx-auto mb-8 leading-relaxed">
        No app to download, no sign-up needed. Just message Ping on WhatsApp and start setting
        reminders, to-do lists, and notes.
      </p>
      <a
        href="https://wa.me/918076569811"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white text-ping-dark font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
      >
        <MessageCircle className="w-5 h-5" />
        Message Ping on WhatsApp
      </a>
    </div>
  </div>
);

export const RelatedArticles = ({ articles }) => (
  <div className="mt-14 pt-10 border-t border-gray-100">
    <div className="flex items-center gap-3 mb-8">
      <div className="h-8 w-1 bg-gradient-to-b from-ping to-ping-dark rounded-full" />
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-900">Related Guides</h2>
        <p className="text-sm text-gray-500">Keep learning — every guide teaches something new</p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {articles.map((a) => (
        <Link
          key={a.to}
          to={a.to}
          className="group relative bg-white border border-gray-200/80 rounded-2xl p-6 hover:border-ping/40 hover:shadow-xl hover:shadow-ping/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ping to-ping-dark opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="font-display font-semibold text-gray-900 group-hover:text-ping transition-colors mb-2 text-lg">
            {a.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">{a.description}</p>
          <span className="inline-flex items-center gap-1.5 text-ping text-sm font-semibold">
            Read guide
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      ))}
    </div>
  </div>
);

export const FeatureList = ({ items }) => (
  <ul className="not-prose grid grid-cols-1 gap-3 my-6">
    {items.map((item, i) => (
      <li
        key={i}
        className="flex items-start bg-white border border-gray-200/80 rounded-xl p-4 hover:border-ping/40 hover:shadow-md transition-all duration-200"
      >
        <div className="bg-ping-lighter rounded-full p-1.5 mr-3.5 mt-0.5 flex-shrink-0">
          <Check className="h-3.5 w-3.5 text-ping" />
        </div>
        <span className="text-gray-700 leading-relaxed">{item}</span>
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
