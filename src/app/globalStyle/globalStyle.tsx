import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(145deg, #1e2a38, #1c1c1c);
    color: #fff; 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  .customTypography {
    font-family: 'Arial', sans-serif;
  }

  #__next {
    height: 100%;
  }

  button {
    background-color: #ffd700;
    border: none;
    border-radius: 5px;
    color: #1c1c1c;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  button:hover {
    background-color: #e6b800;
    transform: scale(1.05);
  }
`;
