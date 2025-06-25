import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Planet = ({ name, radius, position, orbitRadius, speed, texture, onClick, onHover, info, hasRings, isBlackHole }) => {
  const meshRef = useRef();
  const textureMap = useTexture(texture);
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    meshRef.current.position.x = Math.cos(t) * orbitRadius;
    meshRef.current.position.z = Math.sin(t) * orbitRadius;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial map={textureMap} />
        {hasRings && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.4, radius * 2, 64]} />
            <meshStandardMaterial 
              color="#b39b49"
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
            />
          </mesh>
        )}
      </mesh>
      <Text
        position={[meshRef.current?.position.x, position[1] + radius + 0.5, meshRef.current?.position.z]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

export default Planet; 