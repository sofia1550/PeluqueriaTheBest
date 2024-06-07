"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { FaBars, FaTimes } from "react-icons/fa";
import { checkAuthentication } from "@/redux/features/auth/authSlice";
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
  LoadingSpinner,
} from "./navbarStyled";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showAuthModal } from "@/redux/features/ui/uiSlice";
import { useAuthToken } from "../../hooks/useAuthToken";
import { selectIsAuthenticated, selectIsLoading } from "@/redux/authSelectors";

const AuthModal = dynamic(() => import("../authModel/authModel"), {
  ssr: false,
});

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [showButtons, setShowButtons] = useState(false); // Estado para mostrar los botones después de 2 segundos
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);

  const { logout } = useAuthToken();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(checkAuthentication()).finally(() => {
          setIsAuthChecked(true);
          setTimeout(() => setShowButtons(true), 100); // Retraso de 2 segundos para mostrar los botones
        });
      } else {
        setIsAuthChecked(true);
        setTimeout(() => setShowButtons(true), 100); // Retraso de 2 segundos para mostrar los botones
      }
    }
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

  if (!isAuthChecked) {
    return null; // Mostrar nada hasta que la autenticación se haya verificado
  }

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
              <Link href={`/${item.toLowerCase()}`} passHref>
                <NavLink>{item}</NavLink>
              </Link>
            </motion.div>
          ))}
        </NavLinks>
        <AuthButtons>
          {!isLoading && showButtons ? (
            <>
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
            </>
          ) : (
            <LoadingSpinner />
          )}
        </AuthButtons>
        <MobileMenu $isOpen={isOpen}>
          {["Services", "About", "Contact"].map((item) => (
            <Link href={`/${item.toLowerCase()}`} passHref key={item}>
              <NavLink onClick={toggleMenu}>{item}</NavLink>
            </Link>
          ))}
          {!isLoading && showButtons ? (
            <>
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
            </>
          ) : (
            <LoadingSpinner />
          )}
        </MobileMenu>
      </NavContainer>
      {isAuthChecked && <AuthModal />}
    </Nav>
  );
};

export default Navbar;