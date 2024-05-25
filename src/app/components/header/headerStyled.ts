import { motion } from "framer-motion";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 60vh;
  position: relative;
  display: flex;
  justify-content: space-between; /* Espacio entre las dos secciones */
  align-items: center;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  );
  background-size: cover; /* Asegurar que la imagen de fondo cubra todo el contenedor */

  @media (max-width: 320px) {
    height: 50vh;
    flex-direction: column; /* En pantallas pequeñas, las secciones estarán una encima de la otra */
  }
`;

export const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/background.webp") no-repeat center center/cover;
  opacity: 0.7;
  z-index: -1;
`;

export const HeaderContent = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centrar verticalmente */
  align-items: center; /* Centrar horizontalmente */
  text-align: center; /* Cambiado a "center" */
  color: #f8f9fa;
  width: 50%;
  height: 100%; /* Asegurarse de que ocupe toda la altura */
  padding: 0 20px;
  box-sizing: border-box;
`;

export const HeaderText = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 0 0 10px #000;

  @media (max-width: 320px) {
    font-size: 2rem;
    margin-bottom: 10px;
  }
`;

export const Button = styled(motion.button)`
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  background: linear-gradient(45deg, #3d3d3d, #1c1c1c);
  border: none;
  border-radius: 5px;
  color: #fff;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #2c2c2c;
    transform: scale(1.05);
  }

  @media (max-width: 320px) {
    font-size: 1rem;
    padding: 8px 16px;
  }
`;

export const CanvasContainer = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
`;

export const ArrowIcon = styled.div`
  position: absolute;
  right: 5vh; /* Ajustar la posición según tu preferencia */
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaginationContainer = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

export const PaginationDot = styled.div<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "#ffd700" : "#fff")};
  cursor: pointer;
`;
