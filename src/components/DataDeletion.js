import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Trash2, Mail, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const DataDeletion = () => {
  const steps = [
    {
      icon: Mail,
      title: "Send an Email",
      description: "Email us at heypingchat@gmail.com with your WhatsApp phone number and we'll process your deletion request.",
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
      description: "You will receive a confirmation email once the deletion process is complete and all your data has been removed.",
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
      <Helmet>
        <title>Data Deletion - Ping | WhatsApp Assistant</title>
        <meta name="description" content="Request complete deletion of your Ping account and data. Follow our simple process to remove all reminders, lists, and personal information from our servers." />
        <meta property="og:title" content="Data Deletion - Ping | WhatsApp Assistant" />
        <meta property="og:description" content="Request complete deletion of your Ping account and data. Follow our simple process to remove all reminders, lists, and personal information." />
        <meta name="twitter:title" content="Data Deletion - Ping | WhatsApp Assistant" />
        <meta name="twitter:description" content="Request complete deletion of your Ping account and data." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-ping hover:text-ping-dark mb-6">
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
              We respect your right to control your personal data. To request deletion of your account and all associated data, email us with your WhatsApp phone number.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
