import React from 'react';

const TopCourses = ({ courses }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  // Encontrar o valor máximo para calcular as barras de progresso
  const maxEnrollments = Math.max(...courses.map(course => course.enrollments));

  return (
    <div className="top-courses widget-card">
      <h3>Cursos Mais Populares</h3>
      <div className="courses-list">
        {courses.map((course, index) => (
          <div key={course.name} className="course-item">
            <div className="course-rank">
              #{index + 1}
            </div>
            <div className="course-info">
              <div className="course-name">{course.name}</div>
              <div className="course-stats">
                <span className="enrollments">{course.enrollments} matrículas</span>
                <span className="revenue">{formatCurrency(course.revenue)}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${(course.enrollments / maxEnrollments) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCourses;