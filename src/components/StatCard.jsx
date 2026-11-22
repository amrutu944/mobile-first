import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue', 
  subtitle, 
  progress 
}) {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-header">
        <span className="stat-title">{title}</span>
        <div className={`stat-icon-wrap icon-${color}`}>
          <Icon size={20} />
        </div>
      </div>
      
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}
      </div>

      {progress !== undefined && (
        <div className="stat-progress-wrapper">
          <div className="stat-progress-track">
            <div 
              className={`stat-progress-fill fill-${color}`} 
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <span className="stat-progress-label">{progress}% completed</span>
        </div>
      )}
    </div>
  );
}
