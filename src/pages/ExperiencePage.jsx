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

const ExperiencePage = () => {
  return (
    <SpacePageLayout>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, background: 'rgba(0, 0, 0, 0.8)' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <RotatingPlanet texture="/textures/saturn.jpg" radius={3} />
      </Canvas>
      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        <h1>Work Experience</h1>
        <div className="experience-section">
          <div className="experience-item">
            <h2>Receptionist – Chicken Inn, University of Zimbabwe</h2>
            <p className="date">October 2023 – December 2024</p>
            <ul>
              <li>Greeted customers, took food orders, and provided menu information</li>
              <li>Handled cash transactions and resolved customer complaints professionally</li>
              <li>Assisted in after-work cleanup and maintained a clean workspace</li>
            </ul>
          </div>
          <div className="experience-item">
            <h2>AI Research Team Member</h2>
            <p className="date">2023 – Present</p>
            <ul>
              <li>Contributing to AI research projects at University of Zimbabwe</li>
              <li>Collaborating with team members on innovative solutions</li>
              <li>Applying theoretical knowledge to practical applications</li>
            </ul>
          </div>
        </div>
      </div>
      <ReturnButton />
    </SpacePageLayout>
  );
};

export default ExperiencePage; 