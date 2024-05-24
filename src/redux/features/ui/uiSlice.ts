import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isMenuOpen: boolean;
}

const initialState: UIState = {
  isMenuOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
  },
});

export const { toggleMenu, setMenuOpen } = uiSlice.actions;

export default uiSlice.reducer;
