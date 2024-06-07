import React from "react";
import { Servicio } from "@/app/types/types";
import MyCalendar from "./calendar";
import Modal from "../../modal/modal";

interface ServiceCalendarModalProps {
  servicio: Servicio;
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
}

const ServiceCalendarModal: React.FC<ServiceCalendarModalProps> = ({
  servicio,
  isOpen,
  onClose,
  isAdmin,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      title={`Disponibilidades para ${servicio.nombre}`}
      onClose={onClose}
      actions={[{ label: "Cerrar", handler: onClose }]}
    >
      <MyCalendar
        isAdmin={isAdmin}
        servicioId={servicio.id}
        closeParentModal={onClose} // Pass onClose as closeParentModal
      />
    </Modal>
  );
};

export default ServiceCalendarModal;
