import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../store";

// Definición de la interfaz User
interface User {
  id: number;
  nombre: string;
  email: string;
}

// Definición de la interfaz Product
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  OrderProducts: {
    quantity: number;
  };
  imageFileName?: string;
}

// Definición de la interfaz ProductOrder actualizada
interface ProductOrder {
  id: number;
  user_id: number;
  user?: User;
  phone_number: string;
  total: number;
  shipping_method: string;
  address?: string;
  city?: string;
  payment_method: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  products: Product[];
  payment_proof_url?: string;
}

// Interfaz para el payload de creación de órdenes
export interface OrderCreationPayload {
  user_id: number;
  phone_number: string;
  total: number;
  products: { id: number; quantity: number }[];
  shipping_method: string;
  address?: string;
  city?: string;
  payment_method: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Estado inicial para las órdenes de productos
interface ProductOrderState {
  orders: ProductOrder[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductOrderState = {
  orders: [],
  status: "idle",
  error: null,
};

// Type guard para AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

// Thunks

// Obtener todas las órdenes de compra de productos
// Obtener todas las órdenes de compra de productos
// Obtener todas las órdenes de compra de productos
export const fetchProductOrders = createAsyncThunk(
  "productOrders/fetchProductOrders",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Iniciando solicitud para obtener órdenes de productos...");

      const response = await axios.get(
        "https://backendiaecommerce.onrender.com/api/productOrders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Respuesta recibida de la API:", response.data);

      // Mapeo de las órdenes, incluyendo la verificación de la existencia del usuario y los productos
      const mappedOrders = response.data.map((order: any) => {
        // Verifica si el comprobante ya contiene '/uploads/' para evitar duplicados
        const paymentProof = order.payment_proof?.includes("/uploads/")
          ? order.payment_proof.replace("/uploads/", "")
          : order.payment_proof;

        return {
          ...order,
          // Verifica si los datos del usuario están presentes, si no, asigna valores predeterminados
          user: order.user_name
            ? {
                id: order.user_id,
                nombre: order.user_name || "Nombre no disponible",
                email: order.user_email || "Email no disponible",
              }
            : null, // Si no hay usuario, asigna null

          // Verifica si existen productos y si la estructura es correcta
          products: Array.isArray(order.products)
            ? order.products.map((product: any) => ({
                ...product,
                // Asegúrate de que la cantidad exista, si no, establece 0
                quantity:
                  product?.OrderProducts?.quantity || product.quantity || 0,
              }))
            : [], // Si no hay productos, devuelve un array vacío

          // Mapea el comprobante de pago (si existe) y construye la URL completa con la carpeta correcta
          payment_proof_url: paymentProof
            ? `https://backendiaecommerce.onrender.com/uploads/images/${paymentProof}` // Asegura la ruta correcta
            : null, // Si no existe comprobante, asigna null
        };
      });

      console.log("Órdenes mapeadas:", mappedOrders);
      return mappedOrders;
    } catch (error: unknown) {
      console.error("Error en la solicitud de órdenes:", error);

      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn("No se encontraron órdenes");
        return rejectWithValue("No se encontraron órdenes.");
      }

      const errorMessage = isAxiosError(error)
        ? error.message
        : "Error desconocido";
      console.error("Mensaje de error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Crear una nueva orden de compra de productos con comprobante de pago
export const createProductOrder = createAsyncThunk(
  "productOrders/createProductOrder",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://backendiaecommerce.onrender.com/api/productOrders/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.order;
    } catch (error: unknown) {
      return rejectWithValue(
        isAxiosError(error) ? error.message : "Error desconocido"
      );
    }
  }
);

// Crear una nueva orden de compra de productos con Mercado Pago
export const createProductOrderMercadoPago = createAsyncThunk(
  "productOrders/createProductOrderMercadoPago",
  async (orderData: OrderCreationPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://backendiaecommerce.onrender.com/api/productOrders/mercadopago",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.init_point;
    } catch (error: unknown) {
      console.error("Error en la solicitud de Mercado Pago:", error);
      return rejectWithValue(
        isAxiosError(error) ? error.message : "Error desconocido"
      );
    }
  }
);

// Actualizar el estado de una orden
export const updateOrderStatus = createAsyncThunk(
  "productOrders/updateOrderStatus",
  async (
    { id, status }: { id: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `https://backendiaecommerce.onrender.com/api/productOrders/${id}/status`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Asegúrate de que la respuesta contenga el objeto 'order'
      if (!response.data || !response.data.order) {
        throw new Error("La respuesta no contiene una orden actualizada");
      }

      return response.data.order; // Devolver la orden actualizada
    } catch (error: unknown) {
      return rejectWithValue(
        isAxiosError(error) ? error.message : "Error desconocido"
      );
    }
  }
);

// Slice para manejar el estado de las órdenes de productos
const productOrderSlice = createSlice({
  name: "productOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductOrders.fulfilled,
        (state, action: PayloadAction<ProductOrder[]>) => {
          state.status = "succeeded";
          state.orders = action.payload;
        }
      )
      .addCase(fetchProductOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createProductOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createProductOrder.fulfilled,
        (state, action: PayloadAction<ProductOrder>) => {
          state.status = "succeeded";
          state.orders.push(action.payload);
        }
      )
      .addCase(createProductOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createProductOrderMercadoPago.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createProductOrderMercadoPago.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
        }
      )
      .addCase(createProductOrderMercadoPago.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<ProductOrder>) => {
          state.status = "succeeded";
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
        }
      )
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Exportar el reducer por defecto
export default productOrderSlice.reducer;

// Selectores para acceder al estado desde los componentes
export const selectAllProductOrders = (state: RootState) =>
  state.productOrders.orders;
export const getProductOrderStatus = (state: RootState) =>
  state.productOrders.status;
export const getProductOrderError = (state: RootState) =>
  state.productOrders.error;
