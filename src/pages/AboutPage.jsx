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

const AboutPage = () => {
  return (
    <SpacePageLayout>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, background: 'rgba(0, 0, 0, 0.8)' }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <RotatingPlanet texture="/textures/venus.jpg" radius={5} />
      </Canvas>
      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        <h1>DANNY CHIJAKA</h1>
        <h2>Artificial Intelligence Engineer</h2>
        <p>Passionate and driven AI student at the University of Zimbabwe.</p>
        <p>I am an AI enthusiast with a deep passion for exploring the transformative power of artificial intelligence. Driven by curiosity and a desire to innovate, I am constantly seeking opportunities to learn more about AI concepts, tools, and real-world applications. My goal is not only to understand how AI works but also to build impactful solutions that can address real challenges. Whether it's through hands-on projects, collaborative learning, or exploring cutting-edge research, I am committed to growing my knowledge and contributing meaningfully to the AI community..</p>
        <p>Based in Harare, Zimbabwe, pushing the boundaries of what's possible in AI and software development.</p>
      </div>
      <ReturnButton />
    </SpacePageLayout>
  );
};

export default AboutPage; 