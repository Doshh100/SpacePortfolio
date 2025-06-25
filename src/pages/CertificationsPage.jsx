import SpacePageLayout from '../components/SpacePageLayout';
import ReturnButton from '../components/ReturnButton';
import { Canvas } from '@react-three/fiber';
import RotatingPlanet from '../components/RotatingPlanet';
import ShootingStars from '../components/ShootingStars';

const CertificationsPage = () => {
  return (
    <SpacePageLayout>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, background: 'rgba(0, 0, 0, 0.8)' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <RotatingPlanet texture="/textures/sun.jpg" radius={5} />
        <ShootingStars />
      </Canvas>
      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        <h1>Certifications & Achievements</h1>
        <div className="certifications">
          <ul>
            <li>SCRUM Certificate</li>
            <li>CS50AI Engineering Certificate</li>
            <li>Electronics Certificate</li>
            <li>18 Points at A-Level</li>
            <li>8 As and 4 Bs at O-Level</li>
            <li>National Chess Player</li>
            <li>AI Research Team Member</li>
            <li>First Website Deployment</li>
            <li>Leadership Experience</li>
          </ul>
        </div>
      </div>
      <ReturnButton />
    </SpacePageLayout>
  );
};

export default CertificationsPage;