/**
 * Validates the Customer Query Form fields
 * @param {Object} formData - Form input data
 * @returns {Object} Validation error messages keyed by input name
 */
export const validateQuery = (formData) => {
  const errors = {};

  // Customer Name Validation
  if (!formData.customerName || !formData.customerName.trim()) {
    errors.customerName = 'Customer name is required';
  } else if (formData.customerName.length > 100) {
    errors.customerName = 'Customer name cannot exceed 100 characters';
  }

  // Customer Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.customerEmail || !formData.customerEmail.trim()) {
    errors.customerEmail = 'Customer email is required';
  } else if (!emailRegex.test(formData.customerEmail)) {
    errors.customerEmail = 'Please enter a valid email address';
  }

  // Subject Validation
  if (!formData.subject || !formData.subject.trim()) {
    errors.subject = 'Subject is required';
  } else if (formData.subject.length > 150) {
    errors.subject = 'Subject cannot exceed 150 characters';
  }

  // Description Validation
  if (!formData.description || !formData.description.trim()) {
    errors.description = 'Description is required';
  } else if (formData.description.length > 2000) {
    errors.description = 'Description cannot exceed 2000 characters';
  }

  // Category Validation
  if (!formData.category) {
    errors.category = 'Category is required';
  }

  // Priority Validation
  if (!formData.priority) {
    errors.priority = 'Priority is required';
  }

  // Status Validation
  if (!formData.status) {
    errors.status = 'Status is required';
  }

  return errors;
};
