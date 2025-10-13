import React from 'react';

const StatCard = ({ title, value, change, changeType, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
          <h3>{value}</h3>
          <span className="stat-title">{title}</span>
        </div>
      </div>
      <div className={`stat-change ${changeType}`}>
        <span className="change-arrow">
          {changeType === 'positive' ? '↗' : '↘'}
        </span>
        {change}% em relação ao período anterior
      </div>
    </div>
  );
};

export default StatCard;