"use client";
import React from "react";
import Navbar from "../components/navbar/navbar";
import Services from "../components/services&Calendar/services";
import MyCalendar from "../components/services&Calendar/calendar/calendar";

const Reservation: React.FC = () => {
  return (
    <>
      <Navbar />
      <Services/>
      <MyCalendar/>
    </>
  );
};

export default Reservation;
