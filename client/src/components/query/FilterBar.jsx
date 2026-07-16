import React from 'react';
import Select from '../common/Select';

const FilterBar = ({
  status = '',
  priority = '',
  category = '',
  onStatusChange,
  onPriorityChange,
  onCategoryChange
}) => {
  const statusOptions = [
    { value: 'Open', label: 'Open' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' }
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' }
  ];

  const categoryOptions = [
    { value: 'Technical', label: 'Technical' },
    { value: 'Billing', label: 'Billing' },
    { value: 'Account', label: 'Account' },
    { value: 'General', label: 'General' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
      <Select
        id="filter-status"
        name="status"
        value={status}
        onChange={onStatusChange}
        options={statusOptions}
        placeholder="All Statuses"
        className="w-full sm:w-40"
      />
      <Select
        id="filter-priority"
        name="priority"
        value={priority}
        onChange={onPriorityChange}
        options={priorityOptions}
        placeholder="All Priorities"
        className="w-full sm:w-40"
      />
      <Select
        id="filter-category"
        name="category"
        value={category}
        onChange={onCategoryChange}
        options={categoryOptions}
        placeholder="All Categories"
        className="w-full sm:w-40"
      />
    </div>
  );
};

export default FilterBar;
