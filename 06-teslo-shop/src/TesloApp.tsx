import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";

// generamos el query cLient
const queryClient = new QueryClient();

export const TesloApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Rutas de la aplicacion */}
      <RouterProvider router={appRouter} />
      {/* definicion de las React Query DevTools de Tanstack Query */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
