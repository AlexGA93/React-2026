import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { FavoriteHeroProvider } from "./heroes/context/FavoriteHeroContext";
import { appRouter } from "./router/app.router";

// creamos nueva instancia del QueryClient
const queryClient = new QueryClient();

export const HeroesApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Provider del estado global para favoritos */}
      <FavoriteHeroProvider>
        <RouterProvider router={appRouter} />
        {/* The rest of your application */}
        <ReactQueryDevtools initialIsOpen={false} />
      </FavoriteHeroProvider>
    </QueryClientProvider>
  );
};
