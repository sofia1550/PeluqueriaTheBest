import styled from "styled-components";

export const Nav = styled.nav`
  background-color: transparent;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
  height: 100px; /* Ajustar altura para mayor visibilidad */
`;

export const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Asegurar altura completa */
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
  background: rgba(28, 28, 28, 0.8);
  border: 1px solid rgba(255, 215, 0, 0.3); /* Borde dorado translúcido */
  transition: background 0.3s ease, border 0.3s ease;
`;

export const Logo = styled.div`
  color: #ffd700; /* Dorado */
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  &::before {
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
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

export const NavLink = styled.a`
  color: #f8f9fa; /* Blanco Hueso */
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  position: relative;
  transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: #ffd700; /* Dorado */
    transform: translateY(-5px);
    text-shadow: 0 0 5px #ffd700, 0 0 10px #ffd700;
  }
`;
