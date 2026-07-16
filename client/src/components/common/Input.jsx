import React from 'react';

const Input = ({
  id,
  name,
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  required = false,
  error = '',
  disabled = false,
  className = '',
  rows = 4,
  ...props
}) => {
  const isTextarea = type === 'textarea';
  
  const inputStyle = `w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200 outline-none
    ${error 
      ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-100' 
      : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'} 
    disabled:bg-gray-50 disabled:text-gray-400`;

  return (
    <div className={`flex flex-col space-y-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-gray-700">
          {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
      )}
      
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={inputStyle}
          {...props}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={inputStyle}
          {...props}
        />
      )}
      
      {error && (
        <span id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
