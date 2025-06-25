import { Link } from 'react-router-dom';
import SpaceDebris from './SpaceDebris';
import TabNavigation from './TabNavigation';

const ReturnButton = () => (
  <Link to="/" style={{
    position: 'fixed',
    top: '20px',
    left: '20px',
    background: 'rgba(74, 158, 255, 0.2)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '20px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
    transition: 'all 0.3s ease'
  }}>
    <span style={{ fontSize: '20px' }}>🚀</span>
    Return to Solar System
  </Link>
);

const SpacePageLayout = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: 'white',
      padding: '80px 20px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <TabNavigation />
      <div style={{
        maxWidth: '1200px',
        margin: '80px auto 0',
        position: 'relative',
        zIndex: 1
      }}>
        {children}
      </div>
    </div>
  );
};

export default SpacePageLayout; 