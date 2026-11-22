import React from 'react';
import { 
  Calendar, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  CircleDot,
  Tag
} from 'lucide-react';

export default function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) {
  const { id, title, description, category, status, priority, dueDate } = task;

  const isCompleted = status === 'Completed';

  // Format due date cleanly
  const formattedDueDate = dueDate ? new Date(dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : 'No deadline';

  return (
    <article className={`task-card ${isCompleted ? 'task-completed-card' : ''}`}>
      {/* Card Header: Category & Priority */}
      <div className="task-card-header">
        <div className="task-meta-left">
          {category && (
            <span className={`category-pill category-${category.toLowerCase()}`}>
              <Tag size={12} />
              <span>{category}</span>
            </span>
          )}
          <span className={`priority-badge priority-${priority.toLowerCase()}`}>
            {priority} Priority
          </span>
        </div>

        {/* Action Buttons: Edit & Delete */}
        <div className="task-actions">
          <button
            type="button"
            className="action-btn edit-action"
            onClick={() => onEdit(task)}
            aria-label={`Edit task: ${title}`}
            title="Edit task"
          >
            <Edit3 size={15} />
          </button>
          <button
            type="button"
            className="action-btn delete-action"
            onClick={() => onDelete(task)}
            aria-label={`Delete task: ${title}`}
            title="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Title & Description */}
      <div className="task-card-body">
        <h3 className={`task-title ${isCompleted ? 'completed-text' : ''}`}>
          {title}
        </h3>
        {description && (
          <p className="task-description">
            {description}
          </p>
        )}
      </div>

      {/* Card Footer: Due Date & Status Switcher Dropdown */}
      <div className="task-card-footer">
        <div className="due-date-pill" title={`Due: ${formattedDueDate}`}>
          <Calendar size={14} className="due-icon" />
          <span>{formattedDueDate}</span>
        </div>

        {/* Inline Status Dropdown Selector */}
        <div className="status-selector-wrapper">
          <label htmlFor={`status-select-${id}`} className="sr-only">Change status for {title}</label>
          <div className={`status-badge-inline status-${status.toLowerCase().replace(' ', '-')}`}>
            {status === 'Completed' && <CheckCircle2 size={13} />}
            {status === 'In progress' && <Clock size={13} />}
            {status === 'To do' && <CircleDot size={13} />}
            <select
              id={`status-select-${id}`}
              value={status}
              onChange={(e) => onStatusChange(id, e.target.value)}
              className="status-dropdown-select"
              aria-label={`Update status for ${title}`}
            >
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    </article>
  );
}
