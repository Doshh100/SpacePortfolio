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

const ContactPage = () => {
  return (
    <SpacePageLayout>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, background: 'rgba(0, 0, 0, 0.8)' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <RotatingPlanet texture="/textures/earth.jpg" radius={5} />
      </Canvas>
      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        <h1>Contact Me</h1>
        <div className="contact-info">
          <p>📱 +263 716 933 360</p>
          <p>✉️ dannychijaka100@gmail.com</p>
          <p>📍 Harare, Zimbabwe</p>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/tanaka-danny-chijaka-04595a257/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
          <a href="https://github.com/Doshh100" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          <a href="@https://www.instagram.com/just_.dannn/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="@https://www.facebook.com/danny.chijaa.3" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
      <ReturnButton />
    </SpacePageLayout>
  );
};

export default ContactPage; 