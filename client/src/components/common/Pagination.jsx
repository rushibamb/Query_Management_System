import React from 'react';
import Button from './Button';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  limit = 10
}) => {
  const startIdx = (currentPage - 1) * limit + 1;
  const endIdx = Math.min(currentPage * limit, totalItems);

  // Generate page numbers range
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-4 sm:px-6 rounded-xl mt-6 shadow-sm border select-none">
      {/* Mobile view */}
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{totalItems > 0 ? startIdx : 0}</span> to{' '}
            <span className="font-semibold text-gray-900">{endIdx}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm space-x-1" aria-label="Pagination">
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </Button>
            
            {pages.map((p) => (
              <Button
                key={p}
                variant={currentPage === p ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onPageChange(p)}
                className="w-9 h-9 p-0"
              >
                {p}
              </Button>
            ))}

            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
