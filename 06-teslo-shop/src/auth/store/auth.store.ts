// importamos
import type { LoginPayload, RegisterPayload } from "@/interfaces/auth.options";
import type { User } from "@/interfaces/user.response";
import { create } from "zustand";
import { checkAuthAction } from "../actions/check-auth.action";
import { loginAction } from "../actions/login.action";
import { registerAction } from "../actions/register.action";

type AuthStatus =
  | "authenticated"
  | "not-authenticated"
  | "registered"
  | "checking";
// definimos tipado de nuestro Store
type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  // Getters
  isAdmin: () => boolean;
  // Actions
  login: (payload: LoginPayload) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};
// definimos la funcion de creacion con la informacion
export const useAuthStore = create<AuthState>()((set, get) => ({
  // Implementacion del Store (default State)
  user: null,
  token: null,
  authStatus: "checking",
  // Getters
  isAdmin: () => {
    // const roles = get().user?.roles || [];
    // return roles.includes("admin");

    return !!get().user?.roles.includes("admin");
  },
  // Actions
  login: async (payload: LoginPayload) => {
    console.log({ payload });

    // * gestionamos la logica
    try {
      const { email, password } = payload;
      // hacemos peticion
      const data = await loginAction({ email, password });
      // guardamos datos en lcoal storage
      localStorage.setItem("token", data.token);
      // * GUARDAMOS LOS DATOS EN EL ESTADO GLOBAL ZUSTAND
      set({ user: data.user, token: data.token, authStatus: "authenticated" });

      // devolvemos el booleano que hemos especificado
      return true;
    } catch (error) {
      // nos cercionamos de que los datos de estado y local storage no se guarden
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      // devolvemos el booleano que hemos especificado
      return false;
    }
  },

  register: async (payload: RegisterPayload) => {
    console.log({ payload });

    // * gestionamos la logica
    try {
      const { fullName, email, password } = payload;
      // hacemos peticion
      const data = await registerAction({ fullName, email, password });
      // guardamos datos en lcoal storage
      localStorage.setItem("token", data.token);
      // * GUARDAMOS LOS DATOS EN EL ESTADO GLOBAL ZUSTAND
      set({ user: data.user, token: data.token, authStatus: "registered" });

      // devolvemos el booleano que hemos especificado
      return true;
    } catch (error) {
      // nos cercionamos de que los datos de estado y local storage no se guarden
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      // devolvemos el booleano que hemos especificado
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user,
        token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      set({
        user: undefined,
        token: undefined,
        authStatus: "not-authenticated",
      });
      return false;
    }
  },
}));
