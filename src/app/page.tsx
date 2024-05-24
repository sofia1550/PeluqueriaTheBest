// Home.tsx
"use client";
import React from "react";
import Navbar from "./components/navbar/navbar";
import { GlobalStyle } from "./globalStyle/globalStyle";
import Header from "./components/header/header";

function Home() {
  return (
    <>
      <Navbar />
      <GlobalStyle />
      <Header />
    </>
  );
}

export default Home;
