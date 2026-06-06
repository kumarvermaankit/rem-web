import React from 'react';
import { Clock, ListTodo, CheckCircle, Bookmark, TrendingUp, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: Clock,
    title: 'Smart Reminders',
    description: 'Set reminders in natural language — "Remind me to call mom tomorrow at 2pm". Recurring reminders with daily, weekly, or custom intervals. Snooze or mark done directly from WhatsApp.',
    details: ['Natural language reminders', 'Recurring: daily, weekly, custom', 'Snooze & done from WhatsApp']
  },
  {
    icon: ListTodo,
    title: 'Todo Lists',
    description: 'Create shopping lists, grocery lists, or work todos by just typing. Add items with per-item reminders like "buy milk at 5pm". Get a daily prompt every morning to plan your day.',
    details: ['Create lists by typing', 'Per-item reminders', 'Daily morning prompt', 'Check items off inline']
  },
  {
    icon: Bookmark,
    title: 'Personal Notes Vault',
    description: 'Save anything — email, PAN, address, passwords. Retrieve instantly by asking "what\'s my email?". Encrypted password storage keeps your secrets safe.',
    details: ['Save any info instantly', 'Retrieve on demand', 'Encrypted password storage']
  },
  {
    icon: TrendingUp,
    title: 'Live Data Queries',
    description: 'Ask for stock prices ("what\'s Reliance at?"), live cricket scores ("India match score"), and more. No API keys or dashboards — just ask in chat.',
    details: ['Stock prices on demand', 'Live cricket scores', 'No API keys needed']
  },
  {
    icon: Zap,
    title: 'Zero Setup',
    description: 'No app to install, no account to create. Works on any phone with WhatsApp. Just send a message and start using it instantly.',
    details: ['No app installation', 'No account creation', 'Works on any phone']
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-ping/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-ping font-semibold text-sm tracking-widest uppercase mb-4">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Ping Can Do
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Reminders, to-do lists, notes, live data — Ping handles it all over WhatsApp. No setup, just chat.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={Math.min(index + 1, 5)}>
              <div className="group card-hover bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-ping/20">
                <div className="bg-ping-lighter p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-ping" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 mb-4 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-ping mt-0.5 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
