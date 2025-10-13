import React from 'react';
import { useApp } from '../../context/AppContext';
import '../../styles/components.css';
import '../../styles/student-area.css';

const StudentProgress = ({ student }) => {
  const { courses } = useApp();
  if (!student) {
    return <div>Nenhum aluno encontrado.</div>;
  }
  // Encontrar curso do aluno
  const course = courses.find(c => c.title === student.course);
  const lessons = course?.lessons || [];
  const nextLessonIndex = (student.currentLessonIndex || 0);
  const nextLesson = lessons[nextLessonIndex] || null;
  const { dispatch, actions } = useApp();

  const handleAdvanceLesson = () => {
    dispatch({ type: actions.ADVANCE_LESSON, payload: { studentId: student.id } });
  };
  const pct = Math.max(0, Math.min(100, student.progress || 0));
  const radius = 48; // circle radius
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="student-progress">
      <div className="progress-ring" aria-hidden>
        <svg width="116" height="116" viewBox="0 0 116 116">
          <defs>
            <linearGradient id="g1" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#6c63ff" />
              <stop offset="100%" stopColor="#48c6ef" />
            </linearGradient>
          </defs>
          <g transform="translate(58,58)">
            <circle r={radius} fill="none" stroke="#eef3ff" strokeWidth="10" />
            <circle
              r={radius}
              fill="none"
              stroke="url(#g1)"
              strokeWidth="10"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </g>
        </svg>
        <div className="progress-percentage">
          <span className="value">{pct}%</span>
          <span className="label">Progresso</span>
        </div>
      </div>

      <div className="progress-details" style={{flex:1}}>
        <h3 style={{marginTop:0}}>Progresso do Curso</h3>
        <div className="muted"><strong>Curso:</strong> {course ? course.title : student.course}</div>
        <div className="muted" style={{marginTop:6}}><strong>Status:</strong> {student.progress === 100 ? 'Concluído' : 'Em andamento'}</div>
        <div style={{marginTop:12}}>
          <strong>Início:</strong> <span className="muted">{student.enrollmentDate}</span> &nbsp; • &nbsp; <strong>Plano:</strong> <span className="muted">{student.plan}</span>
        </div>

        <div className="next-lesson" style={{marginTop:12}}>
          <h4 style={{margin:'8px 0'}}>Próxima Aula</h4>
          {nextLesson ? (
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
              <div style={{flex:1}}>
                <div style={{fontWeight:800}}>{nextLesson.title}</div>
                <div className="muted" style={{fontSize:'0.95rem'}}>{nextLesson.description}</div>
              </div>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={handleAdvanceLesson}>Marcar como concluída</button>
              </div>
            </div>
          ) : (
            <div>Parabéns! Todas as aulas concluídas.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
