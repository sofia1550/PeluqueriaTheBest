import styled from "styled-components";

export const Modal = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.86);
  z-index: 1000;
`;

export const ModalContent = styled.div<{ $show: boolean }>`
  background: rgba(28, 28, 28, 0.9);
  color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  position: relative;
  width: 90%;
  max-width: 400px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: ${({ $show }) => ($show ? "translateY(0)" : "translateY(-100vh)")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #f8f9fa;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffd700;
  }
`;

export const Field = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  position: absolute;
  left: 1rem;
  top: 1.25rem;
  color: #9ca3af;
  transition: all 0.3s ease;
  pointer-events: none;

  &.focus,
  &:focus,
  &.filled {
    top: -0.75rem;
    left: 1rem;
    font-size: 0.75rem;
    color: #ffd700;
    background: rgba(28, 28, 28, 0.9);
    padding: 0 0.25rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1.25rem 0.75rem 0.75rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #f8f9fa;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ffd700;
  }

  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    top: -0.75rem;
    left: 1rem;
    font-size: 0.75rem;
    color: #ffd700;
    background: rgba(28, 28, 28, 0.9);
    padding: 0 0.25rem;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #ffd700;
  color: #1c1c1c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #1c1c1c;
    color: #ffd700;
  }
`;

export const Error = styled.p`
  color: red;
  margin-top: 1rem;
  text-align: center;
`;
