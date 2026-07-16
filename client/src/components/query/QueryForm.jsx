import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const QueryForm = ({
  formData = {
    customerName: '',
    customerEmail: '',
    subject: '',
    description: '',
    category: 'General',
    priority: 'Medium',
    status: 'Open'
  },
  errors = {},
  onChange,
  onSubmit,
  onReset,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Submit',
  disabled = false
}) => {
  const categoryOptions = [
    { value: 'Technical', label: 'Technical' },
    { value: 'Billing', label: 'Billing' },
    { value: 'Account', label: 'Account' },
    { value: 'General', label: 'General' }
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

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-4xl bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
      {/* 2 Column Field Grid on Desktop, 1 Column on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="customerName"
          name="customerName"
          label="Customer Name"
          placeholder="Enter customer's full name"
          value={formData.customerName}
          onChange={onChange}
          error={errors.customerName}
          required
          autoComplete="name"
          disabled={disabled || isSubmitting}
        />
        <Input
          id="customerEmail"
          name="customerEmail"
          label="Customer Email"
          type="email"
          placeholder="Enter customer's email address"
          value={formData.customerEmail}
          onChange={onChange}
          error={errors.customerEmail}
          required
          autoComplete="email"
          disabled={disabled || isSubmitting}
        />
      </div>

      <div className="space-y-1">
        <Input
          id="subject"
          name="subject"
          label="Subject"
          placeholder="Summary of the support issue"
          value={formData.subject}
          onChange={onChange}
          error={errors.subject}
          required
          maxLength={150}
          disabled={disabled || isSubmitting}
        />
        <div className="flex justify-end text-xs text-gray-400 font-medium">
          <span>{formData.subject?.length || 0} / 150 characters</span>
        </div>
      </div>

      <div className="space-y-1">
        <Input
          id="description"
          name="description"
          label="Description"
          type="textarea"
          rows={6}
          placeholder="Detailed context of the customer query..."
          value={formData.description}
          onChange={onChange}
          error={errors.description}
          required
          maxLength={2000}
          disabled={disabled || isSubmitting}
        />
        <div className="flex justify-end text-xs text-gray-400 font-medium">
          <span>{formData.description?.length || 0} / 2000 characters</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Select
          id="category"
          name="category"
          label="Category"
          value={formData.category}
          onChange={onChange}
          options={categoryOptions}
          error={errors.category}
          required
          disabled={disabled || isSubmitting}
          placeholder=""
        />
        <Select
          id="priority"
          name="priority"
          label="Priority"
          value={formData.priority}
          onChange={onChange}
          options={priorityOptions}
          required
          disabled={disabled || isSubmitting}
          placeholder=""
        />
        <Select
          id="status"
          name="status"
          label="Status"
          value={formData.status}
          onChange={onChange}
          options={statusOptions}
          required
          disabled={disabled || isSubmitting}
          placeholder=""
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-150">
        <div>
          {onReset && (
            <Button
              variant="outline"
              onClick={onReset}
              disabled={disabled || isSubmitting}
              className="w-full sm:w-auto"
            >
              Reset Form
            </Button>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {onCancel && (
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={disabled || isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={disabled || isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Creating...' : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QueryForm;
