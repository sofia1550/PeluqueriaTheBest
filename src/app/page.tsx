// Home.tsx
"use client";
import React from "react";

import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
import { GlobalStyle } from "./globalStyle/globalStyle";
import Information from "./components/sectionInformationCarrousel/information/information";
import Footer from "./components/footer/footer";
import AuthModal from "./components/authModel/authModel";

function Home() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Header />
      <Information />
      <Footer />
      <AuthModal />
    </>
  );
}

export default Home;
