import React, { useState } from 'react';
import CourseManager from './CourseManager';
import PlanManager from './PlanManager';
import StudentManager from './StudentManager';
import MetricsDashboard from './MetricsDashboard';
import SettingsManager from './SettingsManager';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('metrics');

  const renderContent = () => {
    switch (activeTab) {
      case 'metrics':
        return <MetricsDashboard />;
      case 'courses':
        return <CourseManager />;
      case 'plans':
        return <PlanManager />;
      case 'students':
        return <StudentManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <MetricsDashboard />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Painel Administrativo</h1>
        <button className="btn btn-secondary" onClick={onLogout}>
          Sair
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="admin-sidebar">
          <ul>
            <li>
              <a 
                href="#metrics" 
                className={activeTab === 'metrics' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('metrics');
                }}
              >
                📊 Dashboard
              </a>
            </li>
            <li>
              <a 
                href="#courses" 
                className={activeTab === 'courses' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('courses');
                }}
              >
                🎓 Cursos
              </a>
            </li>
            <li>
              <a 
                href="#plans" 
                className={activeTab === 'plans' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('plans');
                }}
              >
                💰 Planos
              </a>
            </li>
            <li>
              <a 
                href="#students" 
                className={activeTab === 'students' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('students');
                }}
              >
                👥 Alunos
              </a>
            </li>
            <li>
              <a 
                href="#settings" 
                className={activeTab === 'settings' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('settings');
                }}
              >
                ⚙️ Configurações
              </a>
            </li>
          </ul>
        </div>
        
        <div className="admin-main">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;