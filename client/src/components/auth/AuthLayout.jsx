import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 select-none font-sans">
      <div className="w-full max-w-[480px]">
        {/* Logo Header */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <span className="h-7 w-7 bg-blue-600 rounded flex items-center justify-center font-extrabold text-white text-xs select-none">Q</span>
          <span className="text-lg font-bold text-gray-900 tracking-wide">QMS Admin</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
