import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const ALLOWED_USER = process.env.REACT_APP_ADMIN_USER || '';
  const ALLOWED_PASS = process.env.REACT_APP_ADMIN_PASSWORD || '';
  const isDev = process.env.NODE_ENV === 'development';
  // Provide friendly default credentials only in development to make local testing easier
  const DEV_USER = isDev ? (process.env.REACT_APP_ADMIN_USER || 'admin') : '';
  const DEV_PASS = isDev ? (process.env.REACT_APP_ADMIN_PASSWORD || 'devpassword') : '';
  const EFFECTIVE_USER = ALLOWED_USER || DEV_USER;
  const EFFECTIVE_PASS = ALLOWED_PASS || DEV_PASS;

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use runtime build-time configured credentials. If not provided, enable friendly defaults in development.
    if (!EFFECTIVE_USER || !EFFECTIVE_PASS) {
      alert('Área administrativa desabilitada neste deploy. Configure REACT_APP_ENABLE_ADMIN e REACT_APP_ADMIN_PASSWORD.');
      return;
    }
    if (credentials.username === EFFECTIVE_USER && credentials.password === EFFECTIVE_PASS) {
      onLogin(true);
    } else {
      alert('Credenciais inválidas!');
    }
  };

  return (
    <div className="admin-login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Área Administrativa</h2>
        {isDev && (
          <p style={{fontSize:'0.9rem', color:'#555', marginTop:-6}}>Dev credentials: <strong>{EFFECTIVE_USER}</strong> / <strong>{EFFECTIVE_PASS}</strong></p>
        )}
        <div className="form-group">
          <input
            type="text"
            name="username"
            autoComplete="username"
            placeholder="Usuário"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Senha"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-full">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;