import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

interface User {
  id: string;
  nombre: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  status: "idle",
};

const getToken = (): string | null => localStorage.getItem("token");

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/auth"
    : "/auth";

export const checkAuthentication = createAsyncThunk<
  { isAuthenticated: boolean; user: User | null },
  void,
  { state: RootState; rejectValue: string }
>("auth/checkAuthentication", async (_, { rejectWithValue }) => {
  const token = getToken();
  if (!token) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      isAuthenticated: true,
      user: response.data as User,
    };
  } catch (error) {
    return rejectWithValue("No se pudo verificar la autenticación");
  }
});

export const loginUser = createAsyncThunk<
  { isAuthenticated: boolean; user: User | null },
  { email: string; password: string },
  { state: RootState; rejectValue: string }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return {
      isAuthenticated: true,
      user: response.data.user as User,
    };
  } catch (error) {
    return rejectWithValue("Login fallido");
  }
});

export const registerUser = createAsyncThunk<
  { isAuthenticated: boolean; user: User | null },
  { nombre: string; email: string; password: string },
  { state: RootState; rejectValue: string }
>(
  "auth/registerUser",
  async ({ nombre, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        nombre,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      return {
        isAuthenticated: true,
        user: response.data.user as User,
      };
    } catch (error) {
      return rejectWithValue("Registro fallido");
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, { state: RootState }>(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    dispatch(logout());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthentication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        checkAuthentication.fulfilled,
        (
          state,
          action: PayloadAction<{ isAuthenticated: boolean; user: User | null }>
        ) => {
          state.isAuthenticated = action.payload.isAuthenticated;
          state.user = action.payload.user;
          state.isLoading = false;
          state.error = null;
          state.status = "succeeded";
        }
      )
      .addCase(
        checkAuthentication.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isAuthenticated = false;
          state.user = null;
          state.isLoading = false;
          state.error = action.payload || "Unknown error";
          state.status = "failed";
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ isAuthenticated: boolean; user: User | null }>
        ) => {
          state.isAuthenticated = action.payload.isAuthenticated;
          state.user = action.payload.user;
          state.isLoading = false;
          state.error = null;
          state.status = "succeeded";
        }
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || "Unknown error";
          state.status = "failed";
        }
      )
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{ isAuthenticated: boolean; user: User | null }>
        ) => {
          state.isAuthenticated = action.payload.isAuthenticated;
          state.user = action.payload.user;
          state.isLoading = false;
          state.error = null;
          state.status = "succeeded";
        }
      )
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || "Unknown error";
          state.status = "failed";
        }
      )
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = "idle";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
