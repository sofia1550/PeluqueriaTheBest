import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Disponibilidad } from "@/app/types/types";

interface DisponibilidadState {
  disponibilidades: Disponibilidad[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError | null;
}

const initialState: DisponibilidadState = {
  disponibilidades: [],
  status: "idle",
  error: null,
};
export const fetchAllDisponibilidades = createAsyncThunk<
  Disponibilidad[],
  void,
  { rejectValue: SerializedError }
>("disponibilidad/fetchAllDisponibilidades", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/disponibilidades"
    );
    return response.data.map((disp: any) => ({
      ...disp,
      title: disp.servicio_nombre,
      start: disp.fecha_inicio,
      end: disp.fecha_fin,
    }));
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue({
        name: "FetchError",
        message:
          err.response.data?.message || "Error al cargar disponibilidades",
        stack: err.stack,
        code: err.response.status.toString(),
      });
    }
    return rejectWithValue({
      name: "FetchError",
      message: "Error al cargar disponibilidades",
      stack: err instanceof Error ? err.stack : undefined,
      code: "500",
    });
  }
});

export const fetchDisponibilidadesByService = createAsyncThunk<
  Disponibilidad[],
  number,
  { rejectValue: SerializedError }
>(
  "disponibilidad/fetchDisponibilidadesByService",
  async (servicioId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/disponibilidades/servicio/${servicioId}`
      );
      return response.data.map((disp: any) => ({
        ...disp,
        title: disp.servicio_nombre,
        start: disp.fecha_inicio,
        end: disp.fecha_fin,
      }));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({
          name: "FetchError",
          message:
            err.response.data?.message || "Error al cargar disponibilidades",
          stack: err.stack,
          code: err.response.status.toString(),
        });
      }
      return rejectWithValue({
        name: "FetchError",
        message: "Error al cargar disponibilidades",
        stack: err instanceof Error ? err.stack : undefined,
        code: "500",
      });
    }
  }
);
export const fetchDisponibilidades = createAsyncThunk<
  Disponibilidad[],
  void,
  { rejectValue: SerializedError }
>("disponibilidad/fetchDisponibilidades", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/disponibilidades"
    );
    return response.data.map((disp: any) => ({
      ...disp,
      title: disp.servicio_nombre,
      start: disp.fecha_inicio, // Almacenar como cadena
      end: disp.fecha_fin, // Almacenar como cadena
    }));
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue({
        name: "FetchError",
        message:
          err.response.data?.message || "Error al cargar disponibilidades",
        stack: err.stack,
        code: err.response.status.toString(),
      });
    }
    return rejectWithValue({
      name: "FetchError",
      message: "Error al cargar disponibilidades",
      stack: err instanceof Error ? err.stack : undefined,
      code: "500",
    });
  }
});

export const addDisponibilidad = createAsyncThunk<
  Disponibilidad,
  Omit<Disponibilidad, "id" | "title" | "start" | "end">,
  { rejectValue: SerializedError }
>(
  "disponibilidad/addDisponibilidad",
  async (disponibilidad, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/disponibilidades",
        {
          servicio_id: disponibilidad.servicio_id,
          fecha_inicio: disponibilidad.fecha_inicio, // Enviar como cadena
          fecha_fin: disponibilidad.fecha_fin, // Enviar como cadena
          disponible: disponibilidad.disponible,
        }
      );
      return {
        ...response.data,
        title: `Servicio ${response.data.servicio_nombre}`,
        start: response.data.fecha_inicio, // Almacenar como cadena
        end: response.data.fecha_fin, // Almacenar como cadena
      };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({
          name: "AddError",
          message:
            err.response.data?.message || "Error al agregar disponibilidad",
          stack: err.stack,
          code: err.response.status.toString(),
        });
      }
      return rejectWithValue({
        name: "AddError",
        message: "Error al agregar disponibilidad",
        stack: err instanceof Error ? err.stack : undefined,
        code: "500",
      });
    }
  }
);

export const updateDisponibilidad = createAsyncThunk<
  Disponibilidad,
  Disponibilidad,
  { rejectValue: SerializedError }
>(
  "disponibilidad/updateDisponibilidad",
  async (disponibilidad, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/disponibilidades/${disponibilidad.id}`,
        {
          servicio_id: disponibilidad.servicio_id,
          fecha_inicio: disponibilidad.fecha_inicio, // Enviar como cadena
          fecha_fin: disponibilidad.fecha_fin, // Enviar como cadena
          disponible: disponibilidad.disponible,
        }
      );
      return {
        ...response.data,
        title: `Servicio ${response.data.servicio_nombre}`,
        start: response.data.fecha_inicio, // Almacenar como cadena
        end: response.data.fecha_fin, // Almacenar como cadena
      };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({
          name: "UpdateError",
          message:
            err.response.data?.message || "Error al actualizar disponibilidad",
          stack: err.stack,
          code: err.response.status.toString(),
        });
      }
      return rejectWithValue({
        name: "UpdateError",
        message: "Error al actualizar disponibilidad",
        stack: err instanceof Error ? err.stack : undefined,
        code: "500",
      });
    }
  }
);

export const deleteDisponibilidad = createAsyncThunk<
  number,
  number,
  { rejectValue: SerializedError }
>("disponibilidad/deleteDisponibilidad", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:3001/api/disponibilidades/${id}`);
    return id;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue({
        name: "DeleteError",
        message:
          err.response.data?.message || "Error al eliminar disponibilidad",
        stack: err.stack,
        code: err.response.status.toString(),
      });
    }
    return rejectWithValue({
      name: "DeleteError",
      message: "Error al eliminar disponibilidad",
      stack: err instanceof Error ? err.stack : undefined,
      code: "500",
    });
  }
});

const disponibilidadSlice = createSlice({
  name: "disponibilidad",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDisponibilidades.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllDisponibilidades.fulfilled,
        (state, action: PayloadAction<Disponibilidad[]>) => {
          state.disponibilidades = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(
        fetchAllDisponibilidades.rejected,
        (state, action: PayloadAction<SerializedError | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      )
      .addCase(fetchDisponibilidadesByService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDisponibilidadesByService.fulfilled,
        (state, action: PayloadAction<Disponibilidad[]>) => {
          state.disponibilidades = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(
        fetchDisponibilidadesByService.rejected,
        (state, action: PayloadAction<SerializedError | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      )
      .addCase(fetchDisponibilidades.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDisponibilidades.fulfilled,
        (state, action: PayloadAction<Disponibilidad[]>) => {
          state.disponibilidades = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(
        fetchDisponibilidades.rejected,
        (state, action: PayloadAction<SerializedError | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      )
      .addCase(
        addDisponibilidad.fulfilled,
        (state, action: PayloadAction<Disponibilidad>) => {
          state.disponibilidades.push(action.payload);
        }
      )
      .addCase(
        updateDisponibilidad.fulfilled,
        (state, action: PayloadAction<Disponibilidad>) => {
          const index = state.disponibilidades.findIndex(
            (d) => d.id === action.payload.id
          );
          if (index !== -1) {
            state.disponibilidades[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteDisponibilidad.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.disponibilidades = state.disponibilidades.filter(
            (d) => d.id !== action.payload
          );
        }
      );
  },
});

export default disponibilidadSlice.reducer;
