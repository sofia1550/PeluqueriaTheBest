import React from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Disponibilidad } from "@/app/types/types";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
} from "../services&Calendar/modalStyled/modalStyled";
import { showAuthModal } from "@/redux/features/ui/uiSlice";

interface ReserveModalProps {
  disponibilidad: Disponibilidad;
  isOpen: boolean;
  onClose: () => void;
  closeParentModal: () => void; // New prop
}

const ReserveModal: React.FC<ReserveModalProps> = ({
  disponibilidad,
  isOpen,
  onClose,
  closeParentModal, // Destructure new prop
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);

  const handleConfirmReserve = async () => {
    if (!user) {
      dispatch(showAuthModal("register"));
      closeParentModal(); // Close the parent modal when opening auth modal
      return;
    }

    try {
      const total = disponibilidad.servicio_precio;
      await axios.post("http://localhost:3001/api/orders", {
        user_id: user.id,
        disponibilidad_id: disponibilidad.id,
        total,
      });
      alert("Reserva realizada con éxito.");
      onClose();
    } catch (error) {
      console.error("Error realizando la reserva:", error);
      alert("Error realizando la reserva.");
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <ModalHeader>Confirmar Reserva</ModalHeader>
        <ModalContent>
          <p>Servicio: {disponibilidad.servicio_nombre}</p>
          <p>
            Fecha Inicio:{" "}
            {new Date(disponibilidad.fecha_inicio).toLocaleString()}
          </p>
          <p>
            Fecha Fin: {new Date(disponibilidad.fecha_fin).toLocaleString()}
          </p>
          <p>Precio: ${disponibilidad.servicio_precio}</p>
        </ModalContent>
        <ModalActions>
          <Button onClick={handleConfirmReserve}>Confirmar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ReserveModal;
