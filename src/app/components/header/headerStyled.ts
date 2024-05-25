import { motion } from "framer-motion";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 60vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  );

  @media (max-width: 320px) {
    height: 50vh;
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
  align-items: center;
  text-align: center;
  color: #f8f9fa;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const HeaderText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 0 0 10px #000;

  @media (max-width: 320px) {
    font-size: 1.5rem;
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
