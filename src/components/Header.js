import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/components.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { siteConfig } = useApp();
  // Always use static logo from /assets/logo.png
  const staticLogoPath = process.env.PUBLIC_URL + '/assets/logo4.png';
  // Optionally, you could check if the file exists, but for simplicity, just use the static path
  const [logoError, setLogoError] = useState(false);
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <a href="/">
              {!logoError ? (
                <img src={staticLogoPath} alt={siteConfig?.title || 'DevCollege Academy'} className="site-logo" style={{maxHeight:48, maxWidth:180}} onError={() => setLogoError(true)} />
              ) : (
                <h2 style={{margin:0, color: 'var(--primary-color)'}}>{siteConfig?.title || 'DevCollege Academy'}</h2>
              )}
            </a>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><a href="/#home">Início</a></li>
              <li><a href="/cursos">Cursos</a></li>
              <li><a href="/#sobre">Sobre</a></li>
              <li><a href="/#planos">Planos</a></li>
              <li><a href="/#depoimentos">Depoimentos</a></li>
              <li><a href="/#contato">Contato</a></li>
              <li><a href="/aluno" className="btn-student">Área do Aluno</a></li>
            </ul>
          </nav>
          
          <div className="header-actions">
            {(() => {
              const phoneRaw = siteConfig?.contact?.phone || '';
              const digits = (phoneRaw.match(/\d+/g) || []).join('');
              const base = digits ? `https://wa.me/${digits}` : 'https://wa.me/5511999999999';
              const message = encodeURIComponent('Olá! Gostaria de me matricular nos cursos da DevCollege Academy.');
              const wa = `${base}?text=${message}`;
              return (
                <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">Matricule-se</a>
              );
            })()}
            <button className="menu-toggle" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;