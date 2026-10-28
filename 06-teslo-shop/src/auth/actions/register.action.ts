import { tesloApi } from "@/api/teslo-api";
import type { RegisterPayload } from "@/interfaces/auth.options";
import type { AuthResponse } from "@/interfaces/auth.response";

export const registerAction = async (
  registerPayload: RegisterPayload,
): Promise<AuthResponse> => {
  try {
    console.log({ registerPayload });

    // hacemos peticion post a login incluyendo valores de inicio de sesion
    const { data } = await tesloApi.post<AuthResponse>(
      "/auth/register",
      registerPayload,
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
