import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  Nav,
  NavLinks,
  NavLink,
  Logo,
  NavContainer,
  CanvasContainer,
  HamburgerIcon,
  MobileMenu,
} from "./navbarStyled";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <CanvasContainer>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </CanvasContainer>
      <NavContainer>
        <HamburgerIcon onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </HamburgerIcon>
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
        <MobileMenu $isOpen={isOpen}>
          {["Home", "Services", "About", "Contact"].map((item) => (
            <NavLink
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={toggleMenu}
            >
              {item}
            </NavLink>
          ))}
        </MobileMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;

