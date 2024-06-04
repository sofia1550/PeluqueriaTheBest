"use client";
import React from "react";
import Navbar from "../components/navbar/navbar";
import Servicess from "../components/services&Calendar/services";
import MyCalendar from "../components/services&Calendar/calendar/calendar";

const Services: React.FC = () => {
  return (
    <>
      <Navbar />
      <Servicess/>
      <MyCalendar/>
    </>
  );
};

export default Services;
