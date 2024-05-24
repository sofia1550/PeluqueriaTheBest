import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Points } from "@react-three/drei";
import {
  HeaderContainer,
  HeaderContent,
  HeaderText,
  HeaderOverlay,
  Button,
} from "./headerStyled";
import { motion } from "framer-motion";

const Particles = () => {
  const particlesCount = 5000;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <Points positions={positions}>
      <pointsMaterial
        attach="material"
        color="#b08d57" // Dorado tenue
        size={0.05}
        sizeAttenuation
      />
    </Points>
  );
};

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Canvas>
        <Particles />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />
      </Canvas>
      <HeaderOverlay />
      <HeaderContent>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <HeaderText>Bienvenidos a Salon Unisex</HeaderText>
          <Button
            whileHover={{ scale: 1.1 }}
            style={{
              padding: "10px 20px",
              fontSize: "1.2rem",
              cursor: "pointer",
              background: "linear-gradient(45deg, #3d3d3d, #1c1c1c)",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              marginTop: "20px",
            }}
          >
            Reserva Ahora
          </Button>
        </motion.div>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
