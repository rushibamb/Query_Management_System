import React from 'react';
import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';
import ProfileDropdown from '../auth/ProfileDropdown';

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 shadow-sm">
      <div className="flex items-center space-x-4 flex-1">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <FiMenu className="h-5 w-5" aria-hidden="true" />
        </button>
        
        {/* Search Bar - hidden on mobile, visible on desktop */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-50 border border-gray-200 rounded-lg px-3 py-1.5 w-64 max-w-sm focus-within:border-blue-600 transition-colors">
          <FiSearch className="text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent border-none outline-none text-xs text-gray-600 w-full"
            disabled
          />
          <kbd className="px-1.5 py-0.5 border border-gray-200 bg-white rounded text-[10px] text-gray-400 font-mono select-none">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors relative"
          aria-label="Notifications"
        >
          <FiBell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-blue-500 rounded-full border-2 border-white"></span>
        </button>
        
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Navbar;
