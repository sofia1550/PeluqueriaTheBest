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
  error: Record<string, string> | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const getInitialAuthState = (): AuthState => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        return {
          isAuthenticated: true,
          user: JSON.parse(user),
          isLoading: false,
          error: null,
          status: "succeeded",
        };
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }
  return {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
    status: "idle",
  };
};

const initialState: AuthState = getInitialAuthState();

const getToken = (): string | null =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/auth"
    : "http://localhost:3001/api/auth";

export const checkAuthentication = createAsyncThunk<
  { isAuthenticated: boolean; user: User | null },
  void,
  { state: RootState; rejectValue: Record<string, string> }
>("/auth/checkAuthentication", async (_, { rejectWithValue }) => {
  const token = getToken();
  if (!token) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  try {
    const response = await axios.get(`http://localhost:3001/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      isAuthenticated: true,
      user: response.data as User,
    };
  } catch (error) {
    return rejectWithValue({
      general: "No se pudo verificar la autenticación",
    });
  }
});

export const loginUser = createAsyncThunk<
  { isAuthenticated: boolean; user: User | null },
  { email: string; password: string },
  { state: RootState; rejectValue: Record<string, string> }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return {
      isAuthenticated: true,
      user: response.data.user as User,
    };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        return rejectWithValue({ general: "Credenciales inválidas" });
      }
      if (error.response.data && error.response.data.errors) {
        return rejectWithValue(
          error.response.data.errors.reduce(
            (
              acc: Record<string, string>,
              err: { param: string; msg: string }
            ) => {
              acc[err.param] = err.msg;
              return acc;
            },
            {}
          )
        );
      }
    }
    return rejectWithValue({ general: "Error desconocido al iniciar sesión" });
  }
});

export const registerUser = createAsyncThunk<
  { isAuthenticated: boolean; user: User | null },
  { nombre: string; email: string; password: string },
  { state: RootState; rejectValue: Record<string, string> }
>(
  "auth/registerUser",
  async ({ nombre, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        nombre,
        email,
        password,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return {
        isAuthenticated: true,
        user: response.data.user as User,
      };
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 && data.errors) {
          return rejectWithValue(
            data.errors.reduce(
              (
                acc: Record<string, string>,
                err: { param: string; msg: string }
              ) => {
                acc[err.param] = err.msg;
                return acc;
              },
              {}
            )
          );
        } else if (status === 409) {
          return rejectWithValue({ email: "El usuario ya existe" });
        } else {
          return rejectWithValue({
            general: "El usuario ya existe",
          });
        }
      } else {
        return rejectWithValue({
          general: "No se pudo conectar con el servidor",
        });
      }
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, { state: RootState }>(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
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
    clearError: (state) => {
      state.error = null;
    },
    setAuthStateFromClient: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean; user: User | null }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
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
        (state, action: PayloadAction<Record<string, string> | undefined>) => {
          state.isAuthenticated = false;
          state.user = null;
          state.isLoading = false;
          state.error = action.payload || { general: "Unknown error" };
          state.status = "failed";
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
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
        (state, action: PayloadAction<Record<string, string> | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || { general: "Unknown error" };
          state.status = "failed";
        }
      )
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
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
        (state, action: PayloadAction<Record<string, string> | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || { general: "Unknown error" };
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

export const { logout, clearError, setAuthStateFromClient } = authSlice.actions;

export default authSlice.reducer;
