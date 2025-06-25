import { useNavigate } from 'react-router-dom';

const ReturnButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#4a9eff',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        transition: 'background 0.3s, transform 0.3s',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = '#357ab8';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = '#4a9eff';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span style={{ fontSize: '20px' }}>🚀</span>
      Return to Solar System
    </button>
  );
};

export default ReturnButton; 