import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar-container">
      <label htmlFor="task-search-input" className="sr-only">
        Search tasks by title
      </label>
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} aria-hidden="true" />
        <input
          id="task-search-input"
          type="text"
          className="search-input"
          placeholder="Search tasks by title or keyword..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search input"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
