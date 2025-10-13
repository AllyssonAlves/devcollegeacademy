import React from 'react';

const RecentActivity = ({ activities }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <div className="recent-activity widget-card">
      <h3>Atividade Recente</h3>
      <div className="activity-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-avatar">
              {activity.student.charAt(0)}
            </div>
            <div className="activity-details">
              <div className="activity-main">
                <span className="student-name">{activity.student}</span>
                <span className="course-name">{activity.course}</span>
              </div>
              <div className="activity-meta">
                <span className="activity-date">{formatDate(activity.date)}</span>
                <span className="activity-amount">{formatCurrency(activity.amount)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-btn">
        Ver Todas as Atividades
      </button>
    </div>
  );
};

export default RecentActivity;