import styled from "styled-components";

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  justify-content: center;
  margin-top: 4rem;
  margin-left: 10rem;
  margin-right: 10rem;
  margin-bottom: 10rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: rgba(28, 28, 28, 0.8);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #f8f9fa;
  border: 1px solid rgba(255, 215, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
/*   width: 40rem;
 */  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    background: rgba(28, 28, 28, 0.9);
  }
`;

export const CardButton = styled.button`
  background: #ffd700;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
  color: #1c1c1c;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #1c1c1c;
    color: #ffd700;
    transform: translateY(-3px);
  }
`;

export const CardTitle = styled.h3`
  color: #ffd700;
  margin-bottom: 16px;
  font-size: 1.5rem;
`;

export const CardDescription = styled.p`
  color: #f8f9fa;
  margin-bottom: 12px;
  font-size: 1rem;
  line-height: 1.4;
`;

export const CardPrice = styled.p`
  color: #f8f9fa;
  margin-bottom: 16px;
  font-size: 1.2rem;
  font-weight: bold;
`;
