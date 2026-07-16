import React from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Table from '../common/Table';
import { FiEye, FiEdit2, FiTrash2, FiInbox } from 'react-icons/fi';

const QueryTable = ({
  queries = [],
  isLoading = false,
  onViewDetails,
  onEditDetails,
  onDeleteDetails
}) => {
  const columns = [
    'Customer',
    'Email',
    'Subject',
    'Category',
    'Priority',
    'Status',
    'Created At',
    { header: 'Actions', align: 'right' }
  ];

  const emptyState = (
    <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-12 bg-white text-center">
      <div className="p-4 bg-gray-50 rounded-full text-gray-400 mb-4" aria-hidden="true">
        <FiInbox className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No Queries Found</h3>
      <p className="text-sm text-gray-600 mt-1 max-w-sm">
        No matches could be found. Adjust your search criteria or filter choices and try again.
      </p>
    </div>
  );

  const renderRow = (query) => (
    <tr key={query._id} className="hover:bg-gray-50/50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
        {query.customerName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
        {query.customerEmail}
      </td>
      <td className="px-6 py-4 text-gray-655 max-w-xs truncate">
        {query.subject}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge value={query.category} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge value={query.priority} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge value={query.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
        {query.createdAt ? new Date(query.createdAt).toLocaleDateString() : 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
        <div className="flex items-center justify-end space-x-1.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(query._id)}
            title="View Details"
            aria-label={`View details of query from ${query.customerName}`}
            className="p-2"
          >
            <FiEye className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEditDetails(query._id)}
            title="Edit Details"
            aria-label={`Edit query from ${query.customerName}`}
            className="p-2"
          >
            <FiEdit2 className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDeleteDetails(query._id)}
            title="Soft Delete"
            aria-label={`Delete query from ${query.customerName}`}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <FiTrash2 className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <Table
      columns={columns}
      data={queries}
      renderRow={renderRow}
      emptyState={emptyState}
      isLoading={isLoading}
    />
  );
};

export default QueryTable;
