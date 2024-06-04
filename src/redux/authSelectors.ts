import { createSelector } from "reselect";
import { RootState } from "./store";

const selectAuth = (state: RootState) => state.auth;

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);

export const selectIsLoading = createSelector(
  [selectAuth],
  (auth) => auth.isLoading
);
