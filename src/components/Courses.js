import React from 'react';
import { useApp } from '../context/AppContext';
import '../styles/components.css';

const Courses = () => {
  const { courses } = useApp();

  return (
    <section id="cursos" className="courses section">
      <div className="container">
        <div className="section-title">
          <h2>Nossos Cursos</h2>
          <p>Desenvolvemos habilidades do futuro de forma divertida e interativa</p>
        </div>
        
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card card">
              <div 
                className="course-image"
                style={{ 
                  background: course.color || 'var(--gradient)',
                  backgroundImage: course.image ? `url(${course.image})` : 'none',
                  backgroundSize: course.image ? 'cover' : undefined,
                  backgroundPosition: course.image ? 'center' : undefined,
                  backgroundRepeat: course.image ? 'no-repeat' : undefined
                }}
              >
                <div className="course-age">{course.ageRange}</div>
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span className="course-duration">{course.duration}</span>
                  <span className="course-price">{course.price}</span>
                </div>
                <button className="btn btn-primary">Saiba mais</button>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="empty-state">
            <h3>Nenhum curso cadastrado</h3>
            <p>Adicione cursos através do painel administrativo</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;