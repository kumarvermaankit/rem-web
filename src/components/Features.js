import React, { useState } from 'react';
import { Clock, ListTodo, Bookmark, TrendingUp, Zap, Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: Clock,
    title: 'Smart Reminders',
    description: 'Set reminders in natural language — "Remind me to call mom tomorrow at 2pm". Recurring reminders with daily, weekly, or custom intervals. Snooze or mark done directly from WhatsApp.',
    details: ['Natural language reminders', 'Recurring: daily, weekly, custom', 'Snooze & done from WhatsApp'],
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: ListTodo,
    title: 'Todo Lists',
    description: 'Create shopping lists, grocery lists, or work todos by just typing. Add items with per-item reminders like "buy milk at 5pm". Get a daily prompt every morning to plan your day.',
    details: ['Create lists by typing', 'Per-item reminders', 'Daily morning prompt', 'Check items off inline'],
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    icon: Bookmark,
    title: 'Personal Notes Vault',
    description: 'Save anything — email, PAN, address, passwords. Retrieve instantly by asking "what\'s my email?". Encrypted password storage keeps your secrets safe.',
    details: ['Save any info instantly', 'Retrieve on demand', 'Encrypted password storage'],
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    icon: TrendingUp,
    title: 'Live Data Queries',
    description: 'Ask for stock prices ("what\'s Reliance at?"), live cricket scores ("India match score"), and more. No API keys or dashboards — just ask in chat.',
    details: ['Stock prices on demand', 'Live cricket scores', 'No API keys needed'],
    gradient: 'from-emerald-500 to-green-400',
  },
  {
    icon: Zap,
    title: 'Zero Setup',
    description: 'No app to install, no account to create. Works on any phone with WhatsApp. Just send a message and start using it instantly.',
    details: ['No app installation', 'No account creation', 'Works on any phone'],
    gradient: 'from-rose-500 to-pink-400',
  },
];

const Features = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="features" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-dots" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-ping-lighter rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-ping" />
              <span className="text-ping font-medium text-sm tracking-wide">Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-5 tracking-tight">
              What Ping Can Do
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Reminders, to-do lists, notes, live data — Ping handles it all over WhatsApp. No setup, just chat.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={Math.min(index + 1, 5)}>
              <div
                className={`group relative bg-white rounded-2xl p-6 md:p-8 border border-gray-100 transition-all duration-500 cursor-pointer ${
                  expandedIndex === index ? 'shadow-2xl shadow-ping/10 border-ping/20 -translate-y-1' : 'shadow-sm hover:shadow-xl hover:border-gray-200 hover:-translate-y-1'
                }`}
                onClick={() => toggleExpand(index)}
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base">{feature.description}</p>

                  <div className={`overflow-hidden transition-all duration-500 ${
                    expandedIndex === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pt-4 border-t border-gray-100">
                      <ul className="space-y-2.5">
                        {feature.details.map((detail, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-600">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mr-3 mt-0.5`}>
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    className={`mt-4 text-sm font-medium flex items-center gap-1.5 transition-colors duration-300 ${
                      expandedIndex === index ? 'text-ping' : 'text-gray-400 group-hover:text-ping'
                    }`}
                    onClick={(e) => { e.stopPropagation(); toggleExpand(index); }}
                  >
                    {expandedIndex === index ? 'Show less' : 'Learn more'}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
