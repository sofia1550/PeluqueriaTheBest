"use client"
import React from "react";
import {
  ReservationContainer,
  ImageSection,
  TextSection,
  Title,
  Description,
  ReserveButton,
} from "./servicesStyled";

const Services: React.FC = () => {
  return (
    <ReservationContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ImageSection
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1 }}
      />
      <TextSection
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1 }}
      >
        <Title>Reserva tu Turno</Title>
        <Description>
          ¡Bienvenido a nuestro salón unisex! Ofrecemos una amplia gama de
          servicios para que te sientas y te veas genial. Reserva tu turno
          ahora para experimentar lo mejor en cuidado personal.
        </Description>
        <ReserveButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
          Reservar Ahora
        </ReserveButton>
      </TextSection>
    </ReservationContainer>
  );
};

export default Services;
