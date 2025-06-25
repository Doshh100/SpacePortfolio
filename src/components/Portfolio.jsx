import { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useTexture, OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

// Shooting Star component
const ShootingStar = () => {
  const ref = useRef();
  const [isActive] = useState(() => Math.random() > 0.5);
  
  const startPosition = useMemo(() => new THREE.Vector3(
    Math.random() * 100 - 50,
    Math.random() * 50,
    Math.random() * 100 - 50
  ), []);

  useFrame(() => {
    if (isActive && ref.current) {
      ref.current.position.y -= 0.5;
      ref.current.position.x -= 0.3;
      
      if (ref.current.position.y < -50) {
        ref.current.position.copy(startPosition);
      }
    }
  });

  return isActive ? (
    <mesh ref={ref} position={startPosition}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="white" />
      <Trail length={10} />
    </mesh>
  ) : null;
};

// Trail effect for shooting stars
const Trail = ({ length }) => {
  const ref = useRef();
  
  useFrame(() => {
    if (ref.current) {
      ref.current.geometry.setFromPoints(
        Array.from({ length }, (_, i) => {
          const point = new THREE.Vector3(i * 0.1, i * 0.1, 0);
          return point;
        })
      );
    }
  });

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="white" opacity={0.5} transparent />
    </line>
  );
};

