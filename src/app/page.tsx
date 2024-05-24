// Home.tsx
"use client";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks"; // Asegúrate de ajustar la ruta de importación
import {
  fetchProducts,
  selectVisibleProducts,
} from "@/redux/features/product/productSlice"; // Asegúrate de que la ruta de importación sea correcta
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
import { GlobalStyle, MainContainer } from "./globalStyle/globalStyle";
function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectVisibleProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
    <GlobalStyle></GlobalStyle>
     <Navbar></Navbar>
     <Header></Header>
     <MainContainer></MainContainer>
    </>
  );
}

export default Home;
