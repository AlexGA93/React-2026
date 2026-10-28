import { tesloApi } from "@/api/teslo-api";
import type { LoginPayload } from "@/interfaces/auth.options";
import type { AuthResponse } from "@/interfaces/auth.response";

export const loginAction = async (
  loginPayload: LoginPayload,
): Promise<AuthResponse> => {
  try {
    // hacemos peticion post a login incluyendo valores de inicio de sesion
    const { data } = await tesloApi.post<AuthResponse>(
      "/auth/login",
      loginPayload,
    );
    // imprimimos los datos para prueba
    console.log({ data });

    // devolvemos los datos
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
