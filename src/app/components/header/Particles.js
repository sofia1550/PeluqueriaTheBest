import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Particles = () => {
  const particlesRef = useRef();
  const materialRef = useRef();

  useEffect(() => {
    const particlesCount = 500; 
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; 
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; 
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; 
    }

    if (particlesRef.current) {
      particlesRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001; 
    }
    if (materialRef.current) {
      const time = state.clock.getElapsedTime();
      materialRef.current.opacity = 0.5 + 0.5 * Math.sin(time * 2); 
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" />
      <pointsMaterial
        ref={materialRef}
        attach="material"
        color={0xffd700}
        size={0.15} 
        sizeAttenuation
        transparent
        opacity={0.75}
      />
    </points>
  );
};

export default Particles;
