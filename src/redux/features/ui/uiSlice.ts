// uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isAuthModalVisible: boolean;
  authModalMode: "login" | "register";
}

const initialState: UIState = {
  isAuthModalVisible: false,
  authModalMode: "login",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showAuthModal(state, action: PayloadAction<"login" | "register">) {
      state.isAuthModalVisible = true;
      state.authModalMode = action.payload;
    },
    hideAuthModal(state) {
      state.isAuthModalVisible = false;
    },
    setAuthModalMode(state, action: PayloadAction<"login" | "register">) {
      state.authModalMode = action.payload;
    },
  },
});

export const { showAuthModal, hideAuthModal, setAuthModalMode } =
  uiSlice.actions;

export default uiSlice.reducer;
