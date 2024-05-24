import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import {
  Nav,
  NavLinks,
  NavLink,
  Logo,
  NavContainer,
  CanvasContainer,
} from "./navbarStyled";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  return (
    <Nav>
      <CanvasContainer>
        <Canvas>
          <Stars />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </CanvasContainer>
      <NavContainer>
        <Logo>Salon Unisex</Logo>
        <NavLinks>
          <motion.div
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
          >
            <NavLink href="#">Home</NavLink>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
          >
            <NavLink href="#">Services</NavLink>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
          >
            <NavLink href="#">About</NavLink>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
          >
            <NavLink href="#">Contact</NavLink>
          </motion.div>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;