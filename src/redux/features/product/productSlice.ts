import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { API_BASE_URL } from "../../../config";
import { getToken } from "@/app/utils/utils";
import { Product } from "../cart/cartSlice";

interface ProductState {
  visibleProducts: Product[];
  showMore: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  visibleProducts: [],
  showMore: false,
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/api/products`);
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData: FormData) => {
    const response = await axios.post<Product>(
      `${API_BASE_URL}/api/products/add`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    productData: { id: string; formData: FormData },
    { rejectWithValue }
  ) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue("Authentication token is not available.");
    }

    try {
      const response = await axios.put<Product>(
        `${API_BASE_URL}/api/products/update/${productData.id}`,
        productData.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Authentication token is not available.");
      }
      const response = await axios.delete(
        `${API_BASE_URL}/api/products/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Manejo de errores
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setShowMore: (state, action: PayloadAction<boolean>) => {
      state.showMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.visibleProducts = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.status = "failed";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.visibleProducts.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.visibleProducts.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.visibleProducts[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.visibleProducts = state.visibleProducts.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export const { setShowMore } = productSlice.actions;

export const selectShowMore = (state: RootState) => state.product.showMore;
export const selectVisibleProducts = (state: RootState) =>
  state.product.visibleProducts;

export default productSlice.reducer;
