import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";
import HomePage from "./HomePage";

// Se sustituye la consulta para probar qué argumentos construye HomePage sin acceder a datos reales.
vi.mock("@/heroes/hooks/usePaginatedHero");

const mockUsePaginatedHero = vi.mocked(usePaginatedHero);
// Un resultado estable evita que los estados de carga o error afecten las pruebas de parámetros.
mockUsePaginatedHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof usePaginatedHero>);

// HomePage consume React Query, el contexto de favoritos y los parámetros del router.
const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>,
  );
};

describe("HomePage", () => {
  // El snapshot protege la estructura general de la página con valores iniciales.
  test("should render HomePage with default values", () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
  });

  // Sin parámetros explícitos, la consulta debe usar categoría, límite y página predeterminados.
  test("should call usePaginatedHero with default values", () => {
    renderHomePage();
    expect(mockUsePaginatedHero).toHaveBeenCalledWith({
      category: "all",
      limit: 10,
      page: 1,
    });
  });

  // Verifica que los criterios recibidos en la URL se conviertan a los tipos esperados por el hook.
  test("should call usePaginatedHero with custom query params", () => {
    renderHomePage(["/?page=2&limit=10&category=villains"]);
    expect(mockUsePaginatedHero).toHaveBeenCalledWith({
      category: "villains",
      limit: 10,
      page: 2,
    });
  });

  // Al cambiar de pestaña, la página se reinicia pero se conserva el límite de resultados.
  test("should called usePaginatedHero with default page and same limit on tab clicked", () => {
    renderHomePage(["/?tab=favorites&page=2&limit=10"]);

    // Se selecciona la cuarta pestaña (Villains) para comprobar el cambio de categoría.
    const [, , , villainsTab] = screen.getAllByRole("tab");

    fireEvent.click(villainsTab);

    expect(mockUsePaginatedHero).toHaveBeenCalledWith({
      category: "villain",
      limit: 10,
      page: 1,
    });
  });
});
