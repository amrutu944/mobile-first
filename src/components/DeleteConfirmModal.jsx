import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, task }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="modal-container delete-confirm-modal"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <div className="delete-modal-header">
          <div className="delete-icon-box">
            <AlertTriangle size={24} className="text-danger" />
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="delete-modal-body">
          <h2 id="delete-dialog-title" className="delete-modal-title">
            Delete Task Confirmation
          </h2>
          <p id="delete-dialog-desc" className="delete-modal-text">
            Are you sure you want to delete <strong className="highlight-task-name">"{task.title}"</strong>? 
            This action will permanently remove this task and cannot be undone.
          </p>
        </div>

        <div className="delete-modal-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={() => {
              onConfirm(task.id);
              onClose();
            }}
          >
            <Trash2 size={16} />
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}
