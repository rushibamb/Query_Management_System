import React from 'react';

const PageHeader = ({ title, description, action }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-200 mb-6 gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      {action && (
        <div className="flex items-center space-x-3 shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
