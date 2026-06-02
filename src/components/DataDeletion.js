import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, MessageCircle, Mail, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const DataDeletion = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Option 1: Send a WhatsApp Message",
      description: "Simply open your chat with our WhatsApp bot and type \"delete my account\". That's it — we'll receive your request instantly.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Mail,
      title: "Option 2: Email Us",
      description: "Send an email to support@yourdomain.com from the email address associated with your account. Include your phone number so we can locate your data.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Clock,
      title: "Processing Time",
      description: "Once we receive your deletion request, we will scrub all data associated with your phone number from our servers within 24 hours.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: CheckCircle,
      title: "Confirmation",
      description: "You will receive a confirmation message via WhatsApp or email once the deletion process is complete and all your data has been removed.",
      color: "bg-teal-100 text-teal-600"
    }
  ];

  const deletedData = [
    "Personal information (name, email, phone number)",
    "All saved to-do lists and tasks",
    "All reminders (one-time and recurring)",
    "Secure notes and stored passwords",
    "Usage history and communication logs",
    "Any other data associated with your account"
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
            Data Deletion Instructions
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <p className="text-gray-700 leading-relaxed">
              We respect your right to control your personal data. If you wish to delete your account and remove all 
              associated information from our systems, you can do so easily using either of the methods below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className={`p-3 rounded-lg inline-block mb-4 ${step.color}`}>
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-3 rounded-lg mr-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">What Gets Deleted</h2>
          </div>
          <ul className="space-y-3">
            {deletedData.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="h-2 w-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Important Note</h3>
              <p className="text-amber-800">
                Account deletion is permanent and cannot be undone. After your data is removed, you will need to 
                set up a fresh account if you wish to use our services again in the future. Please make sure to 
                back up any important information before submitting your deletion request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDeletion;
