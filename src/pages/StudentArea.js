
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StudentProgress from '../components/student/StudentProgress';
import StudentLogin from '../components/student/StudentLogin';
import StudentPortfolio from '../components/student/StudentPortfolio';
import StudentAchievements from '../components/student/StudentAchievements';
import '../styles/components.css';
import '../styles/student-area.css';

const StudentArea = () => {
  const { students } = useApp();
  const [loggedStudent, setLoggedStudent] = useState(null);
  const handleLogout = () => setLoggedStudent(null);

  // Sempre buscar o aluno atualizado do contexto pelo id
  const currentStudent = loggedStudent
    ? students.find(s => s.id === loggedStudent.id)
    : null;

  return (
    <div className="student-area">
      <Header />
      <main className="student-dashboard container">
        <h1>Área do Aluno</h1>
        {!loggedStudent ? (
          <StudentLogin onLogin={setLoggedStudent} />
        ) : (
          <>
            <div className="student-logged-info">
              <span>Bem-vindo, {currentStudent?.name || ''}!</span>
              <button className="btn btn-secondary" onClick={handleLogout} style={{marginLeft:8}}>Sair</button>
            </div>
            <section className="student-section">
              <h2>Dashboard de Progresso</h2>
              <StudentProgress student={currentStudent} />
            </section>
            <section className="student-section">
              <h2>Portfolio de Projetos</h2>
              <StudentPortfolio student={currentStudent} />
            </section>
            <section className="student-section">
              <h2>Certificados Digitais</h2>
              <div className="student-certificates-placeholder">(Certificados para download aqui)</div>
            </section>
            <section className="student-section">
              <h2>Conquistas e Gamificação</h2>
              <StudentAchievements student={currentStudent} />
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default StudentArea;

