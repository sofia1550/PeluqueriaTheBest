// src/redux/features/sidebar/sidebarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  name: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  minQuantity: number | null;
  maxQuantity: number | null;
}

interface SidebarState {
  isOpen: boolean;
  filters: FiltersState;
}

const initialState: SidebarState = {
  isOpen: true,
  filters: {
    name: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    minQuantity: null,
    maxQuantity: null,
  },
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
    setFilters(state, action: PayloadAction<FiltersState>) {
      state.filters = action.payload;
    },
  },
});

export const { toggleSidebar, setFilters } = sidebarSlice.actions;
export default sidebarSlice.reducer;
