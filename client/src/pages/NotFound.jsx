import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { getToken } from '../utils/authStorage';

const NotFound = () => {
  const navigate = useNavigate();
  const token = getToken();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 select-none font-sans">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center space-y-6">
        <div className="flex justify-center text-blue-650 mb-2">
          <span className="text-6xl font-extrabold">404</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Page Not Found</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          The link you followed may be broken, or the page may have been removed. Let's get you back to safety.
        </p>
        <div className="pt-2">
          <Button onClick={() => navigate(token ? '/dashboard' : '/')}>
            {token ? 'Back to Dashboard' : 'Back to Home'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
