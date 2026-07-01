import React from 'react';
import { ArrowRight, Bell, ListChecks, StickyNote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Hero = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    size: 2 + Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    dur: 3 + Math.random() * 4,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden gradient-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-2xl" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-float"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-sm font-medium">Free · No sign-up needed</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <div className="flex justify-center mb-8">
                <div className="bg-white/15 p-3 rounded-2xl shadow-lg backdrop-blur-sm animate-bounce-gentle">
                  <img src="/logo.png" alt="Ping" className="h-16 w-16 md:h-20 md:w-20" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
                Meet{' '}
                <span className="relative inline-block">
                  Ping
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M4 8C40 2 80 2 120 4C160 6 180 8 196 10" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                Your intelligent WhatsApp assistant. Ping handles reminders, to-do lists, notes, and live data — all through chat. No app to install, no account to create.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <a href="#contact" className="btn-primary group shadow-2xl shadow-ping-dark/30">
                  <img src="/logo.png" alt="" className="h-5 w-5 mr-2" />
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a href="#features" className="btn-secondary">
                  <Bell className="mr-2 h-5 w-5" />
                  See Features
                </a>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                { icon: Bell, title: 'Smart Reminders', desc: 'Set reminders with natural language — just chat', delay: 5 },
                { icon: ListChecks, title: 'Todo Lists', desc: 'Create and manage lists directly from WhatsApp', delay: 6 },
                { icon: StickyNote, title: 'Notes & Live Data', desc: 'Save info, check stocks & cricket scores', delay: 7 },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={item.delay}>
                  <div className="group glass-card rounded-2xl p-6 hover:bg-white/15 transition-all duration-500 hover:-translate-y-1">
                    <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/20">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-white font-display font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
            <path d="M0 80V40C240 0 480 0 720 20C960 40 1200 40 1440 20V80H0Z" fill="white" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
