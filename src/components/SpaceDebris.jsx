import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpaceDebris = ({ type }) => {
  const mountRef = useRef(null);

  const createStars = (scene, debris) => {
    const starGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    for(let i = 0; i < 200; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 50 - 25
      );
      star.velocity = Math.random() * 0.02;
      debris.push(star);
      scene.add(star);
    }
  };

  const createMeteors = (scene, debris) => {
    const meteorGeometry = new THREE.ConeGeometry(0.2, 1, 8);
    const meteorMaterial = new THREE.MeshBasicMaterial({ color: 0xff6b6b });
    
    for(let i = 0; i < 20; i++) {
      const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);
      meteor.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 + 50,
        Math.random() * 50 - 25
      );
      meteor.rotation.x = Math.PI;
      meteor.velocity = Math.random() * 0.1 + 0.05;
      debris.push(meteor);
      scene.add(meteor);
    }
  };

  const createSatellites = (scene, debris) => {
    const satelliteGeometry = new THREE.BoxGeometry(0.5, 0.5, 1.5);
    const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0x4a9eff });
    
    for(let i = 0; i < 10; i++) {
      const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
      satellite.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 50 - 25
      );
      satellite.rotation.z = Math.random() * Math.PI;
      satellite.orbitRadius = Math.random() * 20 + 10;
      satellite.orbitSpeed = Math.random() * 0.002;
      satellite.orbitAngle = Math.random() * Math.PI * 2;
      debris.push(satellite);
      scene.add(satellite);
    }
  };

  const createAsteroids = (scene, debris) => {
    const asteroidGeometry = new THREE.DodecahedronGeometry(0.5);
    const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    
    for(let i = 0; i < 15; i++) {
      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      asteroid.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 50 - 25
      );
      asteroid.rotation.x = Math.random() * Math.PI;
      asteroid.rotation.y = Math.random() * Math.PI;
      asteroid.velocity = Math.random() * 0.03;
      debris.push(asteroid);
      scene.add(asteroid);
    }
  };

  const createShips = (scene, debris) => {
    const shipGeometry = new THREE.ConeGeometry(0.3, 1, 4);
    const shipMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4a9eff,
      metalness: 0.7,
      roughness: 0.3
    });
    
    for(let i = 0; i < 15; i++) {
      const ship = new THREE.Mesh(shipGeometry, shipMaterial);
      ship.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 50 - 25
      );
      ship.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      ship.velocity = {
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05
      };
      debris.push(ship);
      scene.add(ship);
    }
  };

  const createMetal = (scene, debris) => {
    const metalGeometry = new THREE.OctahedronGeometry(0.2);
    const metalMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888,
      metalness: 0.9,
      roughness: 0.1
    });
    
    for(let i = 0; i < 30; i++) {
      const metal = new THREE.Mesh(metalGeometry, metalMaterial);
      metal.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 50 - 25
      );
      metal.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      metal.velocity = {
        rotation: (Math.random() - 0.5) * 0.02,
        y: -Math.random() * 0.05
      };
      debris.push(metal);
      scene.add(metal);
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const debris = [];
    
    switch(type) {
      case 'stars':
        createStars(scene, debris);
        break;
      case 'meteors':
        createMeteors(scene, debris);
        break;
      case 'satellites':
        createSatellites(scene, debris);
        break;
      case 'asteroids':
        createAsteroids(scene, debris);
        break;
      case 'ships':
        createShips(scene, debris);
        break;
      case 'metal':
        createMetal(scene, debris);
        break;
      default:
        createStars(scene, debris);
    }

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      
      debris.forEach(object => {
        if (type === 'meteors') {
          object.position.y -= object.velocity;
          if (object.position.y < -50) {
            object.position.y = 50;
          }
        } else if (type === 'satellites') {
          object.orbitAngle += object.orbitSpeed;
          object.position.x = Math.cos(object.orbitAngle) * object.orbitRadius;
          object.position.y = Math.sin(object.orbitAngle) * object.orbitRadius;
          object.rotation.z += 0.01;
        } else if (type === 'asteroids') {
          object.rotation.x += 0.01;
          object.rotation.y += 0.01;
          object.position.x += object.velocity;
          if (object.position.x > 50) object.position.x = -50;
        } else if (type === 'ships') {
          object.position.x += object.velocity.x;
          object.position.y += object.velocity.y;
          object.position.z += object.velocity.z;
          object.rotation.y += 0.01;
          
          if (Math.abs(object.position.x) > 50) object.position.x *= -0.9;
          if (Math.abs(object.position.y) > 50) object.position.y *= -0.9;
          if (Math.abs(object.position.z) > 25) object.position.z *= -0.9;
        } else if (type === 'metal') {
          object.rotation.y += object.velocity.rotation;
          object.position.y += object.velocity.y;
          
          if (object.position.y < -50) {
            object.position.y = 50;
            object.position.x = Math.random() * 100 - 50;
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [type]);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default SpaceDebris; 