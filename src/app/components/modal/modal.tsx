"use client";
import React, { ReactNode } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
} from "./modalStyled";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  actions: { label: string; handler: () => void }[];
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose, actions }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalContent>{children}</ModalContent>
        <ModalActions>
          {actions.map((action, index) => (
            <Button key={index} onClick={action.handler}>
              {action.label}
            </Button>
          ))}
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
