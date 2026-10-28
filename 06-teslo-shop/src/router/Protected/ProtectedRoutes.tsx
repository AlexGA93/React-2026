// * SE DEFINEN DOS TIPOS DE HIGHER COMPONENTS

import { useAuthStore } from "@/auth/store/auth.store";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  // accedemos al store de auth de zustang
  const { authStatus } = useAuthStore();

  // comprobaciones
  if (authStatus === "checking") return null;
  if (authStatus === "not-authenticated") return <Navigate to="/auth/login" />;

  // * pasan aquellos usuarios AUTENTICADOS (que no esten cargando o no autenticados)
  return children;
};

export const NoAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  // accedemos al store de auth de zustang
  const { authStatus } = useAuthStore();

  // comprobaciones
  if (authStatus === "checking") return null;
  if (authStatus === "authenticated") return <Navigate to="/" />;

  // * pasan aquellos usuarios NO AUTENTICADOS (que no esten cargando o ya autenticados)
  return children;
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
  // accedemos al store de auth de zustang
  const { authStatus, isAdmin } = useAuthStore();

  // comprobaciones
  if (authStatus === "checking") return null;
  if (authStatus === "not-authenticated") return <Navigate to="/auth/login" />;
  if (!isAdmin()) return <Navigate to="/" />;

  // * pasan aquellos usuarios CON ROL ADMIN (que no esten cargando o no autenticados)
  return children;
};
