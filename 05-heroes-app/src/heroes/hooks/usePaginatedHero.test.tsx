import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, test, vi } from "vitest";
import { getHeroApiByPageAction } from "../actions/get-heroes-by-page.action";
import { mockHeroesResponse } from "../mocks/heroes.mock";
import { usePaginatedHero } from "./usePaginatedHero";

// * MOCK DE LA ACCION EN SI
/*************************************************************************/
vi.mock("../actions/get-heroes-by-page.action", () => ({
  getHeroApiByPageAction: vi.fn(),
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroApiByPageAction);
/*************************************************************************/

// * PROVIDER DE TANSTACKQUERY
const tanStackCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

interface UsePaginatedHeroProps {
  page: number;
  limit: number;
  category: string;
}

const args = { page: 1, limit: 6, category: "all" } as UsePaginatedHeroProps; // page, limit, category = "all"

describe("usePaginatedHero", () => {
  // * 1. Probamos el estado inicial del hook
  test("should return the initial state (isLoading)", () => {
    // montamos el hook
    const { result } = renderHook(() => usePaginatedHero(args), {
      wrapper: tanStackCustomProvider(),
    });

    // console.log(result.current);

    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toBeUndefined();
  });

  // * 2. Probamos si devuelve un estado satisfactorio cuando todo va bien
  test("should return success state with data when API call succeeds", async () => {
    // * Dado que hemos implementado un mock de la accion en si, debemos traer un resultado mockead ode dicha accion para la evaluacion (ya definido en mocks)

    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesResponse);

    // 1. montamos el hook
    const { result } = renderHook(() => usePaginatedHero(args), {
      wrapper: tanStackCustomProvider(),
    });

    // 2. Simulamos espera para comprobar los resultados
    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    // console.log(result.current.data); // * deberian ser la respuesta mockeada que importamos si todo ha ido bien

    expect(result.current.status).toBeTruthy(); // esperamos que el proceso hay ido correctamente
    expect(mockGetHeroesByPageAction).toHaveBeenCalled(); // esperamos que el mock de la accion haya sido llamado
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "all"); // esepramos que el mock haya sido llamado con los argumentos especificados
  });
});
