import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/components.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const firstLinkRef = useRef(null);
  const lastLinkRef = useRef(null);
  const prevFocusedRef = useRef(null);

  const { siteConfig } = useApp();
  const staticLogoPath = process.env.PUBLIC_URL + '/assets/logo4.png';
  const [logoError, setLogoError] = useState(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const navigate = useNavigate();
  const location = useLocation();

  // navigate to home and scroll to section id (id without #)
  const goToSection = (id) => {
    // close menu if open
    if (isMenuOpen) {
      closeMenu();
    }

    const scrollToHash = () => {
      try {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // set hash anyway so if home renders later it can pick it up
          window.location.hash = '#' + id;
        }
      } catch (e) {
        // ignore
      }
    };

    if (location.pathname === '/') {
      // already on home; just scroll
      scrollToHash();
    } else {
      // navigate to home then set hash after a short delay
      navigate('/');
      setTimeout(scrollToHash, 80);
    }
  };

  // Close menu and cleanup
  const closeMenu = () => {
    try {
      if (toggleButtonRef.current) toggleButtonRef.current.focus({ preventScroll: true });
      else if (prevFocusedRef.current && typeof prevFocusedRef.current.focus === 'function') prevFocusedRef.current.focus({ preventScroll: true });
    } catch (e) {}

    setTimeout(() => {
      setIsMenuOpen(false);
      try {
        const headerEl = document.querySelector('.header');
        if (headerEl && headerEl.parentElement) {
          Array.from(headerEl.parentElement.children).forEach((ch) => {
            if (ch === headerEl) return;
            ch.removeAttribute('aria-hidden');
            ch.removeAttribute('inert');
          });
        } else {
          const app = document.querySelector('.App');
          if (app) {
            Array.from(app.children).forEach((ch) => {
              if (ch.querySelector && ch.querySelector('.header')) return;
              ch.removeAttribute('aria-hidden');
              ch.removeAttribute('inert');
            });
          } else {
            const root = document.getElementById('root');
            if (root) {
              Array.from(root.children).forEach((ch) => {
                if (ch.querySelector && ch.querySelector('.header')) return;
                ch.removeAttribute('aria-hidden');
                ch.removeAttribute('inert');
              });
            }
          }
        }
      } catch (e) {}
    }, 0);
  };

  const handleNavLinkClick = () => {
    if (isMenuOpen) closeMenu();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      prevFocusedRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (closeButtonRef.current) closeButtonRef.current.focus();
        else firstLinkRef.current?.focus();
        try {
          const headerEl = document.querySelector('.header');
          if (headerEl && headerEl.parentElement) {
            Array.from(headerEl.parentElement.children).forEach((ch) => {
              if (ch === headerEl) return;
              ch.setAttribute('aria-hidden', 'true');
              ch.setAttribute('inert', '');
            });
          } else {
            const app = document.querySelector('.App');
            if (app) {
              Array.from(app.children).forEach((ch) => {
                if (ch.querySelector && ch.querySelector('.header')) return;
                ch.setAttribute('aria-hidden', 'true');
                ch.setAttribute('inert', '');
              });
            } else {
              const root = document.getElementById('root');
              if (root) {
                Array.from(root.children).forEach((ch) => {
                  if (ch.querySelector && ch.querySelector('.header')) return;
                  ch.setAttribute('aria-hidden', 'true');
                  ch.setAttribute('inert', '');
                });
              }
            }
          }
        } catch (e) {}
      }, 50);
    } else {
      setTimeout(() => {
        try {
          if (toggleButtonRef.current) toggleButtonRef.current.focus();
          else if (prevFocusedRef.current && typeof prevFocusedRef.current.focus === 'function') prevFocusedRef.current.focus();
        } catch (e) {}
        document.body.style.overflow = '';
      }, 0);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const first = closeButtonRef.current || firstLinkRef.current;
      const last = lastLinkRef.current || firstLinkRef.current;
      if (!first || !last) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              {!logoError ? (
                <img src={staticLogoPath} alt={siteConfig?.title || 'DevCollege Academy'} className="site-logo" style={{ maxHeight: 48, maxWidth: 180 }} onError={() => setLogoError(true)} />
              ) : (
                <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>{siteConfig?.title || 'DevCollege Academy'}</h2>
              )}
            </Link>
          </div>

          <nav
            id="main-nav"
            role={isMenuOpen ? 'dialog' : 'navigation'}
            aria-modal={isMenuOpen}
            className={`nav ${isMenuOpen ? 'nav-open' : ''}`}
            aria-label="Main navigation"
          >
            {isMenuOpen && (
              <button ref={closeButtonRef} className="nav-close" onClick={closeMenu} aria-label="Fechar menu">×</button>
            )}

            <ul className="nav-list">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); goToSection('home'); }} ref={firstLinkRef}>Início</a>
              </li>
              <li>
                <Link to="/cursos" onClick={handleNavLinkClick}>Cursos</Link>
              </li>
              <li>
                <a href="#sobre" onClick={(e) => { e.preventDefault(); goToSection('sobre'); }}>Sobre</a>
              </li>
              <li>
                <a href="#planos" onClick={(e) => { e.preventDefault(); goToSection('planos'); }}>Planos</a>
              </li>
              <li>
                <a href="#depoimentos" onClick={(e) => { e.preventDefault(); goToSection('depoimentos'); }}>Depoimentos</a>
              </li>
              <li>
                <a href="#contato" onClick={(e) => { e.preventDefault(); goToSection('contato'); }}>Contato</a>
              </li>
              <li>
                <Link to="/aluno" className="btn-student" onClick={handleNavLinkClick} ref={lastLinkRef}>Área do Aluno</Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            {(() => {
              const phoneRaw = siteConfig?.contact?.phone || '5588994814505';
              const digits = (phoneRaw.match(/\\d+/g) || []).join('');
              const base = digits ? `https://wa.me/${digits}` : 'https://wa.me/5588994814505';
              const message = encodeURIComponent('Olá! Gostaria de me matricular nos cursos da DevCollege Academy.');
              const wa = `${base}?text=${message}`;
              return (
                <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">Matricule-se</a>
              );
            })()}

            <button ref={toggleButtonRef} className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-controls="main-nav" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}>
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