import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";
import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";

// Se aíslan las páginas para que estas pruebas se centren en la configuración y el despacho de rutas.
vi.mock("@/heroes/layout/HeroesLayout", () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      <Outlet />
    </div>
  ),
}));

// Cada ruta devuelve un marcador sencillo que permite identificar qué página se montó.
vi.mock("@/heroes/pages/home/HomePage", () => ({
  HomePage: () => <div data-testid="home-page"></div>,
}));

// useParams permanece activo en el mock para validar que la ruta dinámica entrega su slug.
vi.mock("@/heroes/pages/hero/HeroPage", () => ({
  default: () => {
    const { slug = "" } = useParams();

    return <div data-testid="hero-page">HeroPage - {slug}</div>;
  },
}));

vi.mock("@/heroes/pages/search/SearchPage", () => ({
  default: () => <div data-testid="search-page"></div>,
}));

describe("appRouter", () => {
  // El snapshot registra las rutas declaradas para detectar cambios de configuración.
  test("should be configured as expected", () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  // La ruta raíz debe renderizar la página principal dentro del layout.
  test("should render home page at root path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("home-page")).toBeDefined();
  });

  // Una ruta con parámetro dinámico debe llegar a la página de héroe con su slug.
  test("should render hero page at /hero/:slug path", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/hero/superman"],
    });

    render(<RouterProvider router={router} />);

    const heroPage = await screen.findByTestId("hero-page");
    expect(heroPage.textContent).toContain("superman");
  });

  // La ruta de búsqueda debe seleccionar el componente SearchPage.
  test("should render search page at /search path", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/search"],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId("search-page")).toBeDefined();
  });

  // Las rutas desconocidas deben seguir la redirección configurada hacia el inicio.
  test("should redirect to home page for unknown routes", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/otra-pagina-rara"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("home-page")).toBeDefined();
  });
});
