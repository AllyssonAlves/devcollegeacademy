import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const ALLOWED_USER = process.env.REACT_APP_ADMIN_USER || '';
  const ALLOWED_PASS = process.env.REACT_APP_ADMIN_PASSWORD || '';

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use runtime build-time configured credentials. If not provided, login is disabled.
    if (!ALLOWED_USER || !ALLOWED_PASS) {
      alert('Área administrativa desabilitada neste deploy. Configure REACT_APP_ENABLE_ADMIN e REACT_APP_ADMIN_PASSWORD.');
      return;
    }
    if (credentials.username === ALLOWED_USER && credentials.password === ALLOWED_PASS) {
      onLogin(true);
    } else {
      alert('Credenciais inválidas!');
    }
  };

  return (
    <div className="admin-login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Área Administrativa</h2>
        <div className="form-group">
          <input
            type="text"
            name="username"
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