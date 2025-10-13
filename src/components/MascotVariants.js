import React from 'react';

export const RobotMascot = ({ className = '' }) => (
  <svg
    className={"mascot-svg " + className}
    viewBox="0 0 220 220"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="robotTitle robotDesc"
  >
    <title id="robotTitle">Mascote Robô</title>
    <desc id="robotDesc">Um mascote robô sorridente que balança levemente, usado como personagem da DevCollege.</desc>
    <defs>
      <linearGradient id="robotGrad" x1="0" x2="1">
        <stop offset="0%" stopColor="#7c5cff" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.15" />
      </filter>
    </defs>

    <g transform="translate(10,10)" filter="url(#softShadow)">
      <rect x="40" y="70" width="140" height="90" rx="20" fill="url(#robotGrad)" />
      <g className="robot-head">
        <rect x="60" y="30" width="100" height="70" rx="18" fill="#fff" />
        <rect x="70" y="50" width="80" height="8" rx="4" fill="#f1f5f9" />
        <g className="robot-eyes" fill="#0f172a">
          <ellipse cx="88" cy="65" rx="6" ry="6">
            <animate attributeName="ry" values="6;2;6" dur="2.1s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="132" cy="65" rx="6" ry="6">
            <animate attributeName="ry" values="6;3.5;6" dur="2.2s" repeatCount="indefinite" />
          </ellipse>
        </g>
        <path d="M88 82c6 6 28 6 34 0" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="110" y1="20" x2="110" y2="6" stroke="#ffd166" strokeWidth="4" strokeLinecap="round">
          <animate attributeName="y2" values="6;2;6" dur="2.5s" repeatCount="indefinite" />
        </line>
        <circle cx="110" cy="4" r="3" fill="#ffd166">
          <animate attributeName="r" values="3;4;3" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>
      <g opacity="0.9" fill="#fff">
        <rect x="92" y="110" width="36" height="8" rx="4" />
        <circle cx="70" cy="120" r="6" />
        <circle cx="150" cy="120" r="6" />
      </g>
    </g>
  </svg>
);

export const AstronautMascot = ({ className = '' }) => (
  <svg
    className={"mascot-svg " + className}
    viewBox="0 0 220 220"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="astroTitle astroDesc"
  >
    <title id="astroTitle">Mascote Astronauta</title>
    <desc id="astroDesc">Um mascote astronauta com capacete brilhante, pairando levemente como personagem infantil.</desc>
    <defs>
      <linearGradient id="astroGrad" x1="0" x2="1">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="astroShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="10" stdDeviation="10" floodOpacity="0.12" />
      </filter>
    </defs>

    <g transform="translate(10,10)" filter="url(#astroShadow)">
      <ellipse cx="110" cy="140" rx="60" ry="34" fill="url(#astroGrad)" />
      <g className="astro-helmet">
        <circle cx="110" cy="74" r="44" fill="#fff" />
        <ellipse cx="110" cy="80" rx="34" ry="18" fill="#e6eef2" />
        <path d="M82 62c10 6 56 6 68 0" fill="none" stroke="#cce7f0" strokeWidth="3" strokeLinecap="round" />
        <g fill="#0f172a">
          <circle cx="98" cy="76" r="4">
            <animate attributeName="cy" values="76;74;76" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="122" cy="76" r="4">
            <animate attributeName="cy" values="76;78;76" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
      <g>
        <polygon points="180,30 185,38 174,34 186,34 175,38" fill="#ffd166" opacity="0.95">
          <animateTransform attributeName="transform" attributeType="XML" type="scale" values="1;1.08;1" dur="3s" repeatCount="indefinite" />
        </polygon>
      </g>
    </g>
  </svg>
);

export default RobotMascot;
