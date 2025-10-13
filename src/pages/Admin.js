import React, { useState } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (success) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="admin">
      {!isAuthenticated ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Admin;