import { NavLink } from 'react-router-dom';

const TabNavigation = () => {
  return (
    <div className="tab-nav">
      {['About', 'Skills', 'Projects', 'Education', 'Experience', 'Certifications', 'Contact'].map((tab) => (
        <NavLink
          key={tab}
          to={`/${tab.toLowerCase()}`}
          className={({ isActive }) =>
            "tab-link" + (isActive ? " active" : "")
          }
        >
          {tab}
        </NavLink>
      ))}
    </div>
  );
};

export default TabNavigation; 