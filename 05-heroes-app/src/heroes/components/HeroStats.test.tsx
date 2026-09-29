import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { FavoriteHeroProvider } from "../context/FavoriteHeroContext";
import { useHeroSummary } from "../hooks/useHeroSummary";
import { mockHeroes, mockHeroSummary } from "../mocks/heroes.mock";
import type { SummaryResponse } from "../types/get-summary.response";
import { HeroStats } from "./HeroStats";

vi.mock("../hooks/useHeroSummary");
const mockUseHeroSummary = vi.mocked(useHeroSummary);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderHeroStats = (mockData?: Partial<SummaryResponse>) => {
  if (mockData) {
    mockUseHeroSummary.mockReturnValue({
      data: mockData,
    } as unknown as ReturnType<typeof useHeroSummary>);
  } else {
    mockUseHeroSummary.mockReturnValue({
      data: undefined,
    } as unknown as ReturnType<typeof useHeroSummary>);
  }

  return render(
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <HeroStats />
      </FavoriteHeroProvider>
    </QueryClientProvider>,
  );
};

describe("HeroStats", () => {
  test("should render component with default values", () => {
    // renderizamos el componente
    renderHeroStats();

    // screen.debug();

    expect(screen.getByText("Cargando...")).toBeDefined();
  });

  test("should render HeroStats with mock information", () => {
    const { container } = renderHeroStats(mockHeroSummary);

    // screen.debug();

    expect(container).toMatchSnapshot();
    expect(screen.getByText("Total Characters")).toBeDefined();
    expect(screen.getByText("Favorites")).toBeDefined();
    expect(screen.getByText("Strongest")).toBeDefined();
  });

  test("should change the percentag of favorites when a hero is added to favorites", () => {
    // establecemos contenido para el localstorage
    localStorage.setItem("favorites", JSON.stringify([mockHeroes[0]]));

    // aplicamos el render con el contesto
    renderHeroStats(mockHeroSummary);

    // visualizamos
    screen.debug();

    const favPercentageElement = screen.getByTestId("favorite-percentage");
    expect(favPercentageElement.innerHTML).toContain("4");

    const favCountElement = screen.getByTestId("favorite-count");
    expect(favCountElement.innerHTML).toContain("1");
  });
});
