import { Middleware } from "redux";
import { RootState } from "@/redux/store";

interface CustomAction {
  type: string;
  payload?: any;
}

export const authMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const customAction = action as CustomAction;

    if (
      customAction.type.startsWith("auth/") &&
      !localStorage.getItem("token")
    ) {
      console.warn("Token no encontrado");
    }

    return next(action);
  };
