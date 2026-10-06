import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
// admin
import { DashboardPage } from "@/admin/pages/dashboard/DashboardPage";
import { AdminProductsPage } from "@/admin/pages/products/AdminProductsPage";
// auth
import { Login } from "@/auth/pages/login/Login";
import { Register } from "@/auth/pages/register/Register";
// pages
import { GenderPage } from "@/pages/gender/GenderPage";
import { HomePage } from "@/pages/home/HomePage";
import { ProductPage } from "@/pages/product/ProductPage";
// shop
import { AdminProductPage } from "@/admin/pages/product/AdminProductPage";
import { ShopLayout } from "@/shop/layouts/ShopLayout";

// * Declaramos el layout de autenticacion y administrativo como lazy (lazyload) debido a que no es necesario que se cargue hasta que el usuario acceda a el
const AuthLayout = lazy(() => import("@/auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("@/admin/layouts/AdminLayout"));

export const appRouter = createBrowserRouter([
  // ruta por defecto - Shop Layout
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      // ruta hija por defecto dentro del layout
      {
        index: true,
        element: <HomePage />,
      },
      // ruta hija para producto concreto
      {
        path: "product/:idSlug",
        element: <ProductPage />,
      },
      // ruta de genero
      {
        path: "gender/:gender",
        element: <GenderPage />,
      },
    ],
  },
  // layout de autenticacion
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      // ruta hija login
      {
        path: "login",
        element: <Login />,
      },
      // ruta hija register
      {
        path: "register",
        element: <Register />,
      },
      // ruta de redireccion contra rutas erroneas - redireccion a Login
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
    ],
  },
  // layout administrativo
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // ruta hija por defecto dentro del layout
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "products/:id",
        element: <AdminProductPage />,
      },
    ],
  },
  // * ruta de redireccion global para asegurarnos que lleven a HomePage pasando por ShopLayout
  {
    index: true,
    element: <Navigate to="/" />,
  },
]);
