import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Particles from "./Particles";
import {
  HeaderContainer,
  HeaderContent,
  HeaderText,
  HeaderOverlay,
  Button,
  ArrowIcon,
  CanvasContainer,
  PaginationContainer,
  PaginationDot,
} from "./headerStyled";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"; // Importar ícono de Material-UI

const images = ["/image1.webp", "/image2.webp", "/image3.webp", "/image4.webp"];

const Header: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImage(index);
  };
 
  return (
    <HeaderContainer style={{ backgroundImage: `url(${images[currentImage]})` }}>
      <HeaderContent>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <HeaderText>Bienvenidos a Salon Unisex</HeaderText>
          <Button whileHover={{ scale: 1.1 }}>Reserva Ahora</Button>
        </motion.div>
      </HeaderContent>
      <CanvasContainer>
        <Canvas>
          <Particles />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </CanvasContainer>
      <HeaderOverlay />
      <ArrowIcon onClick={nextImage}>
        <ArrowForwardIosIcon style={{ fontSize: "2rem", color: "#ffd700" }} />
      </ArrowIcon>
      <PaginationContainer>
        {images.map((_, index) => (
          <PaginationDot
            key={index}
            isActive={currentImage === index}
            onClick={() => selectImage(index)}
          />
        ))}
      </PaginationContainer>
    </HeaderContainer>
  );
};

export default Header;

