import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import {
  Nav,
  NavLinks,
  NavLink,
  Logo,
  NavContainer,
  CanvasContainer,
  HamburgerButton,
} from "./navbarStyled";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        <HamburgerButton onClick={toggleMenu}>&#9776;</HamburgerButton>
        <NavLinks $isOpen={isOpen}>
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
