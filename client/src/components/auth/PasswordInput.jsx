import React, { useState } from 'react';
import Input from '../common/Input';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder = '••••••••',
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        id={id}
        name={name}
        label={label}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        error={error}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        disabled={disabled}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 focus:text-gray-900 transition-colors duration-250 outline-none"
      >
        {showPassword ? (
          <FiEyeOff className="h-4 w-4" aria-hidden="true" />
        ) : (
          <FiEye className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
