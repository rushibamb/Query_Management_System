import React from 'react';

const AuthLoading = ({ message = 'Preparing application...' }) => {
  return (
    <div className="min-h-screen w-screen bg-gray-50 flex items-center justify-center p-6 select-none font-sans">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center space-y-6">
        {/* Centered branding logo */}
        <div className="flex items-center justify-center space-x-2">
          <span className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center font-extrabold text-white text-base">Q</span>
          <span className="text-xl font-bold text-gray-900 tracking-wide">QMS Admin</span>
        </div>
        
        {/* Animated pulse skeleton bar */}
        <div className="flex flex-col items-center space-y-3" aria-hidden="true">
          <div className="h-1 bg-blue-100 rounded-full w-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full w-1/3 animate-pulse"></div>
          </div>
          <span className="text-xs font-semibold text-gray-550 tracking-wide uppercase animate-pulse">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthLoading;
