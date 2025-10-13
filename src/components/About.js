import React from 'react';
import { useApp } from '../context/AppContext';
import '../styles/components.css';

const About = () => {
  const { siteConfig } = useApp();
  return (
    <section id="sobre" className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <div className="section-title">
              <h2>Sobre {siteConfig?.title || 'DevCollege Academy'}</h2>
            </div>
            <p>{siteConfig?.description || 'A DevCollege Academy nasceu da paixão por tecnologia e educação. Acreditamos que as crianças de hoje são os criadores do amanhã, e nosso objetivo é equipá-las com as habilidades necessárias para prosperar em um mundo cada vez mais digital.'}</p>
            
            <div className="about-stats">
              <div className="stat">
                <h3>500+</h3>
                <p>Alunos formados</p>
              </div>
              <div className="stat">
                <h3>15+</h3>
                <p>Cursos disponíveis</p>
              </div>
              <div className="stat">
                <h3>98%</h3>
                <p>Taxa de satisfação</p>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="about-graphic">
              <div className="floating-element fe-1"></div>
              <div className="floating-element fe-2"></div>
              <div className="floating-element fe-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;