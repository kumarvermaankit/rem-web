import React from 'react';
import { Bell, Brain, Globe, Shield, Users, Zap, Clock, Calendar, MessageSquare, Smartphone, Settings, BarChart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Never miss important events with intelligent reminder scheduling and customizable notification preferences.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Assistant',
      description: 'Natural language processing lets you set reminders and manage tasks conversationally.'
    },
    {
      icon: Globe,
      title: '24/7 Availability',
      description: 'Your assistant is always ready to help, day or night, anywhere in the world.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption ensures your personal information and tasks remain confidential.'
    },
    {
      icon: Users,
      title: 'Multi-User Support',
      description: 'Share reminders and collaborate on tasks with family members or team members.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant response times ensure you can set reminders and get help when you need it.'
    }
  ];

  const detailedFeatures = [
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Set one-time reminders, recurring tasks, or complex schedules with ease.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Calendar,
      title: 'Calendar Integration',
      description: 'Sync with your existing calendars to keep all your events in one place.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MessageSquare,
      title: 'Natural Language',
      description: 'Simply type "Remind me to call mom tomorrow at 3pm" and we\'ll handle the rest.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Designed specifically for WhatsApp mobile experience - no app download needed.',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Settings,
      title: 'Customizable',
      description: 'Personalize reminder tones, snooze options, and notification preferences.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: BarChart,
      title: 'Analytics Dashboard',
      description: 'Track your productivity and task completion patterns with detailed insights.',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Your Productivity
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to stay organized and never miss important events, all through WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card-hover bg-gray-50 p-8 rounded-xl">
              <div className="bg-whatsapp-light p-3 rounded-lg inline-block mb-4">
                <feature.icon className="h-6 w-6 text-whatsapp-dark" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-whatsapp-light to-green-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Everything You Need in One Place
              </h3>
              <p className="text-gray-700 mb-6">
                From simple reminders to complex task management, our WhatsApp bot handles it all with the power of artificial intelligence.
              </p>
              <button className="bg-whatsapp text-white px-6 py-3 rounded-lg font-semibold hover:bg-whatsapp-dark transition-colors">
                Explore All Features
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {detailedFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <div className={`p-2 rounded-lg inline-block mb-2 ${feature.color}`}>
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h4>
                  <p className="text-gray-600 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
