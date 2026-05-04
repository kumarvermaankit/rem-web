import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    plan: 'free'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      description: 'Get instant help via WhatsApp',
      value: '+1 (555) 123-4567',
      action: 'Start Chat'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      value: 'support@cyduck.com',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Mon-Fri, 9AM-6PM EST',
      value: '+1 (555) 987-6543',
      action: 'Call Now'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      description: 'Visit our headquarters',
      value: '123 Tech Street, San Francisco, CA 94105',
      action: 'Get Directions'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '1M+', label: 'Reminders Sent' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Started Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of users who never miss important events. Start your free trial or contact us for enterprise solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Start Your Free Trial
              </h3>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Plan
                    </label>
                    <select
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp focus:border-transparent"
                    >
                      <option value="free">Free Plan</option>
                      <option value="pro">Pro Plan ($9.99/month)</option>
                      <option value="business">Business Plan ($29.99/month)</option>
                      <option value="enterprise">Enterprise (Custom)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp focus:border-transparent"
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-whatsapp text-white py-3 rounded-lg font-semibold hover:bg-whatsapp-dark transition-colors flex items-center justify-center"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Thank You for Signing Up!
                  </h4>
                  <p className="text-gray-600 mb-3">
                    Check your email for a message from support@cyduck.com to complete your setup.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-whatsapp text-white px-6 py-2 rounded-lg font-medium hover:bg-whatsapp-dark transition-colors"
                  >
                    Sign Up Another User
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-whatsapp-light p-3 rounded-lg inline-block mb-3">
                      <info.icon className="h-6 w-6 text-whatsapp-dark" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{info.description}</p>
                    <p className="text-gray-900 font-medium mb-3">{info.value}</p>
                    <button className="text-whatsapp hover:text-whatsapp-dark font-medium text-sm">
                      {info.action} →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-whatsapp-light to-green-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose WhatsAppBot?
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-whatsapp-dark mb-1">
                      {stat.number}
                    </div>
                    <div className="text-gray-700 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Productivity?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users who have already made WhatsAppBot their personal assistant. 
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-whatsapp text-white px-8 py-3 rounded-lg font-semibold hover:bg-whatsapp-dark transition-colors flex items-center justify-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Free on WhatsApp
            </button>
            <button className="border-2 border-whatsapp text-whatsapp px-8 py-3 rounded-lg font-semibold hover:bg-whatsapp-light transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
