import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function FilterTabs({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  categoryFilter,
  onCategoryChange,
  taskCounts,
  onResetFilters,
  isFiltered
}) {
  const tabs = [
    { id: 'All', label: 'All Tasks', count: taskCounts.all },
    { id: 'To do', label: 'To Do', count: taskCounts.todo },
    { id: 'In progress', label: 'In Progress', count: taskCounts.inProgress },
    { id: 'Completed', label: 'Completed', count: taskCounts.completed }
  ];

  return (
    <div className="filter-controls-bar">
      {/* Status Segmented Tabs */}
      <div className="status-tabs-group" role="tablist" aria-label="Filter tasks by status">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`status-tab ${isActive ? 'active' : ''}`}
              onClick={() => onStatusChange(tab.id)}
            >
              <span>{tab.label}</span>
              <span className={`tab-count-badge ${isActive ? 'badge-active' : ''}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Priority & Category Dropdowns */}
      <div className="dropdown-filters-group">
        {/* Priority Filter */}
        <div className="select-wrapper">
          <label htmlFor="priority-filter" className="sr-only">Filter by Priority</label>
          <Filter size={15} className="select-icon" aria-hidden="true" />
          <select
            id="priority-filter"
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">Priority: High</option>
            <option value="Medium">Priority: Medium</option>
            <option value="Low">Priority: Low</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="select-wrapper">
          <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
          <select
            id="category-filter"
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Research">Research</option>
          </select>
        </div>

        {/* Reset Filters CTA if active */}
        {isFiltered && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={onResetFilters}
            title="Reset search and filters"
            aria-label="Reset all active filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
