import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const CourseManager = () => {
  const { courses, dispatch, actions } = useApp();
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ageRange: '',
    duration: '',
    price: '',
    color: '#6C63FF',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { ...formData };
    // Se estiver editando e o campo image não foi alterado, mantenha o valor anterior
    if (editingCourse) {
      if (!formData.image) {
        payload.image = editingCourse.image || '';
      }
      dispatch({
        type: actions.UPDATE_COURSE,
        payload: { ...payload, id: editingCourse.id }
      });
    } else {
      // Se não houver imagem, remova o campo para não salvar string vazia
      if (!formData.image) {
        delete payload.image;
      }
      dispatch({
        type: actions.ADD_COURSE,
        payload
      });
    }
    // Reset form
    setFormData({
      title: '',
      description: '',
      ageRange: '',
      duration: '',
      price: '',
      color: '#6C63FF',
      image: ''
    });
    setEditingCourse(null);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || '',
      description: course.description || '',
      ageRange: course.ageRange || '',
      duration: course.duration || '',
      price: course.price || '',
      color: course.color || '#6C63FF',
      image: course.image || ''
    });
  };

  const handleDelete = (courseId) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      dispatch({
        type: actions.DELETE_COURSE,
        payload: courseId
      });
      // persistence is handled centrally by AppContext
    }
  };

  return (
    <div className="course-manager">
      <h2>Gerenciar Cursos</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="course-title">Título do Curso</label>
            <input
              id="course-title"
              type="text"
              name="title"
              placeholder="Ex: Programação para Iniciantes"
              value={formData.title || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="course-ageRange">Faixa Etária</label>
            <input
              id="course-ageRange"
              type="text"
              name="ageRange"
              placeholder="Ex: 6-10 anos"
              value={formData.ageRange || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="course-description">Descrição</label>
          <textarea
            id="course-description"
            name="description"
            placeholder="Descreva o curso..."
            rows="3"
            value={formData.description || ''}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="course-duration">Duração</label>
            <input
              id="course-duration"
              type="text"
              name="duration"
              placeholder="Ex: 12 semanas"
              value={formData.duration || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="course-price">Preço</label>
            <input
              id="course-price"
              type="text"
              name="price"
              placeholder="Ex: R$ 149,00"
              value={formData.price || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course-color">Cor de Destaque</label>
            <input
              id="course-color"
              type="color"
              name="color"
              value={formData.color || '#6C63FF'}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="course-image">URL da Imagem (opcional)</label>
          <input
            id="course-image"
            type="url"
            name="image"
            placeholder="https://exemplo.com/imagem.jpg"
              value={formData.image || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingCourse ? 'Atualizar Curso' : 'Adicionar Curso'}
          </button>
          
          {editingCourse && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => {
                setEditingCourse(null);
                setFormData({
                  title: '',
                  description: '',
                  ageRange: '',
                  duration: '',
                  price: '',
                  color: '#6C63FF',
                  image: ''
                });
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
      
      <div className="admin-list">
        <h3>Cursos Cadastrados ({courses.length})</h3>
        
        {courses.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum curso cadastrado</p>
          </div>
        ) : (
          courses.map(course => (
            <div key={course.id} className="admin-item card">
              <div className="item-content">
                <div className="item-header">
                  <h4>{course.title}</h4>
                  <span 
                    className="color-badge"
                    style={{ backgroundColor: course.color }}
                  ></span>
                </div>
                <p>{course.description}</p>
                <div className="item-meta">
                  <span>Idade: {course.ageRange}</span>
                  <span>Duração: {course.duration}</span>
                  <span>Preço: {course.price}</span>
                </div>
              </div>
              <div className="item-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleEdit(course)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-accent"
                  onClick={() => handleDelete(course.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseManager;