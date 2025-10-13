import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ProjectForm from './ProjectForm';

const StudentPortfolio = ({ student }) => {
  const { dispatch, actions } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);

  if (!student) return null;
  const projects = student.projects || [];

  const handleAdd = () => {
    setEditProject(null);
    setShowForm(true);
  };
  const handleEdit = (project) => {
    setEditProject(project);
    setShowForm(true);
  };
  const handleDelete = (projectId) => {
    if (window.confirm('Deseja remover este projeto?')) {
      dispatch({
        type: actions.DELETE_PROJECT,
        payload: { studentId: student.id, projectId }
      });
    }
  };
  const handleSubmit = (form) => {
    if (editProject) {
      dispatch({
        type: actions.UPDATE_PROJECT,
        payload: { studentId: student.id, project: { ...editProject, ...form } }
      });
    } else {
      dispatch({
        type: actions.ADD_PROJECT,
        payload: { studentId: student.id, project: form }
      });
    }
    setShowForm(false);
    setEditProject(null);
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditProject(null);
  };

  return (
    <div className="student-portfolio">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontWeight: 600, color: '#6c63ff' }}>Meus Projetos</span>
        <button className="btn btn-primary" onClick={handleAdd} style={{ minWidth: 120 }}>Adicionar Projeto</button>
      </div>
      {showForm && (
        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={editProject}
        />
      )}
      <div className="portfolio-list">
        {projects.length === 0 && <div style={{ color: '#7b8794', padding: 16 }}>Nenhum projeto cadastrado ainda.</div>}
        {projects.map(project => (
          <div className="portfolio-card" key={project.id}>
            <div className="portfolio-image">
              {project.image && <img src={project.image} alt={project.title} />}
            </div>
            <div className="portfolio-info">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="portfolio-link">Ver Projeto</a>
              )}
              <div className="card-actions" style={{ marginTop: 10 }}>
                <button className="btn btn-secondary" onClick={() => handleEdit(project)} style={{ fontSize: '0.95rem' }}>Editar</button>
                <button className="btn btn-accent" onClick={() => handleDelete(project.id)} style={{ fontSize: '0.95rem' }}>Remover</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentPortfolio;
