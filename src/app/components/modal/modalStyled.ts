import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.7
  ); // Aumentamos la opacidad para un fondo más oscuro
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: background-color 0.3s ease;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 80vw;
  max-width: 1200px;
  height: auto;
  max-height: 80vh; // Limitar la altura máxima
  overflow-y: auto; // Añadir scroll si el contenido es demasiado alto
  transition: transform 0.3s ease;
  transform: scale(1);
  scrollbar-width: thin; // Para Firefox
  scrollbar-color: #ffd700 transparent; // Para Firefox

  &::-webkit-scrollbar {
    width: 10px; // Ancho del scroll
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffd700; // Color del scroll
    border-radius: 10px; // Radio del borde del scroll
    border: 3px solid transparent; // Espacio entre el scroll y el borde
    background-clip: content-box; // Ajuste del clip del fondo
  }

  &::-webkit-scrollbar-track {
    background: transparent; // Color de fondo del track
  }

  @media (max-width: 900px) {
    width: 90vw;
    max-width: 800px;
  }
  @media (max-width: 600px) {
    width: 95vw;
    max-width: 100%;
    padding: 20px;
    margin: 10px;
  }
`;

export const ModalHeader = styled.div`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

export const ModalContent = styled.div`
  margin-bottom: 30px;
  color: #333;
  font-size: 1em;
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Button = styled.button`
  padding: 12px 24px;
  border: none;
  background-color: #ffd700;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1em;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: #f8c200;
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 1em;
  }

  input[type="number"],
  input[type="datetime-local"],
  input[type="checkbox"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    width: 100%;
  }

  input[type="checkbox"] {
    width: auto;
    padding: 0;
    margin-left: 10px;
  }

  @media (max-width: 600px) {
    label {
      font-size: 0.9em;
    }

    input[type="number"],
    input[type="datetime-local"],
    input[type="checkbox"] {
      font-size: 0.9em;
    }
  }
`;
