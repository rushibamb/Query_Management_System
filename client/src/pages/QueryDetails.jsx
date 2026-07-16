import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import DeleteConfirmationModal from '../components/query/DeleteConfirmationModal';
import { getQueryById, deleteQuery } from '../services/queryService';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiArrowLeft, FiUser, FiMail, FiCalendar, FiClock, FiAlertCircle } from 'react-icons/fi';

const QueryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Detail loading and modal status states
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Load ticket details from API
  const fetchQueryDetails = async () => {
    setIsLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const response = await getQueryById(id);
      if (response.success && response.data) {
        setQuery(response.data);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      if (err.status === 404 || (err.message && err.message.includes('404'))) {
        setNotFound(true);
      } else {
        setError(err.message || 'Failed to retrieve query details from server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueryDetails();
  }, [id]);

  // Execute soft-delete
  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await deleteQuery(id);
      if (response.success) {
        toast.success('Query deleted successfully.');
        setIsDeleteModalOpen(false);
        navigate('/queries');
      }
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete query. Please try again.');
      toast.error('Failed to delete query');
    } finally {
      setIsDeleting(false);
    }
  };

  // If query is not found (404 status)
  if (notFound) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <div className="p-4 bg-gray-100 rounded-full text-gray-500 mb-4" aria-hidden="true">
          <FiAlertCircle className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Query Not Found</h2>
        <p className="text-sm text-gray-600 mt-2 max-w-sm">
          The support query you are trying to view does not exist or has been permanently archived.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate('/queries')}>
            <FiArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Queries
          </Button>
        </div>
      </div>
    );
  }

  // If network connection failed
  if (error) {
    return (
      <div>
        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate('/queries')}
            className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
          >
            <FiArrowLeft className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
            Back to Queries
          </button>
        </div>
        <div className="bg-red-50 border border-red-200 p-8 rounded-xl text-center max-w-lg mx-auto mt-8 shadow-sm">
          <h3 className="text-lg font-semibold text-red-800">Connection Failure</h3>
          <p className="text-sm text-red-600 mt-2">{error}</p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Button variant="secondary" onClick={() => navigate('/queries')}>
              Back to Queries
            </Button>
            <Button variant="danger" onClick={fetchQueryDetails}>
              Retry Load
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Right actions header column block (desktop only)
  const headerAction = (
    <div className="hidden sm:flex items-center space-x-2">
      <Button
        variant="secondary"
        onClick={() => navigate(`/queries/${id}/edit`)}
      >
        <FiEdit2 className="mr-1.5 h-4 w-4" aria-hidden="true" />
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <FiTrash2 className="mr-1.5 h-4 w-4" aria-hidden="true" />
        Delete
      </Button>
    </div>
  );

  return (
    <div>
      <div className="mb-4">
        <button
          type="button"
          onClick={() => navigate('/queries')}
          className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
        >
          <FiArrowLeft className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
          Back to Queries
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Loader count={2} />
          </div>
          <div>
            <Loader count={1} />
          </div>
        </div>
      ) : (
        <>
          <PageHeader
            title="Query Details"
            description={`Ticket ref: #${query?._id}`}
            action={headerAction}
          />

          {/* Details split layouts: 2 Columns on desktop, 1 Column on Tablet/Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Card: Customer detail, Subject and description details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Customer Context</h3>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-sm text-gray-900 pb-6 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-50 text-blue-650 rounded-lg flex items-center justify-center font-bold mr-3" aria-hidden="true">
                      <FiUser className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Customer Name</p>
                      <p className="font-semibold text-gray-900">{query?.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-50 text-blue-650 rounded-lg flex items-center justify-center font-bold mr-3" aria-hidden="true">
                      <FiMail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Email Address</p>
                      <a href={`mailto:${query?.customerEmail}`} className="font-semibold text-blue-600 hover:underline">
                        {query?.customerEmail}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Subject</h4>
                  <p className="text-xl font-bold text-gray-900 mb-6 leading-snug">{query?.subject}</p>

                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 border border-gray-150 rounded-lg font-normal leading-relaxed">
                    {query?.description}
                  </p>
                </div>
              </Card>
            </div>

            {/* Right Card: Metadata lists */}
            <div className="space-y-6">
              <Card>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Ticket Details</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-600">Category</span>
                    <Badge value={query?.category} />
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-600">Priority</span>
                    <Badge value={query?.priority} />
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-600">Status</span>
                    <Badge value={query?.status} />
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                    <div className="flex items-center text-xs font-semibold text-gray-600">
                      <FiCalendar className="mr-1.5 h-3.5 w-3.5 text-gray-450" />
                      Created At
                    </div>
                    <span className="text-xs text-gray-700 font-medium">
                      {query?.createdAt ? new Date(query.createdAt).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <div className="flex items-center text-xs font-semibold text-gray-600">
                      <FiClock className="mr-1.5 h-3.5 w-3.5 text-gray-450" />
                      Last Updated
                    </div>
                    <span className="text-xs text-gray-700 font-medium">
                      {query?.updatedAt ? new Date(query.updatedAt).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Mobile & Tablet Full-width Action Column */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3 sm:hidden">
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/queries/${id}/edit`)}
                    className="w-full"
                  >
                    <FiEdit2 className="mr-1.5 h-4 w-4" aria-hidden="true" />
                    Edit Ticket
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="w-full"
                  >
                    <FiTrash2 className="mr-1.5 h-4 w-4" aria-hidden="true" />
                    Delete Ticket
                  </Button>
                </div>
              </Card>

              {/* Reusable Audit Trail Card */}
              <Card>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Audit Information</h3>
                <div className="space-y-4 text-xs font-sans">
                  {/* Created By details */}
                  <div className="border-b border-gray-100 pb-3">
                    <p className="font-semibold text-gray-500">Created By</p>
                    {query?.createdBy ? (
                      <div className="mt-1 space-y-0.5">
                        <p className="font-bold text-gray-900">{query.createdBy.name}</p>
                        <p className="text-gray-500">{query.createdBy.email}</p>
                        <p className="text-gray-400 text-[10px] mt-1">
                          {query?.createdAt ? new Date(query.createdAt).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 mt-1 italic font-medium">System generated</p>
                    )}
                  </div>

                  {/* Updated By details */}
                  <div>
                    <p className="font-semibold text-gray-500">Last Updated By</p>
                    {query?.updatedBy ? (
                      <div className="mt-1 space-y-0.5">
                        <p className="font-bold text-gray-900">{query.updatedBy.name}</p>
                        <p className="text-gray-500">{query.updatedBy.email}</p>
                        <p className="text-gray-400 text-[10px] mt-1">
                          {query?.updatedAt ? new Date(query.updatedAt).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 mt-1 italic font-medium">Not updated yet</p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setDeleteError(null);
            }}
            onConfirm={handleDelete}
            isDeleting={isDeleting}
            itemName="query"
            error={deleteError}
          />
        </>
      )}
    </div>
  );
};

export default QueryDetails;
