import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import AuthHeader from '../components/auth/AuthHeader';
import PasswordInput from '../components/auth/PasswordInput';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { register } from '../services/authService';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();

  // Form input and loading states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [setupAlreadyDone, setSetupAlreadyDone] = useState(false);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clean inline validation warnings
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation checks
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length > 60) {
      newErrors.name = 'Name cannot exceed 60 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle register submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      toast.error('Please correct the validation errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await register(formData);
      if (response.success) {
        toast.success('Administrator account created successfully.');
        // Reinitialize the page setup status by reloading window or directly routing
        // Direct route to login works cleanly
        navigate('/login');
      }
    } catch (err) {
      if (err.status === 403 || (err.message && err.message.includes('403'))) {
        setSetupAlreadyDone(true);
        toast.error('Admin setup already completed.');
      } else {
        setSubmitError(err.message || 'Registration failed. Please try again.');
        toast.error('Failed to create account.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render setup lock-out screen if admin exists
  if (setupAlreadyDone) {
    return (
      <AuthLayout>
        <AuthHeader
          title="Setup Completed"
          subtitle="System setup has already been completed. Please sign in."
        />
        <div className="pt-4 text-center">
          <Button onClick={() => navigate('/login')} className="w-full">
            Go to Login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Create First Administrator"
        subtitle="Set up the first administrator account for the Customer Query Management System."
      />

      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          name="name"
          label="Full Name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          autoComplete="name"
          disabled={isSubmitting}
        />

        <Input
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="admin@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          autoComplete="email"
          disabled={isSubmitting}
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          autoComplete="new-password"
          disabled={isSubmitting}
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
          disabled={isSubmitting}
        />

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="w-full justify-center"
          >
            {isSubmitting ? 'Creating Account...' : 'Register'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
