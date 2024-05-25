import styled from "styled-components";

interface NavLinksProps {
  isOpen: boolean;
}

export const Nav = styled.nav`
  background-color: transparent;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;

  @media (max-width: 600px) {
    padding: 0.5rem 1rem;
  }
`;

export const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 10px;
  background: rgba(28, 28, 28, 0.7);

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 0.5rem;
    border-radius: 5px;
  }
`;

export const Logo = styled.div`
  color: #ffd700; /* Dorado */
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background: #ffd700;
    margin-bottom: 5px;
  }
  animation: glow 1.5s infinite alternate;

  @keyframes glow {
    from {
      text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700,
        0 0 40px #ffd700;
    }
    to {
      text-shadow: 0 0 20px #ffd700, 0 0 30px #ffd700, 0 0 40px #ffd700,
        0 0 50px #ffd700;
    }
  }

  @media (max-width: 600px) {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }
`;

export const NavLinks = styled.div<NavLinksProps>`
  display: flex;
  gap: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    width: 100%;
    text-align: center;
  }
`;

export const NavLink = styled.a`
  color: #f8f9fa; /* Blanco Hueso */
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: #ffd700; /* Dorado */
    transform: translateY(-5px);
    text-shadow: 0 0 5px #ffd700, 0 0 10px #ffd700;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  font-size: 2rem;
  background: none;
  border: none;
  color: #f8f9fa;
  cursor: pointer;

  @media (max-width: 600px) {
    display: block;
  }
`;
