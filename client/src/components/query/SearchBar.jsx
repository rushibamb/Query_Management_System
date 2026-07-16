import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value = '', onChange, placeholder = 'Search queries...' }) => {
  return (
    <div className="relative w-full md:max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <FiSearch aria-hidden="true" className="h-4 w-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;
