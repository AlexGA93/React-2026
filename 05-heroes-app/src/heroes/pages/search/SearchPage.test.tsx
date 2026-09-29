import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import type { Hero } from "@/heroes/types/hero.interface";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";

// Se reemplaza la acción de búsqueda para comprobar sus argumentos sin llamar a la API.
vi.mock("@/heroes/actions/search-heroes.action");
const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

// Estos mocks aíslan la lógica de búsqueda del contenido visual de otras secciones.
vi.mock("@/components/custom/CustomJumbotron", () => ({
  CustomJumbotron: () => <div data-testid="custom-jumbotron"></div>,
}));

vi.mock("./ui/SearchControls", () => ({
  SearchControls: () => <div data-testid="search-controls"></div>,
}));

// El mock conserva el nombre de cada héroe para verificar que los resultados se muestran.
vi.mock("@/heroes/components/HeroGrid", () => ({
  HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
    <div data-testid="hero-grid">
      {heroes.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  ),
}));

// La página usa React Query; el proveedor permite renderizarla en el entorno de prueba.
const queryClient = new QueryClient();

// El router aporta los parámetros de URL que SearchPage convierte en criterios de búsqueda.
const renderSearchPage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe("SearchPage", () => {
  // Evita que llamadas de una prueba anterior contaminen las verificaciones siguientes.
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Sin parámetros, la búsqueda debe recibir criterios vacíos y la página conservar su estructura.
  test("should render SearchPage with default values", () => {
    const { container } = renderSearchPage();

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: undefined,
      strength: undefined,
    });

    expect(container).toMatchSnapshot();
  });

  // El nombre de la URL debe llegar a la acción y el render debe seguir siendo válido.
  test("should call search action with name parameter", () => {
    const { container } = renderSearchPage(["/search?name=superman"]);

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: "superman",
      strength: undefined,
    });

    expect(container).toMatchSnapshot();
  });

  // La fuerza se pasa como texto, tal como está representada en los parámetros de URL.
  test("should call search action with strength parameter", () => {
    const { container } = renderSearchPage(["/search?strength=6"]);

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: undefined,
      strength: "6",
    });

    expect(container).toMatchSnapshot();
  });

  // Comprueba que ambos criterios se conserven cuando están presentes al mismo tiempo.
  test("should call search action with strength and name parameters", () => {
    const { container } = renderSearchPage(["/search?strength=8&name=batman"]);

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: "batman",
      strength: "8",
    });

    expect(container).toMatchSnapshot();
  });

  // Una respuesta asíncrona de la acción debe terminar representada en la cuadrícula.
  test("should render HeroGrid with search results", async () => {
    // Los objetos mínimos bastan para esta prueba, que solo necesita id y nombre.
    const mockHeroes = [
      { id: "1", name: "Clark Kent" } as unknown as Hero,
      { id: "2", name: "Bruce Wayne" } as unknown as Hero,
    ];

    mockSearchHeroesAction.mockResolvedValue(mockHeroes);

    renderSearchPage();

    await waitFor(() => {
      expect(screen.getByText("Clark Kent")).toBeDefined();
      expect(screen.getByText("Bruce Wayne")).toBeDefined();
    });
  });
});
