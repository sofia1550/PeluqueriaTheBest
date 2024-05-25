// Home.tsx
"use client";
import React from "react";

import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
import { GlobalStyle } from "./globalStyle/globalStyle";
function Home() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Header />
    </>
  );
}

export default Home;
