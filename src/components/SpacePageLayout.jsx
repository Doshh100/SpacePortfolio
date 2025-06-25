import { Link } from 'react-router-dom';
import SpaceDebris from './SpaceDebris';
import TabNavigation from './TabNavigation';
import ReturnButton from './ReturnButton';

const SpacePageLayout = ({ children }) => {
  return (
    <div className="page">
      <TabNavigation />
      <div className="content">
        {children}
      </div>
      <ReturnButton />
    </div>
  );
};

export default SpacePageLayout; 