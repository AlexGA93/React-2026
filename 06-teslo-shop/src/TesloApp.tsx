import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { PropsWithChildren } from "react";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { CustomLoadingScreen } from "./components/custom/CustomLoadingScreen";
import { useCheckStatus } from "./hooks/useCheckStatus";
import { appRouter } from "./router/app.router";

// generamos el query cLient
const queryClient = new QueryClient();

/**
 * * Vamos a definir un CUSTOM PROVIDER como un componente interno.
 * La finalidad es que dicho provider englobe el enrutado permitiendo la definicion en dicho custom provider de una peticion de checkAuthAction mediante tanstack query
 */
const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { isLoading } = useCheckStatus();

  if (isLoading) return <CustomLoadingScreen />;

  return children;
};

export const TesloApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Incorporamos Toaster a la app */}
      <Toaster />
      {/* Englobamos el enrutado en el custom provider para cargar el curstom hook de check-status */}
      <CheckAuthProvider>
        {/* Rutas de la aplicacion */}
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      {/* definicion de las React Query DevTools de Tanstack Query */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
