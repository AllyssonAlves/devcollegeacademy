import React from 'react';
import { useApp } from '../../context/AppContext';

const StudentAchievements = ({ student }) => {
  const { dispatch, actions } = useApp();
  if (!student) return null;
  const achievements = student.achievements || [];

  // Exemplo: botão para desbloquear manualmente (mock)
  const unlock = (id) => {
    dispatch({
      type: actions.UNLOCK_ACHIEVEMENT,
      payload: { studentId: student.id, achievementId: id }
    });
  };

  return (
    <div className="student-achievements">
      <div className="achievements-list">
        {achievements.map(a => (
          <div className={`achievement-card${a.unlocked ? ' unlocked' : ''}`} key={a.id}>
            <div className="achievement-icon">{a.icon}</div>
            <div className="achievement-info">
              <div className="achievement-title">{a.name}</div>
              <div className="achievement-desc">{a.description}</div>
              {a.unlocked ? (
                <div className="achievement-date">Desbloqueada em: {a.date || '---'}</div>
              ) : (
                <button className="btn btn-accent" onClick={() => unlock(a.id)} style={{marginTop:8}}>Desbloquear (mock)</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAchievements;
