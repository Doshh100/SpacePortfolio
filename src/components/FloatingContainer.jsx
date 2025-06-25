import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const FloatingSection = ({ title, content, position, color, links }) => {
  const ref = useRef();
  const initialPosition = position;
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Random floating motion
    ref.current.position.x = initialPosition[0] + Math.sin(t * 0.5 + position[1]) * 2;
    ref.current.position.y = initialPosition[1] + Math.cos(t * 0.3 + position[0]) * 2;
    ref.current.position.z = initialPosition[2] + Math.sin(t * 0.2) * 1;
    // Random rotation
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.1;
    ref.current.rotation.z = Math.cos(t * 0.1) * 0.05;
  });

  const handleClick = (url) => {
    if (url) window.open(url, '_blank');
  };

  return (
    <group ref={ref} position={position}>
      {/* Container shape */}
      <mesh>
        <dodecahedronGeometry args={[1.5]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.8}
          roughness={0.2}
          opacity={0.1}
          transparent
        />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.4}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
      >
        {title}
      </Text>

      {/* Content items with links */}
      {content.map((item, index) => {
        const isLink = links && links[index];
        return (
          <Text
            key={index}
            position={[0, 1 - index * 0.4, 0]}
            fontSize={0.25}
            color={isLink ? "#4a9eff" : "white"}
            anchorX="center"
            anchorY="middle"
            maxWidth={3}
            onClick={() => isLink && handleClick(isLink)}
            onPointerOver={(e) => {
              if (isLink) {
                document.body.style.cursor = 'pointer';
                e.object.scale.set(1.1, 1.1, 1.1);
              }
            }}
            onPointerOut={(e) => {
              if (isLink) {
                document.body.style.cursor = 'auto';
                e.object.scale.set(1, 1, 1);
              }
            }}
          >
            {item}
          </Text>
        );
      })}
    </group>
  );
};

const FloatingContainer = ({ sections }) => {
  return (
    <div style={{ position: 'fixed', width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 20] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

        {/* Floating sections with random positions */}
        {sections.map((section, index) => {
          const randomPosition = [
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10
          ];
          
          return (
            <FloatingSection
              key={index}
              title={section.title}
              content={section.content}
              position={randomPosition}
              color={section.color}
              links={section.links}
            />
          );
        })}

        {/* Background debris */}
        {Array.from({ length: 50 }).map((_, i) => (
          <mesh
            key={`debris-${i}`}
            position={[
              Math.random() * 40 - 20,
              Math.random() * 40 - 20,
              Math.random() * -20 - 10
            ]}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI
            ]}
          >
            <dodecahedronGeometry args={[0.2]} />
            <meshStandardMaterial 
              color="#4a9eff"
              metalness={0.8}
              roughness={0.2}
              opacity={0.3}
              transparent
            />
          </mesh>
        ))}

        <OrbitControls 
          enableZoom={true}
          minDistance={15}
          maxDistance={30}
        />
      </Canvas>
    </div>
  );
};

export default FloatingContainer; 