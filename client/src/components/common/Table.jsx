import React from 'react';
import Loader from './Loader';

const Table = ({
  columns = [],
  data = [],
  renderRow,
  emptyState,
  isLoading = false,
  responsive = true,
  stickyHeader = false
}) => {
  const tableWrapperClass = `border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm ${
    responsive ? 'overflow-x-auto' : ''
  }`;

  const headerClass = `bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
    stickyHeader ? 'sticky top-0 bg-gray-50 z-10' : ''
  }`;

  if (isLoading) {
    return (
      <div className={tableWrapperClass}>
        <div className="p-6 space-y-4">
          <Loader variant="table" count={5} />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return emptyState || (
      <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-12 bg-white text-center">
        <h4 className="text-sm font-semibold text-gray-900">No Data Available</h4>
      </div>
    );
  }

  return (
    <div className={tableWrapperClass}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={headerClass}>
          <tr>
            {columns.map((col, index) => {
              const headerText = typeof col === 'object' ? col.header : col;
              const alignment = typeof col === 'object' && col.align === 'right' ? 'text-right' : 'text-left';
              return (
                <th key={index} scope="col" className={`px-6 py-3.5 ${alignment}`}>
                  {headerText}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-900">
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
