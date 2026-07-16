import React from 'react';

const Badge = ({ value, type = 'status' }) => {
  const getStyles = () => {
    const val = value?.toLowerCase() || '';

    // Status classes
    if (val === 'open') {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    if (val === 'in progress') {
      return 'bg-orange-50 text-orange-700 border-orange-200';
    }
    if (val === 'resolved') {
      return 'bg-green-50 text-green-700 border-green-200';
    }

    // Priority classes
    if (val === 'high') {
      return 'bg-red-50 text-red-700 border-red-200';
    }
    if (val === 'medium') {
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
    if (val === 'low') {
      return 'bg-slate-100 text-slate-700 border-slate-200';
    }

    // Default tag / Category
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border select-none ${getStyles()}`}>
      {value}
    </span>
  );
};

export default Badge;
