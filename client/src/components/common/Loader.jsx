import React from 'react';

const Loader = ({ variant = 'card', count = 1 }) => {
  const renderSkeletons = () => {
    return Array.from({ length: count }).map((_, idx) => {
      // Table Skeleton Rows
      if (variant === 'table') {
        return (
          <div key={idx} className="animate-pulse flex items-center space-x-6 py-4 border-b border-gray-150" aria-hidden="true">
            <div className="h-4 bg-gray-200 rounded w-1/5"></div>
            <div className="h-4 bg-gray-200 rounded w-1/5"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/12"></div>
            <div className="h-4 bg-gray-200 rounded w-1/12"></div>
            <div className="h-4 bg-gray-200 rounded w-1/12"></div>
          </div>
        );
      }

      // Form Fields Skeleton
      if (variant === 'form') {
        return (
          <div key={idx} className="animate-pulse space-y-6 w-full" aria-hidden="true">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/12"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/12"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        );
      }

      // Card Skeleton
      return (
        <div key={idx} className="animate-pulse bg-white border border-gray-200 rounded-xl p-6 space-y-4" aria-hidden="true">
          <div className="h-4 bg-gray-250 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      );
    });
  };

  return <>{renderSkeletons()}</>;
};

export default Loader;
