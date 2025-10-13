import React from 'react';

const IconTrophy = ({ className='' }) => (
  <svg className={`svg-icon ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <g className="svg-animated">
      <path d="M7 4h10v2a5 5 0 01-5 5 5 5 0 01-5-5V4z" fill="#ff7ab6" />
      <path d="M5 6v2a7 7 0 007 7 7 7 0 007-7V6" fill="none" stroke="#0f172a" strokeWidth="1" />
    </g>
  </svg>
);

export default IconTrophy;
