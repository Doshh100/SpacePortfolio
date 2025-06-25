import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ReturnButton = () => {
  const navigate = useNavigate();
  const [fading, setFading] = useState(false);

  const handleClick = () => {
    const page = document.querySelector('.page');
    setFading(true);
    if (page) {
      page.classList.add('crumble-animation');
      setTimeout(() => {
        page.classList.remove('crumble-animation');
        navigate('/');
      }, 1100); // Match the animation duration in ms
    } else {
      navigate('/');
    }
  };

  return (
    <button
      className="return-btn"
      onClick={handleClick}
      style={{
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
        transition: 'opacity 0.5s cubic-bezier(0.7,0,0.84,0.01), background 0.3s, transform 0.3s',
        position: 'fixed',
        top: '60px',
        right: '18px',
        background: '#4a9eff',
        color: 'white',
        padding: '7px 14px',
        borderRadius: '22px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        fontSize: '0.95rem',
        zIndex: 9999,
      }}
      onMouseOver={e => {
        e.currentTarget.style.background = '#357ab8';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.background = '#4a9eff';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      disabled={fading}
    >
      <span style={{ fontSize: '20px' }}>🚀</span>
      Return to Solar System
    </button>
  );
};

export default ReturnButton; 