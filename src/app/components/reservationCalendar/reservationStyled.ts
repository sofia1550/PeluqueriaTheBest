import styled from "styled-components";
import { motion } from "framer-motion";

export const ReservationContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60vh;
  background-color: #1c1c1c;
  color: #f8f9fa;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ImageSection = styled(motion.div)`
  flex: 1;
  background: url("/zzzzz .webp") center center/cover no-repeat;
  border-right: 1px solid rgba(255, 215, 0, 0.3);

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
    height: 50vh;
  }
`;

export const TextSection = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 3rem;
  background: rgba(28, 28, 28, 0.9);
  border-left: 1px solid rgba(255, 215, 0, 0.3);
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    border-left: none;
    border-top: 1px solid rgba(255, 215, 0, 0.3);
    height: 50vh;
  }
`;

export const Title = styled.h1`
  color: #ffd700;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.8;
  color: #f8f9fa;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const ReserveButton = styled(motion.button)`
  background-color: #ffd700;
  color: #1c1c1c;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
  font-size: 1.2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #1c1c1c;
    color: #ffd700;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;
