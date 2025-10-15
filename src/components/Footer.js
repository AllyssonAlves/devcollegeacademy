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
              <a href="https://www.instagram.com/devcollege" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <img src={process.env.PUBLIC_URL + '/assets/instagram.svg'} alt="Instagram" width="20" height="20" />
              </a>
              <a href="https://www.facebook.com/devcollegeacademy" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <img src={process.env.PUBLIC_URL + '/assets/facebook.svg'} alt="Facebook" width="20" height="20" />
              </a>
              <a href="https://wa.me/5588994814505" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <img src={process.env.PUBLIC_URL + '/assets/whatsapp.svg'} alt="WhatsApp" width="20" height="20" />
              </a>
              <a href="https://www.linkedin.com/company/devcollegeacademy" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <img src={process.env.PUBLIC_URL + '/assets/linkedin.svg'} alt="LinkedIn" width="20" height="20" />
              </a>
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