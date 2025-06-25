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

const SkillsPage = () => {
  return (
    <SpacePageLayout>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, background: 'rgba(0, 0, 0, 0.8)' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <RotatingPlanet texture="/textures/earth.jpg" radius={5} />
      </Canvas>
      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        <h1>Skills</h1>
        <div className="skills-grid">
          <div className="skill-category">
            <h2>Programming</h2>
            <ul>
              <li>Python</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Node.js</li>
            </ul>
          </div>
          <div className="skill-category">
            <h2>Web Development</h2>
            <ul>
              <li>React</li>
              <li>Vite</li>
              <li>HTML/CSS</li>
              <li>Node.js</li>
              
            </ul>
          </div>
          <div className="skill-category">
            <h2>AI & ML</h2>
            <ul>
              <li>Artificial Intelligence</li>
              <li>Machine Learning</li>
              <li>Data Analysis</li>
              <li>Neural Networks</li>
            </ul>
          </div>
          <div className="skill-category">
            <h2>Languages</h2>
            <ul>
              <li>English</li>
              <li>Shona</li>
              <li>French</li>
              <li>Portuguese</li>
              <li>Ndebele</li>
            </ul>
          </div>
          <div className="skill-category">
            <h2>Extra Skill</h2>
            <ul>
              <li>Electronics</li>
              <li>Data communications and networking</li>
              <li>Medical AID</li>
              
            </ul>
          </div>
        </div>
      </div>
      <ReturnButton />
    </SpacePageLayout>
  );
};

export default SkillsPage; 