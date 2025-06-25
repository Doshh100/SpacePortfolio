import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShootingStars = () => {
  const groupRef = useRef();
  const stars = Array.from({ length: 50 }, () => ({
    position: new THREE.Vector3(
      Math.random() * 100 - 50,
      Math.random() * 50 - 25,
      Math.random() * 50 - 25
    ),
    speed: Math.random() * 0.02 + 0.01,
  }));

  useFrame(() => {
    stars.forEach((star) => {
      star.position.x -= star.speed;
      if (star.position.x < -50) {
        star.position.x = 50;
        star.position.y = Math.random() * 50 - 25;
        star.position.z = Math.random() * 50 - 25;
      }
    });
    groupRef.current.children.forEach((mesh, index) => {
      mesh.position.copy(stars[index].position);
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, index) => (
        <mesh key={index} position={star.position}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
};

export default ShootingStars; 