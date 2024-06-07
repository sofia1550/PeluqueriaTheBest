// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/features/product/productSlice"; // Asegúrate de que la ruta sea correcta
import cartReducer from "../redux/features/cart/cartSlice"; // Asegúrate de que la ruta sea correcta
import sidebarReducer from "../redux/features/sidebar/sidebarSlice";
import authReducer from "../redux/features/auth/authSlice";
import uiReducer from "./features/ui/uiSlice";
import disponibilidadReducer from "./features/disponibilidad/disponibilidadSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    sidebar: sidebarReducer,
    ui: uiReducer,
    auth: authReducer,
    disponibilidad: disponibilidadReducer,
  },
});

// Type for dispatch and RootState
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
