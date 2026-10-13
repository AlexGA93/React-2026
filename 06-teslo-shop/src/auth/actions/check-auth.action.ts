import { tesloApi } from "@/api/teslo-api";
import type { AuthResponse } from "@/interfaces/auth.response";

export const checkAuthAction = async () => {
  // extraemos el token del localstorage
  const token = localStorage.getItem("token");

  // comprobamos si hay token. Si no, enviamos error
  if (!token) throw new Error("No token found");

  // ciclo pricipal
  try {
    // hacemos peticion desestructurando la respuesta
    const { data } = await tesloApi.get<AuthResponse>("/auth/check-status");

    // almacenamos el nuevo token devuelto por la peticion sustituyendo al que ya habia
    localStorage.setItem("token", data.token);

    // devolvemos los datos
    return data;
  } catch (error) {
    console.error({ error });

    // borramos el token de localstorage por si acaso
    localStorage.removeItem("token");

    // saltamos el error
    throw new Error("El token ha expirado o no es valido ");
  }
};
