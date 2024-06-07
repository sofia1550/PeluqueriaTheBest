import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  Card,
  CardButton,
  CardTitle,
  CardDescription,
  CardPrice,
} from "./serviceCardStyled";
import { Servicio } from "@/app/types/types";

interface ServiceCardProps {
  servicio: Servicio;
  onReserve: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ servicio, onReserve }) => {
  return (
    <Card>
      <CardTitle>
        <FaRegCalendarAlt style={{ marginRight: "8px", color: "#ffd700" }} />
        {servicio.nombre}
      </CardTitle>
      <CardDescription>{servicio.descripcion}</CardDescription>
      <CardPrice>Precio: ${servicio.precio}</CardPrice>
      <CardButton onClick={onReserve}>Reservar</CardButton>
    </Card>
  );
};

export default ServiceCard;
