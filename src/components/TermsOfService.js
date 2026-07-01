import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      icon: FileText,
      title: "Service Agreement",
      content: [
        "By using Ping, you agree to these terms of service",
        "The service is provided 'as is' and may be subject to temporary interruptions",
        "We reserve the right to modify or discontinue the service with reasonable notice",
        "Your continued use of the service constitutes acceptance of any changes"
      ]
    },
    {
      icon: CheckCircle,
      title: "User Responsibilities",
      content: [
        "Provide accurate and complete information when registering",
        "Use the service for lawful purposes only",
        "Do not attempt to interfere with service operation or security",
        "Respect WhatsApp's terms of service and community guidelines"
      ]
    },
    {
      icon: XCircle,
      title: "Prohibited Uses",
      content: [
        "Sending spam, harassment, or abusive messages through our bot",
        "Using the service for illegal activities or content",
        "Attempting to reverse engineer or hack our systems",
        "Sharing account credentials or unauthorized access"
      ]
    },
    {
      icon: AlertCircle,
      title: "Service Limitations",
      content: [
        "Free plan users may have limited features and usage caps",
        "Message delivery is subject to WhatsApp's availability",
        "We are not responsible for missed reminders due to technical issues",
        "Service uptime is not guaranteed but we strive for high availability"
      ]
    },
    {
      icon: RefreshCw,
      title: "Subscription and Billing",
      content: [
        "Paid plans are billed monthly or annually in advance",
        "Refunds are available within 7 days of purchase for annual plans",
        "We reserve the right to change pricing with 30 days notice",
        "Auto-renewal can be cancelled at any time before the next billing cycle"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-ping hover:text-ping-dark mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <p className="text-gray-700 leading-relaxed">
              Welcome to Ping. These Terms of Service govern your use of Ping and outline the rights and 
              responsibilities of both parties. By using Ping, you agree to comply with these terms.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-ping-lighter p-3 rounded-lg mr-4">
                  <section.icon className="h-6 w-6 text-ping-dark" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="h-2 w-2 bg-ping rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
          <p className="text-gray-700 mb-4">
            Ping provides this service on an 'as is' basis. We make no warranties regarding the reliability, 
            accuracy, or availability of the service. Your use of the service is at your own risk.
          </p>
        </div>

        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Email:</strong> heypingchat@gmail.com
            </p>
            <p className="text-gray-700">
              <strong>WhatsApp:</strong> +91 80765 69811
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
