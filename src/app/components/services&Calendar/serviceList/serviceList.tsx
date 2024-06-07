import React, { useState, useEffect } from "react";
import axios from "axios";

import { Servicio } from "@/app/types/types";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import ServiceCalendarModal from "../calendar/serviceCalendarModal";
import ServiceCard from "../serviceCard/serviceCard";
import { CardContainer } from "../serviceCard/serviceCardStyled";

const ServiceList: React.FC = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/servicios");
        setServicios(response.data);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };
    fetchServicios();
  }, []);

  const handleReserveClick = (servicio: Servicio) => {
    setSelectedServicio(servicio);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedServicio(null);
  };

  return (
    <div>
      <CardContainer>
        {servicios.map((servicio) => (
          <ServiceCard
            key={servicio.id}
            servicio={servicio}
            onReserve={() => handleReserveClick(servicio)}
          />
        ))}
      </CardContainer>

      {selectedServicio && (
        <ServiceCalendarModal
          servicio={selectedServicio}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default ServiceList;
