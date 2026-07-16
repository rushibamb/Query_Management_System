import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { login } from '../services/authService';
import { saveToken, saveAdmin } from '../utils/authStorage';
import toast from 'react-hot-toast';
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiLogIn, 
  FiShield, 
  FiTrendingUp, 
  FiUsers 
} from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);

  // Form input and loading states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Focus email input field on mount
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  // Field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clean inline validation warnings on type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation checks
  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit login trigger
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      toast.error('Please correct the validation errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      const sanitizedEmail = formData.email.trim().toLowerCase();
      const response = await login({
        email: sanitizedEmail,
        password: formData.password
      });

      if (response.success && response.data) {
        // Save authorization token and profile metadata details
        saveToken(response.data.token);
        saveAdmin(response.data.admin);
        
        toast.success('Welcome back!');
        
        // Direct route redirect back to App's home page (Dashboard)
        navigate('/dashboard');
        // Force window refresh to trigger App.jsx initialization check & reload state
        window.location.reload();
      }
    } catch (err) {
      // 401 status represents bad passwords/unregistered accounts
      if (err.status === 401 || (err.message && err.message.includes('401'))) {
        setSubmitError('Invalid email or password.');
      } else {
        setSubmitError(err.message || 'Login connection failed. Please try again.');
      }
      toast.error('Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 select-none font-sans relative overflow-hidden">
      
      {/* Decorative Background Accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-x-24 -translate-y-24 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl translate-x-24 translate-y-24 -z-10"></div>

      {/* Top Branding Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center space-x-2.5 mb-2">
          <span className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-extrabold text-white text-base shadow-sm">Q</span>
          <span className="text-xl font-bold text-gray-900 tracking-tight">QMS Admin</span>
        </div>
        <p className="text-xs text-gray-500 font-medium tracking-wide">Sign in to your admin account</p>
      </div>

      {/* 2-Column Main Login Card */}
      <div className="w-full max-w-[900px] bg-white border border-gray-200 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        
        {/* Left Column: Info Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-8 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-gray-150">
          
          {/* Centered Graphic Lock/Shield */}
          <div className="my-auto py-6 space-y-6 flex flex-col items-center text-center">
            <div className="relative">
              <div className="h-24 w-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-blue-650 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm">
                <svg className="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Secure Admin Access</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[220px] mx-auto">
                Manage customer queries, track issues, and deliver better support.
              </p>
            </div>

            {/* List of Features */}
            <div className="w-full max-w-[240px] text-left space-y-4 pt-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <FiShield className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-xs">Secure & Protected</h4>
                  <p className="text-[10px] text-gray-500">Your data is safe and encrypted</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <FiTrendingUp className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-xs">Real-time Insights</h4>
                  <p className="text-[10px] text-gray-500">Track and manage queries efficiently</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <FiUsers className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-xs">Admin Control</h4>
                  <p className="text-[10px] text-gray-500">Full control over support operations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom waves detail */}
          <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden pointer-events-none">
            <svg className="w-full h-full text-blue-100/50 fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,100 C30,50 70,60 100,100 Z" />
            </svg>
          </div>
        </div>

        {/* Right Column: Form Panel */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">Welcome Back</h2>
            <div className="w-10 h-1 bg-blue-600 rounded-full mt-2.5"></div>
            <p className="text-sm text-gray-500 mt-4">
              Sign in to continue managing customer queries.
            </p>
          </div>

          {submitError && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-650 font-medium">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address */}
            <div className="flex flex-col space-y-1.5 w-full">
              <label htmlFor="email" className="text-xs font-semibold text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-stretch border rounded-lg overflow-hidden transition-all duration-200 bg-white
                ${errors.email 
                  ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-100' 
                  : 'border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100'}`}>
                <div className="flex items-center justify-center px-3.5 bg-slate-50 border-r border-gray-200 text-gray-400">
                  <FiMail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  ref={emailRef}
                  required
                  autoComplete="email"
                  className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                />
              </div>
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1.5 w-full">
              <label htmlFor="password" className="text-xs font-semibold text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-stretch border rounded-lg overflow-hidden transition-all duration-200 bg-white
                ${errors.password 
                  ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-100' 
                  : 'border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100'}`}>
                <div className="flex items-center justify-center px-3.5 bg-slate-50 border-r border-gray-200 text-gray-400">
                  <FiLock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  autoComplete="current-password"
                  className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
              <div className="flex justify-end pt-1">
                <span className="text-xs text-blue-600 cursor-not-allowed select-none font-semibold hover:underline" title="Self-service resets are currently locked">
                  Forgot Password? (Coming Soon)
                </span>
              </div>
            </div>

            {/* Testing Credentials Info Box */}
            <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl text-slate-600 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block">Testing Mode Only</span>
              <p className="text-[11px] leading-relaxed">
                Use email <strong className="font-bold select-all text-blue-600 bg-blue-50 px-1 py-0.5 rounded">admin@example.com</strong> and password <strong className="font-bold select-all text-blue-600 bg-blue-50 px-1 py-0.5 rounded">admin123</strong>
              </p>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isSubmitting}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-150 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="ml-2 text-xs font-semibold text-gray-700 select-none cursor-pointer">
                Remember Me
              </label>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="w-full justify-center bg-blue-600 hover:bg-blue-750 text-white flex items-center shadow-md shadow-blue-500/10"
              >
                <FiLogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </div>
          </form>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-gray-400 flex items-center justify-center space-x-1.5">
        <FiShield className="h-3.5 w-3.5 text-gray-400" />
        <span>&copy; {new Date().getFullYear()} Customer Query Management System. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default Login;
