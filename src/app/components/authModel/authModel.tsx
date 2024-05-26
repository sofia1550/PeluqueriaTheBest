"use client";
import React, { useState, useEffect } from "react";
import { RootState } from "@/redux/store";
import { loginUser, registerUser } from "@/redux/features/auth/authSlice";
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
    if (status === "succeeded") {
      toast.success(isLogin ? "Login successful!" : "Registration successful!");
      dispatch(hideAuthModal());
    } else if (status === "failed" && error) {
      toast.error(error);
    }
  }, [status, isLogin, dispatch, error]);

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
        {error && <Error>{error}</Error>}
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
