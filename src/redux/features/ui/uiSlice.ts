import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  isAuthModalVisible: boolean;
  authModalMode: 'login' | 'register';
}

const initialState: UIState = {
  isAuthModalVisible: false,
  authModalMode: 'login',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showAuthModal: (state, action) => {
      state.isAuthModalVisible = true;
      state.authModalMode = action.payload; // 'login' or 'register'
    },
    hideAuthModal: (state) => {
      state.isAuthModalVisible = false;
    },
  },
});

export const { showAuthModal, hideAuthModal } = uiSlice.actions;

export default uiSlice.reducer;