// Space Debris component
const SpaceDebris = () => {
  const debris = useMemo(() => {
    return Array.from({ length: 100 }, () => ({
      position: [
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: Math.random() * 0.3
    }));
  }, []);

  return debris.map((d, i) => (
    <mesh key={i} position={d.position} rotation={d.rotation}>
      <dodecahedronGeometry args={[d.scale]} />
      <meshStandardMaterial color="#666" roughness={0.8} />
    </mesh>
  ));
};

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

  // Saturn's rings
  const Rings = hasRings && (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius * 1.4, radius * 2, 64]} />
      <meshStandardMaterial 
        color="#b39b49"
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );

  // Black hole effect
  const BlackHoleEffect = isBlackHole && (
    <group>
      <mesh>
        <sphereGeometry args={[radius * 1.2, 32, 32]} />
        <meshBasicMaterial 
          color="#000000"
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[radius * 1.2, radius * 2, 64]} />
        <meshBasicMaterial 
          color="#4a9eff"
          side={THREE.DoubleSide}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );

  return (
    <group>
      <mesh 
        ref={meshRef} 
        position={position}
        onClick={onClick}
        onPointerOver={() => {
          setHovered(true);
          onHover(name);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial 
          map={textureMap}
          emissive={hovered ? "#ffffff" : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
        {Rings}
        {BlackHoleEffect}
        
        {/* Planet name label */}
        <Text
          position={[0, radius + 0.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>

        {/* Hover Info Card */}
        {hovered && (
          <group position={[radius + 1, 0, 0]}>
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[4, 2]} />
              <meshBasicMaterial 
                color="black" 
                transparent 
                opacity={0.8} 
                side={THREE.DoubleSide}
              />
            </mesh>
            <Text
              position={[0, 0.5, 0.1]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
              maxWidth={3.5}
            >
              {info.title}
            </Text>
            <Text
              position={[0, -0.2, 0.1]}
              fontSize={0.2}
              color="#4a9eff"
              anchorX="center"
              anchorY="middle"
              maxWidth={3.5}
            >
              {info.brief}
            </Text>
          </group>
        )}
      </mesh>
    </group>
  );
};

const SolarSystem = ({ onPlanetClick, onPlanetHover, planetInfo }) => {
  const [sunHovered, setSunHovered] = useState(false);
  const planets = {
    mercury: {
      radius: 0.4,
      orbitRadius: 3,
      speed: 0.5,
      texture: '/textures/mercury.jpg',
      info: planetInfo.mercury
    },
    venus: {
      radius: 0.6,
      orbitRadius: 5,
      speed: 0.4,
      texture: '/textures/venus.jpg',
      info: planetInfo.venus
    },
    earth: {
      radius: 0.7,
      orbitRadius: 7,
      speed: 0.3,
      texture: '/textures/earth.jpg',
      info: planetInfo.earth
    },
    mars: {
      radius: 0.5,
      orbitRadius: 9,
      speed: 0.25,
      texture: '/textures/mars.jpg',
      info: planetInfo.mars
    },
    jupiter: {
      radius: 1.2,
      orbitRadius: 12,
      speed: 0.2,
      texture: '/textures/jupiter.jpg',
      info: planetInfo.jupiter
    },
    saturn: {
      radius: 1.0,
      orbitRadius: 15,
      speed: 0.18,
      texture: '/textures/saturn.jpg',
      info: planetInfo.saturn,
      hasRings: true  // Special flag for Saturn's rings
    },
    blackhole: {
      radius: 1.5,
      orbitRadius: 18,
      speed: 0.15,
      texture: '/textures/blackhole.jpg',
      info: planetInfo.blackhole,
      isBlackHole: true  // Special flag for black hole effects
    }
  };

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ff4500" />
      
      {/* Welcome Text */}
      <Text
        position={[0, 15, 0]}
        fontSize={1.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={20}
        textAlign="center"
      >
        WELCOME TO TANAKA DANNY CHIJAKA'S UNIVERSE
      </Text>
      
      {/* Sun with hover effect */}
      <group
        onPointerOver={() => setSunHovered(true)}
        onPointerOut={() => setSunHovered(false)}
      >
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#ff4500" />
          <pointLight intensity={1.5} distance={50} decay={2} />
        </mesh>
        
        {sunHovered && (
          <Text
            position={[0, 3, 0]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="middle"
            backgroundColor="rgba(0,0,0,0.5)"
            padding={0.5}
          >
            EXPLORE MY LITTLE UNIVERSE
          </Text>
        )}
      </group>

      {/* Orbit Lines */}
      {Object.entries(planets).map(([name, data]) => (
        <mesh key={`orbit-${name}`} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.orbitRadius, data.orbitRadius + 0.05, 64]} />
          <meshBasicMaterial color="#ffffff" opacity={0.1} transparent={true} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Planets */}
      {Object.entries(planets).map(([name, data]) => (
        <Planet
          key={name}
          name={name}
          {...data}
          onClick={() => onPlanetClick(name)}
          onHover={onPlanetHover}
          info={data.info}
          hasRings={data.hasRings}
          isBlackHole={data.isBlackHole}
        />
      ))}

      {/* Background elements */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <SpaceDebris />
      {Array.from({ length: 20 }).map((_, i) => (
        <ShootingStar key={i} />
      ))}
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        maxDistance={50}
        minDistance={5}
      />
    </>
  );
};

const Portfolio = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const navigate = useNavigate();

  const planetInfo = {
    mercury: {
      title: "About Me",
      brief: "AI Student at University of Zimbabwe, passionate about innovation and technology",
      link: "/about"
    },
    venus: {
      title: "Skills",
      brief: "Python, JavaScript, React, AI/ML, and multiple languages",
      link: "/skills"
    },
    earth: {
      title: "Projects",
      brief: "Dan's Automobile Shop, Calculator, and more on GitHub",
      link: "/projects"
    },
    mars: {
      title: "Education",
      brief: "University of Zimbabwe, ZRP High School, Samuel Centenary Academy",
      link: "/education"
    },
    jupiter: {
      title: "Experience",
      brief: "Professional experience and work history",
      link: "/experience"
    },
    saturn: {
      title: "Certifications",
      brief: "Professional certifications and achievements",
      link: "/certifications"
    },
    blackhole: {
      title: "Contact Me",
      brief: "Get in touch and connect with me",
      link: "/contact"
    }
  };

  const handlePlanetClick = (planetName) => {
    navigate(planetInfo[planetName].link);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      {/* Side Info Panel */}
      {hoveredPlanet && (
        <div style={{
          position: 'fixed',
          right: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '30px',
          borderRadius: '15px',
          color: 'white',
          zIndex: 1000,
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: '300px',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <h2 style={{
            color: '#4a9eff',
            marginBottom: '15px',
            fontSize: '24px'
          }}>{planetInfo[hoveredPlanet].title}</h2>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6'
          }}>{planetInfo[hoveredPlanet].brief}</p>
          <p style={{
            marginTop: '15px',
            fontSize: '14px',
            color: '#888'
          }}>Click to explore more</p>
        </div>
      )}

      <Canvas camera={{ position: [0, 15, 20], fov: 60 }}>
        <SolarSystem
          onPlanetClick={handlePlanetClick}
          onPlanetHover={setHoveredPlanet}
          planetInfo={planetInfo}
        />
      </Canvas>
    </div>
  );
};

export default Portfolio; 