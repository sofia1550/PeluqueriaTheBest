import styled, { createGlobalStyle } from "styled-components";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fontsource/montserrat'; 

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1c1c1c; /* Gris oscuro */
    color: #f8f9fa; /* Blanco hueso para el texto */
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
  }

  #__next {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(28, 28, 28, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
