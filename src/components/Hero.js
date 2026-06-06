import React from 'react';
import { Clock, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Hero = () => {
  const bubbles = [
    { size: 'w-3 h-3', pos: 'top-[10%] left-[8%]', delay: '0s', dur: '3s' },
    { size: 'w-5 h-5', pos: 'top-[20%] right-[12%]', delay: '0.5s', dur: '4s' },
    { size: 'w-2 h-2', pos: 'top-[35%] left-[5%]', delay: '1s', dur: '2.5s' },
    { size: 'w-6 h-6', pos: 'top-[45%] right-[8%]', delay: '1.5s', dur: '3.5s' },
    { size: 'w-4 h-4', pos: 'top-[55%] left-[10%]', delay: '0.8s', dur: '4.5s' },
    { size: 'w-3 h-3', pos: 'top-[65%] right-[15%]', delay: '2s', dur: '3s' },
    { size: 'w-7 h-7', pos: 'top-[75%] left-[6%]', delay: '0.3s', dur: '5s' },
    { size: 'w-4 h-4', pos: 'top-[85%] right-[10%]', delay: '1.2s', dur: '3.8s' },
    { size: 'w-2 h-2', pos: 'top-[15%] left-[50%]', delay: '0.7s', dur: '2.8s' },
    { size: 'w-5 h-5', pos: 'top-[40%] left-[90%]', delay: '1.8s', dur: '4.2s' },
    { size: 'w-3 h-3', pos: 'top-[70%] left-[50%]', delay: '0.2s', dur: '3.2s' },
    { size: 'w-4 h-4', pos: 'top-[5%] left-[30%]', delay: '1.3s', dur: '3.6s' },
    { size: 'w-6 h-6', pos: 'top-[30%] left-[70%]', delay: '0.9s', dur: '4.8s' },
    { size: 'w-2 h-2', pos: 'top-[60%] left-[30%]', delay: '1.6s', dur: '2.6s' },
    { size: 'w-5 h-5', pos: 'top-[90%] left-[70%]', delay: '0.4s', dur: '3.4s' },
  ];

  return (
    <section id="hero" className="relative pt-16 min-h-screen flex items-center overflow-hidden gradient-bg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-2xl" />

        {bubbles.map((b, i) => (
          <div
            key={i}
            className={`absolute ${b.pos} ${b.size} bg-white/20 rounded-full animate-float`}
            style={{ animationDelay: b.delay, animationDuration: b.dur }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <ScrollReveal>
            <div className="flex justify-center mb-8">
              <div className="bg-white p-2 rounded-full shadow-lg animate-float">
                <img src="/logo.png" alt="Ping" className="h-16 w-16" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Meet Ping
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <p className="text-xl md:text-2xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
              Your intelligent WhatsApp assistant. Ping handles reminders, to-do lists, notes, and live data — all through chat. No app to install, no account to create.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href="#contact" className="group bg-white text-ping-dark px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-lg">
                <img src="/logo.png" alt="Ping" className="h-5 w-5 mr-2" />
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Clock, title: 'Smart Reminders', desc: 'Set one-time or recurring reminders with natural language', delay: 4 },
              { icon: Calendar, title: 'Todo Lists', desc: 'Create, track, and complete tasks via WhatsApp', delay: 5 },
              { icon: CheckCircle, title: 'Instant Notifications', desc: 'Get timely alerts for all your important events', delay: 6 },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={item.delay}>
                <div className="group bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                  <item.icon className="h-8 w-8 text-white mb-4 mx-auto transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/75">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
