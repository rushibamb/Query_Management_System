import React from 'react';

const Select = ({
  id,
  name,
  label,
  value = '',
  onChange,
  options = [],
  required = false,
  error = '',
  disabled = false,
  className = '',
  placeholder = 'Select option',
  ...props
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-gray-700">
          {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-3 py-2 border rounded-lg text-sm bg-white transition-all duration-200 outline-none appearance-none
            ${error 
              ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-100' 
              : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'} 
            disabled:bg-gray-50 disabled:text-gray-400`}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt, index) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={index} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {error && (
        <span id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Select;
