import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import SearchBar from '../components/query/SearchBar';
import FilterBar from '../components/query/FilterBar';
import QueryTable from '../components/query/QueryTable';
import Pagination from '../components/query/Pagination';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import DeleteConfirmationModal from '../components/query/DeleteConfirmationModal';
import { getQueries, deleteQuery } from '../services/queryService';
import useDebounce from '../hooks/useDebounce';
import toast from 'react-hot-toast';
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiRefreshCw, FiInbox, FiAlertCircle } from 'react-icons/fi';

const QueryList = () => {
  const navigate = useNavigate();

  // Search, filter, and pagination states
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Data fetching and UI status states
  const [queries, setQueries] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Soft deletion states
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Fetch queries from Express API
  const fetchQueries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit,
        search: debouncedSearch.trim() || undefined,
        status: status || undefined,
        priority: priority || undefined,
        category: category || undefined
      };
      
      const response = await getQueries(params);
      if (response.success) {
        setQueries(response.data);
        setPagination(response.pagination);
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to backend server. Please verify your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger query fetch on parameter changes
  useEffect(() => {
    fetchQueries();
  }, [debouncedSearch, status, priority, category, page, limit]);

  // Reset page parameter to 1 whenever filters change to avoid out-of-bounds offsets
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, priority, category]);

  // Clear search and filter states
  const handleResetFilters = () => {
    setSearch('');
    setStatus('');
    setPriority('');
    setCategory('');
    setPage(1);
  };

  // Open soft delete confirm dialog
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteError(null);
    setIsDeleteModalOpen(true);
  };

  // Execute soft-delete operation
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await deleteQuery(deleteId);
      if (response.success) {
        toast.success('Query deleted successfully.');
        setIsDeleteModalOpen(false);
        setDeleteId(null);
        // If final item was deleted on a paginated page, slide page back
        if (queries.length === 1 && page > 1) {
          setPage((prev) => prev - 1);
        } else {
          fetchQueries();
        }
      }
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete query. Please try again.');
      toast.error('Failed to delete query');
    } finally {
      setIsDeleting(false);
    }
  };

  const headerAction = (
    <Button onClick={() => navigate('/queries/new')}>
      <FiPlus className="mr-2 h-4 w-4" aria-hidden="true" />
      Create Query
    </Button>
  );

  // If connection fails, show reusable connection error panel
  if (error) {
    return (
      <div>
        <PageHeader
          title="Queries"
          description="Filter, search, and manage customer support requests."
        />
        <div className="bg-red-50 border border-red-200 p-8 rounded-xl text-center max-w-lg mx-auto mt-12 shadow-sm">
          <div className="flex justify-center text-red-500 mb-4" aria-hidden="true">
            <FiAlertCircle className="h-10 w-10" />
          </div>
          <h3 className="text-lg font-semibold text-red-800">Connection Error</h3>
          <p className="text-sm text-red-600 mt-2">{error}</p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Button variant="secondary" onClick={handleResetFilters}>
              Reset Filters
            </Button>
            <Button variant="danger" onClick={fetchQueries}>
              Retry Connection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Define custom empty state when query length is zero
  const emptyState = (
    <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-12 bg-white text-center">
      <div className="p-4 bg-gray-50 rounded-full text-gray-400 mb-4" aria-hidden="true">
        <FiInbox className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No Queries Found</h3>
      <p className="text-sm text-gray-600 mt-1 max-w-sm">
        No matches could be found. Adjust your search criteria or filter choices and try again.
      </p>
      <div className="mt-5">
        <Button variant="secondary" onClick={handleResetFilters}>
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Queries"
        description="Filter, search, and manage customer support requests."
        action={headerAction}
      />

      {/* Toolbar panel */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 mb-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex-grow">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, subject..."
          />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <FilterBar
            status={status}
            priority={priority}
            category={category}
            onStatusChange={(e) => setStatus(e.target.value)}
            onPriorityChange={(e) => setPriority(e.target.value)}
            onCategoryChange={(e) => setCategory(e.target.value)}
          />
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              onClick={handleResetFilters}
              title="Clear all search and filter tags"
              className="w-full sm:w-auto"
            >
              <FiRefreshCw className="mr-1.5 h-4 w-4" aria-hidden="true" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Query List Table */}
      {isLoading ? (
        <>
          {/* Desktop Skeleton */}
          <div className="hidden md:block">
            <QueryTable queries={[]} isLoading={true} />
          </div>
          {/* Mobile Card Skeletons */}
          <div className="block md:hidden space-y-4">
            <Loader variant="card" count={3} />
          </div>
        </>
      ) : queries.length === 0 ? (
        emptyState
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <QueryTable
              queries={queries}
              isLoading={false}
              onViewDetails={(id) => navigate(`/queries/${id}`)}
              onEditDetails={(id) => navigate(`/queries/${id}/edit`)}
              onDeleteDetails={(id) => openDeleteModal(id)}
            />
          </div>

          {/* Mobile Card Stack View */}
          <div className="block md:hidden space-y-4">
            {queries.map((q) => (
              <Card key={q._id} className="border border-gray-200">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">{q.customerName}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{q.customerEmail}</p>
                  </div>
                  <span className="text-xs text-gray-400 font-medium shrink-0">
                    {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-relaxed">
                    {q.subject}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <Badge value={q.category} />
                    <Badge value={q.priority} />
                    <Badge value={q.status} />
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 border-t border-gray-100 pt-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/queries/${q._id}`)}
                    className="flex-1"
                  >
                    <FiEye className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/queries/${q._id}/edit`)}
                    className="flex-1"
                  >
                    <FiEdit2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteModal(q._id)}
                    className="flex-1 text-red-650 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <FiTrash2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination navigation controls */}
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={(p) => setPage(p)}
            totalItems={pagination.total}
            limit={pagination.limit}
          />
        </>
      )}

      {/* Delete confirmation modal overlay */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteError(null);
          setDeleteId(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        itemName="query"
        error={deleteError}
      />
    </div>
  );
};

export default QueryList;
