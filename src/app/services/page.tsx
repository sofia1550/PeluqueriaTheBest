"use client";
import React from "react";
import Navbar from "../components/navbar/navbar";
import ServiceList from "../components/services&Calendar/serviceList/serviceList";
import Services from "../components/services&Calendar/services";
import Footer from "../components/footer/footer";
import HeroSlider from "../components/services&Calendar/slider/slider";

const ServicesPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Services />
      <HeroSlider/>
      <ServiceList />
      <Footer/>
    </>
  );
};

export default ServicesPage;
