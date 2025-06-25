import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const RotatingPlanet = ({ texture, radius }) => {
  const meshRef = useRef();
  const textureMap = useTexture(texture);

  useFrame(() => {
    meshRef.current.rotation.y += 0.001; // Slow rotation
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[radius, 64, 64]} /> {/* Increased segments for clarity */}
      <meshStandardMaterial map={textureMap} />
    </mesh>
  );
};

export default RotatingPlanet; 