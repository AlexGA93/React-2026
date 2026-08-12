import { HeroesLayout } from "@/heroes/layout/HeroesLayout";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";
// import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { AdminLayout } from "@/admin/layout/AdminLayout";
// import { AdminPage } from "@/admin/pages/AdminPage";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

// aplicamos lazy load en componente
// const searchPage = lazy(() => import("@/heroes/pages/search/SearchPage").then(module => ({ default: module.SearchPage })));

/**
 * * APLICAREMOS ESTE METODO UNICAMENTE A AQUELLAS QUE NO SEAN COMUNMENTE ACCESIBLES PARA AHORRAR CARGA DE MEMORIA
 */
// * al colocar 'export default Component' en el componente podemos acortar la orden
// const HomePage = lazy(() => import("@/heroes/pages/home/HomePage"));
const HeroPage = lazy(() => import("@/heroes/pages/hero/HeroPage"));
const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"));

const AdminPage = lazy(() => import("@/admin/pages/AdminPage"));

export const appRouter = createBrowserRouter([
  //  heroes layout
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        // path: "",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/hero/:slug",
        element: <HeroPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
