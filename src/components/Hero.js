import React from 'react';
import { MessageCircle, Clock, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="pt-16 min-h-screen flex items-center gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <MessageCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Cyduck WhatsApp Assistant
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Your intelligent WhatsApp reminder and assistant bot by Cyduck. Set reminders, get notifications, and manage your tasks - all through WhatsApp.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-whatsapp-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Get Started
            </button>
            <a href="#contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Clock className="h-8 w-8 text-white mb-4 mx-auto" />
              <h3 className="text-white font-semibold text-lg mb-2">Smart Reminders</h3>
              <p className="text-white/80">Set one-time or recurring reminders with natural language</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Calendar className="h-8 w-8 text-white mb-4 mx-auto" />
              <h3 className="text-white font-semibold text-lg mb-2">Task Management</h3>
              <p className="text-white/80">Create, track, and complete tasks via WhatsApp</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <CheckCircle className="h-8 w-8 text-white mb-4 mx-auto" />
              <h3 className="text-white font-semibold text-lg mb-2">Instant Notifications</h3>
              <p className="text-white/80">Get timely alerts for all your important events</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
