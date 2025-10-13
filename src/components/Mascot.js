import React from 'react';
import '../styles/components.css';

const Mascot = ({ className='' }) => {
  return (
    <div className={`mascot-wrap ${className}`}>
      <svg className="mascot-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c5cff" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <g>
          {/* body */}
          <ellipse cx="100" cy="120" rx="60" ry="50" fill="url(#g1)" />
          {/* head */}
          <circle cx="100" cy="70" r="36" fill="#fff" stroke="#e6e9ef" strokeWidth="3" />
          {/* eyes */}
          <circle cx="88" cy="68" r="4" fill="#0f172a">
            <animate attributeName="cy" values="68;66;68" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="112" cy="68" r="4" fill="#0f172a">
            <animate attributeName="cy" values="68;70;68" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* antenna */}
          <line x1="100" y1="34" x2="100" y2="10" stroke="#ffd166" strokeWidth="4" strokeLinecap="round">
            <animate attributeName="y2" values="10;6;10" dur="2s" repeatCount="indefinite" />
          </line>
          <circle cx="100" cy="8" r="3" fill="#ffd166">
            <animate attributeName="cy" values="8;6;8" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* smile */}
          <path d="M88 78 Q100 88 112 78" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

export default Mascot;
