import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Persist auth in localStorage so reloads don't log the admin out
  useEffect(() => {
    try {
      const saved = localStorage.getItem('devcollege_admin_auth');
      if (saved === 'true') setIsAuthenticated(true);
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  const handleLogin = (success) => {
    setIsAuthenticated(success);
    try { if (success) localStorage.setItem('devcollege_admin_auth', 'true'); } catch (e) {}
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try { localStorage.removeItem('devcollege_admin_auth'); } catch (e) {}
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