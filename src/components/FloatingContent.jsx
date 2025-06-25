import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const BulletPoint = ({ position, color }) => {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.position.x = position[0] + Math.sin(t * 0.5) * 0.1;
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.3]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const FloatingText = ({ text, position, rotation, scale = 1 }) => {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.y += Math.sin(t * 0.5) * 0.002;
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.05;
  });

  return (
    <Text
      ref={ref}
      position={position}
      rotation={rotation}
      fontSize={0.8 * scale}
      color="white"
      maxWidth={15}
      lineHeight={1.5}
      textAlign="left"
      anchorX="left"
      anchorY="middle"
    >
      {text}
    </Text>
  );
};

const FloatingContent = ({ content }) => {
  return (
    <div style={{ position: 'fixed', width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

        {content.map((item, index) => {
          // Calculate vertical position with more spacing
          const yPos = 8 - (index * 4); // Increased spacing between items
          
          return (
            <group key={index}>
              {/* Bullet point debris */}
              <BulletPoint 
                position={[-5, yPos, 0]} 
                color={item.color}
              />
              
              {/* Text content */}
              <FloatingText 
                text={item.text}
                position={[-4, yPos, 0]} // Moved text right of bullet point
                rotation={[0, 0, 0]}
                scale={item.scale || 1}
              />
            </group>
          );
        })}

        {/* Background floating debris */}
        {Array.from({ length: 30 }).map((_, i) => (
          <mesh
            key={`debris-${i}`}
            position={[
              Math.random() * 30 - 15,
              Math.random() * 30 - 15,
              Math.random() * -20 - 10 // Push debris behind text
            ]}
          >
            <dodecahedronGeometry args={[0.2]} />
            <meshStandardMaterial 
              color={content[i % content.length]?.color || "#4a9eff"}
              transparent
              opacity={0.3}
            />
          </mesh>
        ))}

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default FloatingContent; 