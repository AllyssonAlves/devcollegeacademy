import React from 'react';
import { useApp } from '../context/AppContext';
import '../styles/components.css';

const Testimonials = () => {
  const { testimonials } = useApp();

  return (
    <section id="depoimentos" className="testimonials section">
      <div className="container">
        <div className="section-title">
          <h2>O que dizem sobre nós</h2>
          <p>Depoimentos de alunos e pais que fazem parte da nossa comunidade</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card card">
              <div className="testimonial-content">
                <p>"{testimonial.text}"</p>
              </div>
              
              <div className="testimonial-author">
                <div className="author-avatar">
                  <div className="avatar-placeholder">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  {testimonial.age ? (
                    <p>{testimonial.age} anos - {testimonial.course}</p>
                  ) : (
                    <p>{testimonial.relationship}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="empty-state">
            <h3>Nenhum depoimento cadastrado</h3>
            <p>Adicione depoimentos através do painel administrativo</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;