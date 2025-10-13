import React from 'react';
import { RobotMascot, AstronautMascot } from '../../components/MascotVariants';

const viewStyles = {
  hero: { width: '420px', padding: '18px', background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(248,250,252,0.95))', borderRadius: 12 },
  avatar: { width: '120px', padding: '8px', background: 'transparent' },
  footer: { width: '260px', padding: '8px', background: 'transparent' }
};

const sizeMap = {
  small: 0.6,
  medium: 1,
  large: 1.4
};

const MascotMultiPreview = ({ mascot = 'robot', size = 'medium', activeView = 'hero' }) => {
  const MascotComp = mascot === 'astronaut' ? AstronautMascot : RobotMascot;
  const scale = sizeMap[size] || 1;

  return (
    <div className="mascot-multi-preview">
      <div className="preview-views">
        <div className={`preview-card ${activeView === 'hero' ? 'active' : ''}`} style={viewStyles.hero}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
            <MascotComp className="preview-mascot" />
          </div>
          <div className="preview-label">Hero</div>
        </div>

        <div className={`preview-card ${activeView === 'avatar' ? 'active' : ''}`} style={viewStyles.avatar}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
            <MascotComp className="preview-mascot" />
          </div>
          <div className="preview-label">Avatar</div>
        </div>

        <div className={`preview-card ${activeView === 'footer' ? 'active' : ''}`} style={viewStyles.footer}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
            <MascotComp className="preview-mascot" />
          </div>
          <div className="preview-label">Footer</div>
        </div>
      </div>
    </div>
  );
};

export default MascotMultiPreview;
