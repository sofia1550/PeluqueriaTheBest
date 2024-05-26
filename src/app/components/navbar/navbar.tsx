import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { checkAuthentication } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import {
  Nav,
  NavLinks,
  NavLink,
  Logo,
  NavContainer,
  CanvasContainer,
  HamburgerIcon,
  MobileMenu,
  AuthButtons,
  AuthButton,
} from "./navbarStyled";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/redux/hooks";
import { showAuthModal } from "@/redux/features/ui/uiSlice";
import { useAuthToken } from "../../hooks/useAuthToken";
import AuthModal from "../authModel/authModel";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { logout } = useAuthToken();

  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    logout();
  };

  const handleAuthButtonClick = (mode: "login" | "register") => {
    dispatch(showAuthModal(mode));
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
        <Logo href="/">Salon Unisex</Logo>
        <NavLinks>
          {["Services", "About", "Contact"].map((item) => (
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
        <AuthButtons>
          {!isAuthenticated ? (
            <>
              <AuthButton onClick={() => handleAuthButtonClick("login")}>
                Sign In
              </AuthButton>
              <AuthButton onClick={() => handleAuthButtonClick("register")}>
                Sign Up
              </AuthButton>
            </>
          ) : (
            <AuthButton onClick={handleLogoutClick}>Log Out</AuthButton>
          )}
        </AuthButtons>
        <MobileMenu $isOpen={isOpen}>
          {["Services", "About", "Contact"].map((item) => (
            <NavLink
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={toggleMenu}
            >
              {item}
            </NavLink>
          ))}
          {!isAuthenticated ? (
            <>
              <AuthButton onClick={() => handleAuthButtonClick("login")}>
                Sign In
              </AuthButton>
              <AuthButton onClick={() => handleAuthButtonClick("register")}>
                Sign Up
              </AuthButton>
            </>
          ) : (
            <AuthButton onClick={handleLogoutClick}>Log Out</AuthButton>
          )}
        </MobileMenu>
      </NavContainer>
      <AuthModal />
    </Nav>
  );
};

export default Navbar;
