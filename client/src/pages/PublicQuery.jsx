import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuery } from '../services/queryService';
import { validateQuery } from '../utils/validators';
import toast from 'react-hot-toast';
import { 
  FiCheckCircle, 
  FiSend, 
  FiShield, 
  FiRefreshCw, 
  FiUser, 
  FiMail, 
  FiFileText, 
  FiEdit, 
  FiGrid, 
  FiFlag,
  FiClock,
  FiUsers
} from 'react-icons/fi';
import Button from '../components/common/Button';

const PublicQuery = () => {
  const navigate = useNavigate();

  const initialFormState = {
    customerName: '',
    customerEmail: '',
    subject: '',
    description: '',
    category: 'General',
    priority: 'Medium',
    status: 'Open'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const categoryOptions = [
    { value: 'General', label: 'General Inquiry' },
    { value: 'Technical', label: 'Technical Support' },
    { value: 'Billing', label: 'Billing & Account' },
    { value: 'Account', label: 'Access Control' }
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Low - General question' },
    { value: 'Medium', label: 'Medium - Normal issue' },
    { value: 'High', label: 'High - Critical blocker' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = validateQuery(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the validation errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createQuery(formData);
      if (response.success) {
        toast.success('Support query submitted successfully!');
        setSubmittedTicket(response.data);
        setSubmitSuccess(true);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to submit your support query. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  const handleCreateAnother = () => {
    setFormData(initialFormState);
    setErrors({});
    setSubmitSuccess(false);
    setSubmittedTicket(null);
  };

  // SVG Illustration for the left-side panel
  const illustrationSvg = (
    <svg className="w-48 h-48 mx-auto lg:mx-0" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle decoration */}
      <circle cx="100" cy="100" r="70" fill="#eff6ff" />
      <circle cx="150" cy="60" r="6" fill="#bfdbfe" />
      <circle cx="50" cy="140" r="4" fill="#bfdbfe" />
      
      {/* Envelope Shadow */}
      <rect x="50" y="80" width="100" height="70" rx="12" fill="#dbeafe" />
      
      {/* Document coming out */}
      <rect x="65" y="50" width="70" height="60" rx="8" fill="white" stroke="#3b82f6" strokeWidth="3" />
      <line x1="75" y1="65" x2="125" y2="65" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="77" x2="115" y2="77" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="89" x2="125" y2="89" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />

      {/* Envelope Body (Foreground) */}
      <path d="M50 92C50 85.3726 55.3726 80 62 80H138C144.627 80 150 85.3726 150 92V138C150 144.627 144.627 150 138 150H62C55.3726 150 50 144.627 50 138V92Z" fill="#3b82f6" />
      {/* Envelope Flap (open look) */}
      <path d="M50 92L93.7548 116.208C97.6074 118.339 102.393 118.339 106.245 116.208L150 92" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Envelope inner overlay / folds */}
      <path d="M50 148L88 115" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <path d="M150 148L112 115" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      
      {/* Paper airplane flying */}
      <path d="M165 60L185 45L178 70L173 63L165 60Z" fill="#93c5fd" />
      <path d="M178 70L173 63" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Dashed flight path */}
      <path d="M135 110C155 110 170 95 170 78" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 via-slate-100 to-blue-50/50 flex flex-col font-sans select-none antialiased relative overflow-hidden">
      
      {/* Background visual curves simulation */}
      <div className="absolute bottom-0 right-0 left-0 h-96 bg-gradient-to-t from-blue-50/60 to-transparent pointer-events-none -z-10 rounded-t-[50%] blur-3xl transform translate-y-12"></div>

      {/* Top Navigation Branding Header */}
      <header className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-extrabold text-white text-base shadow-sm">
            Q
          </span>
          <span className="text-lg font-bold text-gray-900 tracking-tight">QMS Support Portal</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="shadow-sm border-gray-300 hover:bg-slate-50 transition-colors"
        >
          <FiShield className="mr-1.5 h-4 w-4 text-gray-600" />
          Admin Panel
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Info panel & Illustration */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="relative">
              {illustrationSvg}
            </div>
            
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                We're here to help!
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                Submit your support request and our team will get back to you as soon as possible.
              </p>
            </div>
            
            <div className="space-y-5 w-full max-w-sm text-left pt-2">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-blue-50/80 flex items-center justify-center text-blue-600 shrink-0">
                  <FiClock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Quick Response</h4>
                  <p className="text-xs text-gray-500">We typically respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-blue-50/80 flex items-center justify-center text-blue-600 shrink-0">
                  <FiShield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Secure & Confidential</h4>
                  <p className="text-xs text-gray-500">Your information is safe with us</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-blue-50/80 flex items-center justify-center text-blue-600 shrink-0">
                  <FiUsers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Expert Support</h4>
                  <p className="text-xs text-gray-500">Our team is here to assist you</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Support Form Card */}
          <div className="lg:col-span-7">
            {!submitSuccess ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                
                {/* Header */}
                <div className="mb-6">
                  <h1 className="text-2xl font-extrabold text-gray-900">Submit a Support Ticket</h1>
                  <div className="w-12 h-1 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                    Please provide the details below and we will get back to you shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col space-y-1.5 w-full">
                      <label className="text-xs font-semibold text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className={`flex items-stretch border rounded-lg overflow-hidden transition-all duration-200 bg-white
                        ${errors.customerName 
                          ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-100' 
                          : 'border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100'}`}>
                        <div className="flex items-center justify-center px-3.5 bg-slate-50 border-r border-gray-200 text-gray-400">
                          <FiUser className="h-4 w-4" />
                        </div>
                        <input
                          type="text"
                          name="customerName"
                          placeholder="Enter your name"
                          value={formData.customerName}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                        />
                      </div>
                      {errors.customerName && <span className="text-xs text-red-500">{errors.customerName}</span>}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col space-y-1.5 w-full">
                      <label className="text-xs font-semibold text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className={`flex items-stretch border rounded-lg overflow-hidden transition-all duration-200 bg-white
                        ${errors.customerEmail 
                          ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-100' 
                          : 'border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100'}`}>
                        <div className="flex items-center justify-center px-3.5 bg-slate-50 border-r border-gray-200 text-gray-400">
                          <FiMail className="h-4 w-4" />
                        </div>
                        <input
                          type="email"
                          name="customerEmail"
                          placeholder="Enter your email address"
                          value={formData.customerEmail}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                        />
                      </div>
                      {errors.customerEmail && <span className="text-xs text-red-500">{errors.customerEmail}</span>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col space-y-1.5 w-full">
                    <label className="text-xs font-semibold text-gray-700">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className={`flex items-stretch border rounded-lg overflow-hidden transition-all duration-200 bg-white
                      ${errors.subject 
                        ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-100' 
                        : 'border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100'}`}>
                      <div className="flex items-center justify-center px-3.5 bg-slate-50 border-r border-gray-200 text-gray-400">
                        <FiFileText className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Summarize your issue in a few words"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        maxLength={150}
                        className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                      />
                    </div>
                    {errors.subject && <span className="text-xs text-red-500">{errors.subject}</span>}
                  </div>

                  {/* Description */}
                  <div className="flex flex-col space-y-1.5 w-full">
                    <label className="text-xs font-semibold text-gray-700">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <div className={`flex items-stretch border rounded-lg overflow-hidden transition-all duration-200 bg-white
                      ${errors.description 
                        ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-100' 
                        : 'border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100'}`}>
                      <div className="flex items-start justify-center pt-2.5 px-3.5 bg-slate-50 border-r border-gray-200 text-gray-400">
                        <FiEdit className="h-4 w-4" />
                      </div>
                      <textarea
                        name="description"
                        rows={5}
                        placeholder="Provide a detailed explanation of your question or problem..."
                        value={formData.description}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        maxLength={2000}
                        className="w-full px-3 py-2 text-sm outline-none bg-transparent resize-none"
                      />
                    </div>
                    {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Category */}
                    <div className="flex flex-col space-y-1.5 w-full">
                      <label className="text-xs font-semibold text-gray-700">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className={`flex items-stretch border rounded-lg overflow-hidden transition-all duration-200 bg-white
                        ${errors.category 
                          ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-100' 
                          : 'border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100'}`}>
                        <div className="flex items-center justify-center px-3.5 bg-slate-50 border-r border-gray-200 text-gray-400">
                          <FiGrid className="h-4 w-4" />
                        </div>
                        <div className="relative flex-grow">
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 pr-8 text-sm outline-none bg-transparent appearance-none"
                          >
                            {categoryOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {errors.category && <span className="text-xs text-red-500">{errors.category}</span>}
                    </div>

                    {/* Priority */}
                    <div className="flex flex-col space-y-1.5 w-full">
                      <label className="text-xs font-semibold text-gray-700">
                        Priority <span className="text-red-500">*</span>
                      </label>
                      <div className={`flex items-stretch border rounded-lg overflow-hidden transition-all duration-200 bg-white
                        ${errors.priority 
                          ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-100' 
                          : 'border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100'}`}>
                        <div className="flex items-center justify-center px-3.5 bg-slate-50 border-r border-gray-200 text-gray-400">
                          <FiFlag className="h-4 w-4" />
                        </div>
                        <div className="relative flex-grow">
                          <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 pr-8 text-sm outline-none bg-transparent appearance-none"
                          >
                            {priorityOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {errors.priority && <span className="text-xs text-red-500">{errors.priority}</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto text-gray-600 hover:text-gray-800 border-gray-300 hover:bg-gray-50 flex items-center justify-center"
                    >
                      <FiRefreshCw className="mr-2 h-4 w-4" />
                      Clear Form
                    </Button>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-750 text-white flex items-center justify-center shadow-md shadow-blue-500/10"
                    >
                      <FiSend className="mr-2 h-4 w-4" />
                      Submit Ticket
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg text-center max-w-xl mx-auto space-y-6">
                <div className="flex justify-center text-green-500 mb-2">
                  <FiCheckCircle className="h-16 w-16" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">Ticket Submitted Successfully!</h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Thank you for reaching out. We have registered your request in our system.
                  </p>
                </div>

                {submittedTicket && (
                  <div className="bg-slate-50 border border-gray-150 rounded-xl p-4 text-left max-w-sm mx-auto space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-500">Ticket ID:</span>
                      <span className="font-mono text-gray-900 font-bold">{submittedTicket._id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-500">Category:</span>
                      <span className="text-gray-900 font-medium">{submittedTicket.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-500">Submitted Email:</span>
                      <span className="text-gray-900 font-medium">{submittedTicket.customerEmail}</span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-400">
                  A confirmation of receipt has been logged. Our support representative will contact you shortly.
                </p>

                <div className="pt-4 border-t border-gray-100 flex justify-center">
                  <Button
                    onClick={handleCreateAnother}
                    variant="primary"
                    className="px-6 py-2 shadow-sm flex items-center justify-center bg-blue-600 hover:bg-blue-750 text-white"
                  >
                    <FiRefreshCw className="mr-2 h-4 w-4" />
                    Submit Another Query
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200/50 text-center text-xs text-gray-400 bg-white/30 backdrop-blur-sm z-10 flex items-center justify-center space-x-1.5">
        <FiShield className="h-3.5 w-3.5 text-gray-400" />
        <span>&copy; {new Date().getFullYear()} Customer Query Management System. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default PublicQuery;
