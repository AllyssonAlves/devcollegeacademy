import React from 'react';
import '../styles/components.css';
import { useApp } from '../context/AppContext';
import { CourseImg, buildImageCandidates } from '../components/Courses';

const Courses = () => {
  const { courses, siteConfig } = useApp();

  const phoneRaw = siteConfig?.contact?.phone || '5588994814505';
  const digits = (phoneRaw.match(/\d+/g) || []).join('');
  const base = digits ? `https://wa.me/${digits}` : 'https://wa.me/5588994814505';

  return (
    <section className="courses-landing container" style={{padding:'4rem 1rem'}}>
      <h1>Nossos Cursos</h1>
      <p>Explore todos os cursos oferecidos pela DevCollege Academy. Clique em um curso para saber mais.</p>
      <div className="courses-grid" style={{marginTop:24}}>
        { (courses || []).map(course => {
          const candidates = buildImageCandidates(course);
          const hasAny = candidates && candidates.length > 0;
          return (
            <div className="course-card" key={course.id}>
              {hasAny ? (
                <div className="course-banner">
                  <CourseImg candidates={candidates} alt={course.title + ' - imagem do curso'} style={{ width: '100%', height: 160, objectFit: 'cover', borderTopLeftRadius: 6, borderTopRightRadius: 6 }} />
                </div>
              ) : (
                <div className="course-image" style={{background: course.color || 'var(--gradient)'}}>{course.title}</div>
              )}
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div style={{marginTop:12}}>
                  <a className="btn btn-primary" href={`${base}?text=${encodeURIComponent(`Olá! Tenho interesse no curso: ${course.title}`)}`} target="_blank" rel="noopener noreferrer">Quero este curso</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Courses;
