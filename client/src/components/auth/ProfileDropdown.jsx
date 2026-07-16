import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdmin, clearAuth } from '../../utils/authStorage';
import toast from 'react-hot-toast';
import { FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const admin = getAdmin();

  // Get initials (e.g. John Doe -> JD)
  const getInitials = (name) => {
    if (!name) return 'AD';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const initials = getInitials(admin?.name);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Close dropdown on Escape keydown
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Handle Logout
  const handleLogout = () => {
    clearAuth();
    toast.success('Signed out successfully.');
    navigate('/');
    // Force a fresh refresh to reload root router configurations
    window.location.reload();
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  return (
    <div ref={dropdownRef} className="relative font-sans">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
      >
        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xs select-none">
          {initials}
        </div>
        <div className="hidden sm:flex flex-col items-start text-left leading-none space-y-0.5">
          <span className="text-xs font-bold text-gray-900 leading-tight">
            {admin?.name || 'admin'}
          </span>
          <span className="text-[10px] font-medium text-gray-400">
            Administrator
          </span>
        </div>
        <FiChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Container overlay */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1.5 focus:outline-none transition-all duration-200">
          {/* Header metadata details */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3 select-none">
            <div className="h-10 w-10 bg-blue-50 text-blue-650 rounded-full flex items-center justify-center font-bold text-sm select-none">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 truncate leading-tight">{admin?.name || 'Administrator'}</p>
              <p className="text-[10px] text-gray-450 truncate mt-0.5">{admin?.email || 'admin@example.com'}</p>
            </div>
          </div>

          {/* Action links */}
          <div className="py-1">
            <button
              type="button"
              onClick={handleProfileClick}
              className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-all duration-150"
            >
              <FiUser className="h-4 w-4 text-gray-400" />
              <span>Profile Details</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-xs font-semibold text-red-650 hover:bg-red-50 flex items-center space-x-2 transition-all duration-150"
            >
              <FiLogOut className="h-4 w-4 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
