// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/user/userSlice";
import uiSlice from "./features/ui/uiSlice";
import productReducer from "../redux/features/product/productSlice"; // Asegúrate de que la ruta sea correcta
import cartReducer from "../redux/features/cart/cartSlice"; // Asegúrate de que la ruta sea correcta
import sidebarReducer from "../redux/features/sidebar/sidebarSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    ui: uiSlice,
    cart: cartReducer,
    sidebar: sidebarReducer,
  },
});

// Type for dispatch and RootState
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
