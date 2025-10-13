import React from 'react';

const CoursePerformance = () => {
  const performanceData = [
    { course: 'Programação para Iniciantes', completion: 85, satisfaction: 4.8, enrollments: 128 },
    { course: 'Criação de Games', completion: 78, satisfaction: 4.9, enrollments: 142 },
    { course: 'Robótica Educacional', completion: 82, satisfaction: 4.7, enrollments: 98 },
    { course: 'Desenvolvimento Web Kids', completion: 75, satisfaction: 4.6, enrollments: 87 },
    { course: 'Apps e Mobile', completion: 70, satisfaction: 4.5, enrollments: 65 }
  ];

  return (
    <div className="course-performance">
      <div className="performance-header">
        <span>Curso</span>
        <span>Conclusão</span>
        <span>Satisfação</span>
        <span>Matrículas</span>
      </div>
      <div className="performance-list">
        {performanceData.map((course, index) => (
          <div key={index} className="performance-item">
            <div className="course-name">{course.course}</div>
            <div className="completion-rate">
              <div className="progress-container">
                <div 
                  className="progress-fill"
                  style={{ width: `${course.completion}%` }}
                ></div>
              </div>
              <span>{course.completion}%</span>
            </div>
            <div className="satisfaction">
              <div className="stars">
                {'★'.repeat(Math.floor(course.satisfaction))}
                {'☆'.repeat(5 - Math.floor(course.satisfaction))}
              </div>
              <span>{course.satisfaction}</span>
            </div>
            <div className="enrollments">{course.enrollments}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePerformance;