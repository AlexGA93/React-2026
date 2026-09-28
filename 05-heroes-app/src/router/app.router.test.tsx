import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";
import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";

// layout
vi.mock("@/heroes/layout/HeroesLayout", () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      <Outlet />
    </div>
  ),
}));
// componente de HomePage
vi.mock("@/heroes/pages/home/HomePage", () => ({
  HomePage: () => <div data-testid="home-page"></div>,
}));
//hero page
vi.mock("@/heroes/pages/hero/HeroPage", () => ({
  default: () => {
    const { slug = "" } = useParams();

    return <div data-testid="hero-page">HeroPage - {slug}</div>;
  },
}));
// searchpage
vi.mock("@/heroes/pages/search/SearchPage", () => ({
  default: () => <div data-testid="search-page"></div>,
}));

describe("appRouter", () => {
  test("should be configured as expected", () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  test("should render home page at root path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("home-page")).toBeDefined();
  });

  test("should render hero page at /hero/:slug path", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/hero/superman"],
    });

    render(<RouterProvider router={router} />);

    const heroPage = await screen.findByTestId("hero-page");
    // screen.debug();
    expect(heroPage.textContent).toContain("superman");
  });
  test("should render search page at /search path", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/search"],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId("search-page")).toBeDefined();
  });

  test("should redirect to home page for unknown routes", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/otra-pagina-rara"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("home-page")).toBeDefined();
  });
});
