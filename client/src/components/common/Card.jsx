import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  actions,
  className = ''
}) => {
  const hasHeader = title || subtitle || actions;

  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 ${className}`}>
      {hasHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-150 mb-6 gap-4">
          <div>
            {title && <h3 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center space-x-3 shrink-0">{actions}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;
