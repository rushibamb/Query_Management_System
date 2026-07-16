import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
  itemName = 'query',
  error = null
}) => {
  const footerContent = (
    <>
      <Button
        variant="secondary"
        onClick={onClose}
        disabled={isDeleting}
      >
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={onConfirm}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete ${itemName.charAt(0).toUpperCase() + itemName.slice(1)}`}
      footer={footerContent}
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-650 font-medium">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <p className="text-sm text-gray-900 font-semibold">
            Are you sure you want to delete this {itemName}?
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            This action can be reversed by restoring it directly from the database.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
