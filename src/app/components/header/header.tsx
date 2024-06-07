"use client";
import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Particles from "./Particles";
import {
  HeaderContainer,
  HeaderContent,
  HeaderText,
  Button,
  ArrowIcon,
  TopCanvasContainer,
  BottomCanvasContainer,
  PaginationContainer,
  PaginationDot,
} from "./headerStyled";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

const images = ["/image1.webp", "/image2.webp", "/image3.webp"];

const Header: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <HeaderContainer
      ref={headerRef}
      $isMobile={isMobile}
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <TopCanvasContainer>
        <Canvas>
          <Particles />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </TopCanvasContainer>
      <HeaderContent>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <HeaderText>Bienvenidos a Salon Unisex</HeaderText>
          <Link href={"/reservation"}>
            <Button whileHover={{ scale: 1.1 }}>Reserva Ahora</Button>
          </Link>
        </motion.div>
      </HeaderContent>
      <BottomCanvasContainer>
        <Canvas>
          <Particles />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </BottomCanvasContainer>
      <ArrowIcon onClick={nextImage}>
        <ArrowForwardIosIcon style={{ fontSize: "2rem", color: "#ffd700" }} />
      </ArrowIcon>
      <PaginationContainer>
        {images.map((_, index) => (
          <PaginationDot
            key={index}
            $isActive={currentImage === index}
            onClick={() => selectImage(index)}
          />
        ))}
      </PaginationContainer>
    </HeaderContainer>
  );
};

export default Header;
