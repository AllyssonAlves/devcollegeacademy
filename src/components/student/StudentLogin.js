import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const StudentLogin = ({ onLogin }) => {
  const { students } = useApp();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = students.find(s => s.email === email);
    if (found) {
      setError('');
      onLogin(found);
    } else {
      setError('Aluno não encontrado. Verifique o email.');
    }
  };

  return (
    <div className="student-login">
      <h2>Login do Aluno</h2>
      <form onSubmit={handleSubmit} className="student-login-form">
        <label htmlFor="student-email">Email do aluno</label>
        <input
          id="student-email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Entrar</button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
};

export default StudentLogin;
