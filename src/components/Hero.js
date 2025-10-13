import React, { useState } from 'react';
import '../styles/components.css';
import { RobotMascot, AstronautMascot } from './MascotVariants';
import { useApp } from '../context/AppContext';
import IconCourse from './icons/IconCourse';
import IconCertificate from './icons/IconCertificate';
import IconTrophy from './icons/IconTrophy';
// ...existing imports kept above

const Hero = () => {
  const { siteConfig } = useApp();
  const variants = { robot: RobotMascot, astronaut: AstronautMascot };
  // Prefer admin-selected mascot from siteConfig, otherwise random
  const initialKey = siteConfig?.mascot || (Math.random() > 0.5 ? 'robot' : 'astronaut');
  const [key, setKey] = useState(initialKey);
  const MascotComp = variants[key] || RobotMascot;

  const switchMascot = () => setKey(prev => (prev === 'robot' ? 'astronaut' : 'robot'));

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Prepare seu filho para o futuro com tecnologia</h1>
            <p>Na DevCollege Academy, crianças e adolescentes aprendem programação, robótica e criação de games de forma divertida e interativa.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="/cursos">Conheça nossos cursos</a>
              {(() => {
                const phoneRaw = siteConfig?.contact?.phone || '';
                const digits = (phoneRaw.match(/\d+/g) || []).join('');
                const base = digits ? `https://wa.me/${digits}` : 'https://wa.me/5511999999999';
                const message = encodeURIComponent('Olá! Gostaria de agendar uma aula experimental na DevCollege Academy.');
                const wa = `${base}?text=${message}`;
                return (<a className="btn btn-secondary" href={wa} target="_blank" rel="noopener noreferrer">Agende uma aula experimental</a>);
              })()}
            </div>
          </div>
            <div className="hero-image">
              <div className="hero-graphic">
                <div className="graphic-element graphic-1"></div>
                <MascotComp />
                <div className="graphic-element graphic-3"></div>
              </div>
              <div style={{textAlign:'center', marginTop:8}}>
                <button className="btn btn-secondary" onClick={switchMascot} style={{fontSize:'0.9rem'}}>Trocar mascote</button>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;