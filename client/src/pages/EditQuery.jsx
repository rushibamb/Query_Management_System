import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import QueryForm from '../components/query/QueryForm';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import { getQueryById, updateQuery } from '../services/queryService';
import { validateQuery } from '../utils/validators';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';

const EditQuery = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Form input and loading states
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    subject: '',
    description: '',
    category: 'General',
    priority: 'Medium',
    status: 'Open'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Fetch target query details
  const fetchQueryDetails = async () => {
    setIsLoading(true);
    setNotFound(false);
    setSubmitError(null);
    try {
      const response = await getQueryById(id);
      if (response.success && response.data) {
        const { customerName, customerEmail, subject, description, category, priority, status } = response.data;
        setFormData({
          customerName: customerName || '',
          customerEmail: customerEmail || '',
          subject: subject || '',
          description: description || '',
          category: category || 'General',
          priority: priority || 'Medium',
          status: status || 'Open'
        });
      } else {
        setNotFound(true);
      }
    } catch (err) {
      if (err.status === 404 || (err.message && err.message.includes('404'))) {
        setNotFound(true);
      } else {
        setSubmitError(err.message || 'Failed to retrieve query details.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueryDetails();
  }, [id]);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Remove field validation warning on type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Run validation
  const validateForm = () => {
    const newErrors = validateQuery(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      toast.error('Please correct the validation errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await updateQuery(id, formData);
      if (response.success) {
        toast.success('Query updated successfully.');
        navigate(`/queries/${id}`);
      }
    } catch (err) {
      setSubmitError(err.message || 'Failed to update support query.');
      toast.error('Failed to update support query.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 404 Not Found layout
  if (notFound) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <div className="p-4 bg-gray-100 rounded-full text-gray-500 mb-4" aria-hidden="true">
          <FiAlertCircle className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Query Not Found</h2>
        <p className="text-sm text-gray-600 mt-2 max-w-sm">
          The support query you are attempting to edit does not exist or has been permanently archived.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate('/queries')}>
            <FiArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Queries
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <button
          type="button"
          onClick={() => navigate(`/queries/${id}`)}
          className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
        >
          <FiArrowLeft className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
          Cancel and Go Back
        </button>
      </div>

      <PageHeader
        title="Edit Query"
        description="Update ticket classification parameters and client details."
      />

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
          {submitError}
        </div>
      )}

      <div className="mt-6">
        {isLoading ? (
          <div className="max-w-4xl bg-white border border-gray-200 p-6 rounded-xl space-y-6">
            <Loader variant="form" count={1} />
          </div>
        ) : (
          <QueryForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/queries/${id}`)}
            isSubmitting={isSubmitting}
            submitLabel="Save Changes"
          />
        )}
      </div>
    </div>
  );
};

export default EditQuery;
