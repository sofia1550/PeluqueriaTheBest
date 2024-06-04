"use client";
import React from "react";
import Navbar from "../components/navbar/navbar";
import Reservationn from "../components/reservationCalendar/reservation";
import MyCalendar from "../components/calendar/calendar";

const Reservation: React.FC = () => {
  return (
    <>
      <Navbar />
      <Reservationn/>
      <MyCalendar/>
    </>
  );
};

export default Reservation;
