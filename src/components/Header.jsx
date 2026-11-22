import React from 'react';
import { Menu, Plus, Bell, Calendar as CalendarIcon, Sparkles } from 'lucide-react';

export default function Header({ onOpenSidebar, onOpenAddTask }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="dashboard-header" role="banner">
      <div className="header-left">
        {/* Mobile menu trigger */}
        <button 
          type="button" 
          className="mobile-menu-trigger" 
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-title-wrap">
          <div className="header-badge">
            <Sparkles size={13} className="text-primary" />
            <span>Productivity Workspace</span>
          </div>
          <h1 className="header-title">My Tasks Overview</h1>
          <p className="header-subtitle">
            Manage your daily tasks, track progress, and organize your work priorities.
          </p>
        </div>
      </div>

      <div className="header-right">
        {/* Date Display */}
        <div className="date-pill" title="Today's Date">
          <CalendarIcon size={15} />
          <span>{currentDate}</span>
        </div>

        {/* Notification Icon */}
        <button 
          type="button" 
          className="icon-btn" 
          aria-label="View notifications"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="notification-dot" />
        </button>

        {/* Primary CTA - Add Task */}
        <button 
          type="button" 
          className="btn-primary" 
          onClick={onOpenAddTask}
          aria-label="Add new task"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}
