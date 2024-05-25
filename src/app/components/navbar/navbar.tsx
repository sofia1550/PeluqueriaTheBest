import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Nav,
  NavLinks,
  NavLink,
  Logo,
  NavContainer,
  CanvasContainer,
} from "./navbarStyled";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <Nav>
      <CanvasContainer>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </CanvasContainer>
      <NavContainer>
        <Logo>Salon Unisex</Logo>
        <NavLinks>
          {["Home", "Services", "About", "Contact"].map((item) => (
            <motion.div
              key={item}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
            >
              <NavLink href={`#${item.toLowerCase()}`}>{item}</NavLink>
            </motion.div>
          ))}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
