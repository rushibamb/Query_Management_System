import React from 'react';

const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AuthHeader;
