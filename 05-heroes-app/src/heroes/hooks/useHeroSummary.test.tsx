import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, test, vi } from "vitest";
import { getSummaryAction } from "../actions/get-summary.action";
import { mockHeroSummary } from "../mocks/heroes.mock";
import { useHeroSummary } from "./useHeroSummary";

// Mockeamos la acción que consume el hook para controlar la respuesta de la API
// y evitar llamadas reales durante el test.
vi.mock("../actions/get-summary.action", () => ({
  getSummaryAction: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummaryAction);

// Este provider crea un QueryClient de React Query configurado para tests.
// Con retry: false evitamos reintentos automáticos en pruebas rápidas.
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

describe("useHeroSummary", () => {
  // Primera prueba: comprobamos el estado inicial del hook.
  // renderHook ejecuta el custom hook dentro de un entorno de prueba.
  test("should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    console.log(result.current);

    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toBeUndefined();
  });

  // Segunda prueba: mockeamos la respuesta exitosa de la API y comprobamos
  // que el hook termina en estado success con los datos esperados.
  test("should return success state with data when API call succeeds", async () => {
    // Simulamos la promesa de la acción para que el hook reciba datos de prueba.
    mockGetSummaryAction.mockResolvedValue(mockHeroSummary);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    // waitFor espera a que la UI/hook llegue al estado que queremos comprobar.
    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
      console.log(result.current);
    });

    // Verificamos que el hook ya no está cargando, no ha fallado y devuelve
    // exactamente el mock que le hemos dado.
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toStrictEqual(mockHeroSummary);
  });
});
