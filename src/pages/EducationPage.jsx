import SpacePageLayout from '../components/SpacePageLayout';
import ReturnButton from '../components/ReturnButton';
import { Canvas } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const RotatingPlanet = ({ texture, radius }) => {
  const meshRef = useRef();
  const textureMap = useTexture(texture);

  useFrame(() => {
    meshRef.current.rotation.y += 0.001; // Slow rotation
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={textureMap} />
    </mesh>
  );
};

const EducationPage = () => {
  return (
    <SpacePageLayout>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, background: 'rgba(0, 0, 0, 0.8)' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <RotatingPlanet texture="/textures/jupiter.jpg" radius={3} />
      </Canvas>
      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        <h1>Education</h1>
        <div className="education-timeline">
          <div className="education-item">
            <h2>University of Zimbabwe</h2>
            <p className="date">September 2023 – Present</p>
            <ul>
              <li>Studying Artificial Intelligence</li>
              <li>Member of the AI Research Team</li>
              <li>Deployed my first website on Netlify</li>
              <li>Awarded the SCRUM Certificate</li>
              <li>Earned the CS50AI Engineering Certificate</li>
            </ul>
          </div>
          <div className="education-item">
            <h2>Samuel Centenary Academy</h2>
            <p className="date">February 2021 – November 2022</p>
            <ul>
              <li>Rugby Player</li>
              <li>Interact Club President</li>
              <li>National Chess Player</li>
              <li>Scored 8 Points at A-Level (Mathematics, Physics, and Computer Science)</li>
            </ul>
          </div>
          <div className="education-item">
            <h2>Zimbabwe Republic Police High School</h2>
            <p className="date">January 2017 – February 2021</p>
            <ul>
              <li>Golf Club Vice Captain</li>
              <li>Scored 8 As and 4 Bs at O-Level</li>
              <li>Earned an Electronics Certificate</li>
            </ul>
          </div>
        </div>
      </div>
      <ReturnButton />
    </SpacePageLayout>
  );
};

export default EducationPage; 