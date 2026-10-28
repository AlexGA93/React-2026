import { useAuthStore } from "@/auth/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export const useCheckStatus = () => {
  // * llamamos al estore de auth de zustand
  // desestructuramos la funcion definida checkAuthStatus la cual llama a la accion checkAuthAction.
  const { checkAuthStatus } = useAuthStore();

  return useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    // si fallara la peticion, no se vuelve a intentar
    retry: false,
    // establecemos un periodo de tiempo para que cada x tiempo se haga una nueva peticion
    refetchInterval: 1000 * 60 * 1.5, // 1 hora y media
    // al volver a la pestaña, comprueba de nuevo si sigues conectado
    refetchOnWindowFocus: true,
  });
};
