import { NavLink } from 'react-router-dom';

const TabNavigation = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      background: '#222',
      padding: '5px 0',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
    }}>
      {['About', 'Skills', 'Projects', 'Education', 'Experience', 'Certifications', 'Contact'].map((tab) => (
        <NavLink
          key={tab}
          to={`/${tab.toLowerCase()}`}
          style={{
            color: 'blue',
            textDecoration: 'dancing',
            margin: '0 15px',
            padding: '10px 30px',
            borderRadius: '30px',
            transition: 'background 0.3s, transform 0.3s',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
          activeStyle={{
            background: '#4a9eff',
            transform: 'scale(1.1)',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {tab}
        </NavLink>
      ))}
    </div>
  );
};

export default TabNavigation; 