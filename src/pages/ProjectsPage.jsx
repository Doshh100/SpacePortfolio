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

const ProjectsPage = () => {
  return (
    <SpacePageLayout>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, background: 'rgba(0, 0, 0, 0.8)' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <RotatingPlanet texture="/textures/mars.jpg" radius={5} />
      </Canvas>
      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        <h1>Projects</h1>
        <div className="projects-grid">
          <div className="project-card">
            <h2>Dan's Automobile Shop</h2>
            <div className="project-links">
              <a href="https://dans-automobil-shop.netlify.app/" target="_blank" rel="noopener noreferrer">Live Demo</a>
              <a href="https://github.com/Doshh100/dans-automobile-shop" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <p>An e-commerce website for automobile parts and accessories.</p>
            <div className="tech-stack">
              <span>React</span>
              <span>JavaScript</span>
              <span>CSS</span>
              <span>Netlify</span>
            </div>
          </div>
          <div className="project-card">
            <h2>Banking system Project</h2>
            <div className="project-links">
              <a href="https://github.com/Doshh100/Small-Projects/tree/main/BankingSystem" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <p>A functional calculator application with basic arithmetic operations.</p>
            <div className="tech-stack">
              <span>JavaScript</span>
              <span>HTML</span>
              <span>CSS</span>
            </div>
          </div>
          <div className="project-card">
            <h2>Space Portfolio</h2>
            <div className="project-links">
              <a href="https://github.com/Doshh100/Portfolio1/tree/main" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <p>An interactive space-themed portfolio website with 3D animations.</p>
            <div className="tech-stack">
              <span>React</span>
              <span>Three.js</span>
              <span>Vite</span>
            </div>
          </div>
        </div>
      </div>
      <ReturnButton />
    </SpacePageLayout>
  );
};

export default ProjectsPage; 