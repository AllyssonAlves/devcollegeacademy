import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const StudentManager = () => {
  const { students, courses, dispatch, actions } = useApp();
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: '',
    plan: '',
    planPrice: 0,
    status: 'active',
    progress: 0
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingStudent) {
      dispatch({
        type: actions.UPDATE_STUDENT,
        payload: { ...formData, id: editingStudent.id }
      });
    } else {
      dispatch({
        type: actions.ADD_STUDENT,
        payload: { 
          ...formData, 
          id: Date.now(),
          enrollmentDate: new Date().toISOString().split('T')[0]
        }
      });
    }
    
    setFormData({
      name: '',
      email: '',
      age: '',
      course: '',
      plan: '',
      planPrice: 0,
      status: 'active',
      progress: 0
    });
    setEditingStudent(null);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData(student);
  };

  const handleDelete = (studentId) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      dispatch({
        type: actions.DELETE_STUDENT,
        payload: studentId
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="student-manager">
      <h2>Gerenciar Alunos</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nome do Aluno</label>
            <input
              type="text"
              name="name"
              placeholder="Nome completo"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@exemplo.com"
              value={formData.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Idade</label>
            <input
              type="number"
              name="age"
              placeholder="12"
              value={formData.age || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Curso</label>
            <select
              name="course"
              value={formData.course || ''}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um curso</option>
              {courses.map(course => (
                <option key={course.id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Plano</label>
            <input
              type="text"
              name="plan"
              placeholder="Ex: Plano Premium"
              value={formData.plan || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Valor do Plano (R$)</label>
            <input
              type="number"
              name="planPrice"
              placeholder="249"
              value={formData.planPrice === undefined ? '' : formData.planPrice}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status || 'active'}
              onChange={handleChange}
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="paused">Pausado</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Progresso (%)</label>
            <input
              type="number"
              name="progress"
              min="0"
              max="100"
              placeholder="75"
              value={formData.progress === undefined ? '' : formData.progress}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingStudent ? 'Atualizar Aluno' : 'Adicionar Aluno'}
          </button>
          
          {editingStudent && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => {
                setEditingStudent(null);
                setFormData({
                  name: '',
                  email: '',
                  age: '',
                  course: '',
                  plan: '',
                  planPrice: 0,
                  status: 'active',
                  progress: 0
                });
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
      
      <div className="admin-list">
        <h3>Alunos Cadastrados ({students.length})</h3>
        
        {students.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum aluno cadastrado</p>
          </div>
        ) : (
          <div className="students-table">
            <div className="table-header">
              <span>Aluno</span>
              <span>Curso</span>
              <span>Plano</span>
              <span>Progresso</span>
              <span>Status</span>
              <span>Ações</span>
            </div>
            
            {students.map(student => (
              <div key={student.id} className="table-row">
                <div className="student-info">
                  <strong>{student.name}</strong>
                  <small>{student.email}</small>
                  <small>Idade: {student.age} anos</small>
                </div>
                <span>{student.course}</span>
                <span>{student.plan} - R$ {student.planPrice}</span>
                <div className="progress-cell">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span>{student.progress}%</span>
                </div>
                <span className={`status-badge ${student.status}`}>
                  {student.status === 'active' ? 'Ativo' : 
                   student.status === 'inactive' ? 'Inativo' : 'Pausado'}
                </span>
                <div className="actions-cell">
                  <button 
                    className="btn btn-secondary btn-small"
                    onClick={() => handleEdit(student)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-accent btn-small"
                    onClick={() => handleDelete(student.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManager;