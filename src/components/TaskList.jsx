import React from 'react';
import TaskCard from './TaskCard';
import { ClipboardList, Plus, RotateCcw } from 'lucide-react';

export default function TaskList({ 
  tasks, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onOpenAddTask,
  onResetFilters,
  isFiltered
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-tasks-state">
        <div className="empty-icon-box">
          <ClipboardList size={36} className="text-muted" />
        </div>
        <h3 className="empty-title">
          {isFiltered ? 'No tasks match your filters' : 'No tasks created yet'}
        </h3>
        <p className="empty-subtitle">
          {isFiltered
            ? 'Try adjusting your search terms or clearing your status/priority filters.'
            : 'Get started by creating your first task to plan your day.'}
        </p>
        <div className="empty-actions">
          {isFiltered ? (
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onResetFilters}
            >
              <RotateCcw size={15} />
              <span>Reset Filters</span>
            </button>
          ) : (
            <button 
              type="button" 
              className="btn-primary" 
              onClick={onOpenAddTask}
            >
              <Plus size={16} />
              <span>Create First Task</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-grid" role="region" aria-label="Task list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
