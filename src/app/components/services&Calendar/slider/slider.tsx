import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
  background: url("/background.webp") center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const HeroMidOverlay = styled.div`
  position: absolute;
  top: 55%; /* Posicionamiento entre título y subtítulo */
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 10%; /* Altura ajustable según necesidad */
  background: rgba(0, 0, 0, 10.5); /* Misma opacidad que HeroOverlay */
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffd700;
  font-size: 2.5rem;
  text-align: center;
  z-index: 2;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-weight: bold;
`;

const HeroSubtitle = styled(motion.h2)`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffd700;
  font-size: 2rem;
  text-align: center;
  z-index: 2;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  margin-top: 20px;
  opacity: 0; /* Ocultar el subtítulo inicialmente */
`;

const HeroSlider: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      setShowSubtitle(newScrollY > 64);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeroContainer>
      <HeroOverlay />
      <HeroTitle
        style={{
          transform: `translate(-50%, calc(-50% - ${scrollY * 0.1}px))`,
          opacity: scrollY < 40 * 16 ? 1 : 0, // 40vh en píxeles
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        Los mejores servicios a un click
      </HeroTitle>
      <HeroSubtitle
        style={{
          transform: `translate(-50%, calc(-50% - ${scrollY * 0.1}px))`,
          opacity: showSubtitle ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        Prepárate para conocer la magia
      </HeroSubtitle>
      <HeroMidOverlay />
    </HeroContainer>
  );
};

export default HeroSlider;
