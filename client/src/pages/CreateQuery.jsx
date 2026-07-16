import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuery } from '../services/queryService';
import { validateQuery } from '../utils/validators';
import toast from 'react-hot-toast';
import { 
  FiUser, 
  FiMail, 
  FiFileText, 
  FiEdit, 
  FiGrid, 
  FiFlag, 
  FiCheckCircle, 
  FiRefreshCw, 
  FiX, 
  FiSend 
} from 'react-icons/fi';
import Button from '../components/common/Button';

const CreateQuery = () => {
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
  const [submitError, setSubmitError] = useState(null);

  const categoryOptions = [
    { value: 'General', label: 'General' },
    { value: 'Technical', label: 'Technical' },
    { value: 'Billing', label: 'Billing' },
    { value: 'Account', label: 'Account' }
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' }
  ];

  const statusOptions = [
    { value: 'Open', label: 'Open' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' }
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
    setSubmitError(null);

    if (!validateForm()) {
      toast.error('Please correct the validation errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createQuery(formData);
      if (response.success) {
        toast.success('Query created successfully.');
        navigate('/queries');
      }
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit support query. Please try again.');
      toast.error('Failed to create support query.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setSubmitError(null);
    toast.success('Form cleared successfully.');
  };

  // Right-side banner illustration
  const bannerIllustration = (
    <svg className="w-24 h-24 text-blue-500/20 shrink-0" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background shapes */}
      <circle cx="90" cy="80" r="16" fill="#eff6ff" />
      <path d="M10 50C25 40 40 40 55 50" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M70 30C80 35 90 30 100 40" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="3 3" />
      
      {/* Document page */}
      <rect x="30" y="20" width="50" height="66" rx="6" fill="white" stroke="#3b82f6" strokeWidth="2.5" />
      <line x1="40" y1="35" x2="70" y2="35" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="47" x2="65" y2="47" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="59" x2="70" y2="59" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="71" x2="60" y2="71" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />

      {/* Floating Plus Circle Badge */}
      <circle cx="85" cy="75" r="16" fill="#3b82f6" stroke="white" strokeWidth="3" />
      <path d="M85 69V81M79 75H91" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className="font-sans">
      
      {/* Title Banner Header card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between mb-6 overflow-hidden relative">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
            <FiFileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Create Query</h1>
            <p className="text-xs text-gray-500 mt-1">Submit a new customer support query into the CRM workspace.</p>
          </div>
        </div>
        <div className="hidden sm:block">
          {bannerIllustration}
        </div>
      </div>
      
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-650 font-semibold">
          {submitError}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Customer Name */}
            <div className="flex flex-col space-y-1.5 w-full">
              <label className="text-xs font-semibold text-gray-700">
                Customer Name <span className="text-red-500">*</span>
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
                  placeholder="Enter customer's full name"
                  value={formData.customerName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                />
              </div>
              {errors.customerName && <span className="text-xs text-red-500">{errors.customerName}</span>}
            </div>

            {/* Customer Email */}
            <div className="flex flex-col space-y-1.5 w-full">
              <label className="text-xs font-semibold text-gray-700">
                Customer Email <span className="text-red-500">*</span>
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
                  placeholder="Enter customer's email address"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
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
                placeholder="Summary of the support issue"
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                maxLength={150}
                required
                className="w-full px-3 py-2 text-sm outline-none bg-transparent"
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium pt-0.5">
              <span>{errors.subject ? <span className="text-red-500">{errors.subject}</span> : ""}</span>
              <span>{formData.subject?.length || 0} / 150 characters</span>
            </div>
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
                rows={6}
                placeholder="Detailed context of the customer query..."
                value={formData.description}
                onChange={handleChange}
                disabled={isSubmitting}
                maxLength={2000}
                required
                className="w-full px-3 py-2 text-sm outline-none bg-transparent resize-none"
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium pt-0.5">
              <span>{errors.description ? <span className="text-red-500">{errors.description}</span> : ""}</span>
              <span>{formData.description?.length || 0} / 2000 characters</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
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
                    required
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
                    required
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

            {/* Status */}
            <div className="flex flex-col space-y-1.5 w-full">
              <label className="text-xs font-semibold text-gray-700">
                Status <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-stretch border rounded-lg overflow-hidden transition-all duration-200 bg-white
                ${errors.status 
                  ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-100' 
                  : 'border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100'}`}>
                <div className="flex items-center justify-center px-3.5 bg-slate-50 border-r border-gray-200 text-gray-400">
                  <FiCheckCircle className="h-4 w-4" />
                </div>
                <div className="relative flex-grow">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                    className="w-full px-3 py-2 pr-8 text-sm outline-none bg-transparent appearance-none"
                  >
                    {statusOptions.map((opt) => (
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
              {errors.status && <span className="text-xs text-red-500">{errors.status}</span>}
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
              Reset Form
            </Button>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Button
                variant="secondary"
                onClick={() => navigate('/queries')}
                disabled={isSubmitting}
                className="w-full sm:w-auto border border-gray-250 text-gray-600 hover:bg-gray-50 hover:text-gray-800 flex items-center justify-center"
              >
                <FiX className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-750 text-white flex items-center justify-center shadow-md shadow-blue-500/10"
              >
                <FiSend className="mr-2 h-4 w-4" />
                Create Query
              </Button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default CreateQuery;
