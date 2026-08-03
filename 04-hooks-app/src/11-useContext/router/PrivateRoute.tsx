import { use } from "react";
import type { JSX } from "react/jsx-runtime";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

interface Props {
  element: JSX.Element;
}

export const PrivateRoute = ({ element }: Props) => {
  const { authStatus } = use(UserContext);

  // reaccionamos ante proceso aun en  ejecucion
  if (authStatus === "checking") {
    return <div>Loading...</div>;
  }

  // reaccionamos ante el proceso terminado satisfactoriamente devolviendo el elemento de props como hijo (ruta privada)
  if (authStatus === "authenticated") {
    return element;
  }

  // si nada se da, redirijimos al login
  return <Navigate to="/login" />;
};
