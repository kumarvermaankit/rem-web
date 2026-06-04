import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, and phone number when you register for our service",
        "Usage Data: How you interact with our WhatsApp bot, including reminders set and tasks created",
        "Technical Data: IP address, device information, and browser type for service optimization",
        "Communication Data: WhatsApp messages exchanged with our bot for service delivery"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Service Delivery: To provide reminder and assistant services via WhatsApp",
        "Communication: To respond to your inquiries and send service-related notifications",
        "Improvement: To analyze usage patterns and improve our services",
        "Security: To monitor for fraud and ensure service integrity"
      ]
    },
    {
      icon: Lock,
      title: "Data Protection",
      content: [
        "End-to-end encryption for all WhatsApp communications",
        "Secure storage of personal data on encrypted servers",
        "Regular security audits and vulnerability assessments",
        "Limited employee access to user data on need-to-know basis"
      ]
    },
    {
      icon: Database,
      title: "Data Retention",
      content: [
        "User data is retained only as long as necessary for service delivery",
        "Automatic deletion of inactive accounts after 12 months",
        "Right to request data deletion at any time",
        "Compliance with data protection regulations"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access: Request a copy of your personal data",
        "Correction: Update or correct inaccurate information",
        "Deletion: Request removal of your personal data",
        "Portability: Request transfer of your data to another service"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-whatsapp hover:text-whatsapp-dark mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <p className="text-gray-700 leading-relaxed">
              At Ping, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you use Ping.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-whatsapp-light p-3 rounded-lg mr-4">
                  <section.icon className="h-6 w-6 text-whatsapp-dark" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="h-2 w-2 bg-whatsapp rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy or how we handle your data, please contact us:
          </p>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Email:</strong> cyduck1107@gmail.com
            </p>
            <p className="text-gray-700">
              <strong>WhatsApp:</strong> +91 95554 18627
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
