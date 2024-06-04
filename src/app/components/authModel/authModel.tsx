"use client"
import React, { useState, useEffect } from "react";
import { RootState } from "@/redux/store";
import {
  loginUser,
  registerUser,
  clearError,
  setAuthStateFromClient,
} from "@/redux/features/auth/authSlice";
import { hideAuthModal } from "@/redux/features/ui/uiSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import dynamic from "next/dynamic";
import {
  Modal,
  ModalContent,
  ModalClose,
  Field,
  Label,
  Input,
  Button,
  Error,
} from "./AuthModalStyled";
import "react-toastify/dist/ReactToastify.css";

const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector(
    (state: RootState) => state.ui.isAuthModalVisible
  );
  const modalMode = useAppSelector(
    (state: RootState) => state.ui.authModalMode
  );
  const isLoading = useAppSelector((state: RootState) => state.auth.isLoading);
  const error = useAppSelector((state: RootState) => state.auth.error);
  const status = useAppSelector((state: RootState) => state.auth.status);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");

  const isLogin = modalMode === "login";

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleRegister = () => {
    dispatch(registerUser({ nombre, email, password }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    let user = null;
    if (userString) {
      try {
        user = JSON.parse(userString);
      } catch (error) {
        console.error("Invalid user JSON:", error);
        user = null;
      }
    }
    const isAuthenticated = !!token;
    dispatch(setAuthStateFromClient({ isAuthenticated, user }));
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      toast.success(isLogin ? "Login successful!" : "Registration successful!");
      dispatch(hideAuthModal());
    } else if (status === "failed" && error) {
      if (typeof error === "object") {
        Object.keys(error).forEach((key) => {
          toast.error(error[key], { autoClose: 3000 });
        });
      } else {
        toast.error(error, { autoClose: 3000 });
      }
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [status, isLogin, dispatch, error]);

  useEffect(() => {
    if (!showModal) {
      setEmail("");
      setPassword("");
      setNombre("");
      dispatch(clearError());
      toast.dismiss();
    }
  }, [showModal, dispatch]);

  return (
    <Modal $show={showModal}>
      <ModalContent $show={showModal}>
        <ModalClose onClick={() => dispatch(hideAuthModal())}>
          &times;
        </ModalClose>
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <Field>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
          />
          <Label className={email ? "filled" : ""}>Email</Label>
        </Field>
        <Field>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
          />
          <Label className={password ? "filled" : ""}>Password</Label>
        </Field>
        {!isLogin && (
          <Field>
            <Input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder=" "
            />
            <Label className={nombre ? "filled" : ""}>Nombre</Label>
          </Field>
        )}
        {error && (
          <Error>
            {typeof error === "object"
              ? Object.values(error).join(", ")
              : error}
          </Error>
        )}
        <div className="mt-4">
          <Button
            onClick={isLogin ? handleLogin : handleRegister}
            disabled={isLoading}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default dynamic(() => Promise.resolve(AuthModal), { ssr: false });
