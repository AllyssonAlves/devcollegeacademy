import React from 'react';
import { useApp } from '../context/AppContext';
import '../styles/components.css';

const Footer = () => {
  const { siteConfig } = useApp();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>{siteConfig?.title || 'DevCollege Academy'}</h3>
              <p>{siteConfig?.description || 'Preparando crianças para o futuro através da tecnologia'}</p>
            </div>
            <div className="social-links">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="YouTube">📺</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Cursos</h4>
            <ul>
              <li><a href="#">Programação</a></li>
              <li><a href="#">Games</a></li>
              <li><a href="#">Robótica</a></li>
              <li><a href="#">Desenvolvimento Web</a></li>
              <li><a href="#">Apps Mobile</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Institucional</h4>
            <ul>
              <li><a href="#">Sobre nós</a></li>
              <li><a href="#">Metodologia</a></li>
              <li><a href="#">Professores</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Trabalhe conosco</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Suporte</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contato</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DevCollege Academy. Todos os direitos reservados.</p>
          {process.env.REACT_APP_ENABLE_ADMIN === 'true' && (
            <div style={{marginTop:6}}>
              <a href="/admin" style={{fontSize:'0.75rem', color:'rgba(15,23,42,0.35)', textDecoration:'none'}}>Admin</a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;