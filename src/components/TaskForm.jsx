import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, Calendar, Tag, CheckSquare } from 'lucide-react';

export default function TaskForm({ isOpen, onClose, onSubmit, initialTask }) {
  const isEditing = Boolean(initialTask && initialTask.id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Design',
    status: 'To do',
    priority: 'Medium',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const titleInputRef = useRef(null);

  // Pre-populate when initialTask changes or resets
  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title || '',
        description: initialTask.description || '',
        category: initialTask.category || 'Design',
        status: initialTask.status || 'To do',
        priority: initialTask.priority || 'Medium',
        dueDate: initialTask.dueDate || new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Design',
        status: 'To do',
        priority: 'Medium',
        dueDate: new Date().toISOString().split('T')[0]
      });
    }
    setErrors({});
  }, [initialTask, isOpen]);

  // Focus title on open
  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      setTimeout(() => titleInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const trimmedTitle = formData.title.trim();

    if (!trimmedTitle) {
      newErrors.title = 'Task title is required and cannot be empty.';
    } else if (trimmedTitle.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long.';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="modal-container task-form-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-text">
            <h2 id="modal-title" className="modal-title">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="modal-subtitle">
              {isEditing 
                ? 'Update task details, priority or progress status.' 
                : 'Fill in the information below to add a new task to FocusBoard.'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          {/* Title Field (Required) */}
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Task Title <span className="required-star">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="task-title"
              name="title"
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g., Finalize UI components for dashboard"
              value={formData.title}
              onChange={handleChange}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <p id="title-error" className="error-message">
                <AlertCircle size={14} />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Description Field (Optional) */}
          <div className="form-group">
            <label htmlFor="task-desc" className="form-label">
              Description <span className="optional-tag">(Optional)</span>
            </label>
            <textarea
              id="task-desc"
              name="description"
              rows="3"
              className="form-textarea"
              placeholder="Add key context, requirements, or links..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Row: Category & Status */}
          <div className="form-row">
            <div className="form-group form-col">
              <label htmlFor="task-category" className="form-label">
                <Tag size={13} className="label-icon" /> Category
              </label>
              <select
                id="task-category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="Research">Research</option>
              </select>
            </div>

            <div className="form-group form-col">
              <label htmlFor="task-status" className="form-label">
                <CheckSquare size={13} className="label-icon" /> Status <span className="required-star">*</span>
              </label>
              <select
                id="task-status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Row: Priority & Due Date */}
          <div className="form-row">
            <div className="form-group form-col">
              <label htmlFor="task-priority" className="form-label">
                Priority <span className="required-star">*</span>
              </label>
              <select
                id="task-priority"
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="form-group form-col">
              <label htmlFor="task-due" className="form-label">
                <Calendar size={13} className="label-icon" /> Due Date <span className="required-star">*</span>
              </label>
              <input
                id="task-due"
                name="dueDate"
                type="date"
                className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
                value={formData.dueDate}
                onChange={handleChange}
              />
              {errors.dueDate && (
                <p className="error-message">
                  <AlertCircle size={14} />
                  <span>{errors.dueDate}</span>
                </p>
              )}
            </div>
          </div>

          {/* Actions Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
