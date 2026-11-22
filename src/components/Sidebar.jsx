import React from 'react';
import { 
  CheckSquare, 
  LayoutDashboard, 
  Calendar, 
  FolderKanban, 
  BarChart3, 
  Settings, 
  X, 
  Zap,
  HelpCircle
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { label: 'My Tasks', icon: CheckSquare, active: true, badge: 'Overview' },
    { label: 'Dashboard', icon: LayoutDashboard, active: false },
    { label: 'Projects', icon: FolderKanban, active: false },
    { label: 'Calendar', icon: Calendar, active: false },
    { label: 'Analytics', icon: BarChart3, active: false },
    { label: 'Settings', icon: Settings, active: false },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} aria-label="Sidebar Navigation">
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-logo">
            <div className="logo-icon-box">
              <CheckSquare className="logo-icon" size={20} strokeWidth={2.5} />
            </div>
            <div className="brand-text">
              <span className="brand-name">FocusBoard</span>
              <span className="brand-badge">PRO</span>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button 
            type="button" 
            className="mobile-close-btn" 
            onClick={onClose}
            aria-label="Close navigation sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="sidebar-nav">
          <div className="nav-group-title">MAIN MENU</div>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <button 
                    type="button"
                    className={`nav-item ${item.active ? 'active' : ''}`}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                  >
                    <Icon size={19} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Pro / Productivity Banner Card in Sidebar */}
        <div className="sidebar-footer">
          <div className="pro-card">
            <div className="pro-card-header">
              <div className="pro-icon-wrap">
                <Zap size={16} />
              </div>
              <span className="pro-title">Focus Mode</span>
            </div>
            <p className="pro-desc">Boost daily productivity with smart focus intervals.</p>
            <div className="pro-progress-bar">
              <div className="pro-progress-fill" style={{ width: '70%' }}></div>
            </div>
          </div>

          {/* User Profile */}
          <div className="user-profile">
            <div className="avatar">
              <span>JD</span>
              <span className="online-indicator"></span>
            </div>
            <div className="user-info">
              <span className="user-name">Juyed Ahmed</span>
              <span className="user-role">Product Designer</span>
            </div>
            <HelpCircle size={18} className="user-action-icon" />
          </div>
        </div>
      </aside>
    </>
  );
}
