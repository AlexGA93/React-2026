import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act } from "react";
import * as gifActions from "../actions/get-gifs-by-query";

describe("useGifs", () => {
  // definiciones globales

  test("should return default values and methods", () => {
    /**
     * Para llamar a un custom hook debemos estar dentro de un componente o hook.
     * Usaremos 'renderHook' para llamarlo
     */
    const { result } = renderHook(() => useGifs());
    // console.log(result);

    expect(result.current.previousTerms.length).toBeGreaterThanOrEqual(0);
    expect(result.current.gifs.length).toBeGreaterThanOrEqual(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());

    // llamamos al handleSearch
    await act(async () => {
      await result.current.handleSearch("goku");
    });

    // console.log(result.current.gifs);

    // esperamos que con esta llamada se hayan actualizado los gifs
    expect(result.current.gifs.length).toBeGreaterThanOrEqual(0);
  });

  test("should return a list of gifs when handleTermClicked is called", async () => {
    const { result } = renderHook(() => useGifs());

    // llamamos al handleSearch
    await act(async () => {
      await result.current.handleTermClicked("goku");
    });

    // console.log(result.current.previousTerms);

    // esperamos que con esta llamada se hayan actualizado los gifs
    expect(result.current.previousTerms.length).toBeGreaterThanOrEqual(0);
  });

  // testearemos el cache
  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());

    // llamamos al handleSearch
    await act(async () => {
      await result.current.handleTermClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10);

    // Vamos a tratar con la cache
    // 1. espiaremos el contenido de get-gifs-by-query
    vi.spyOn(gifActions, "getGifsByQuery")
      // lanzamos una excepcion
      .mockRejectedValue(new Error("Custom Error"));

    await act(async () => {
      await result.current.handleTermClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10);
  });
    
    test('should return no more than 8 previous terms', async () => {
        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifActions, 'getGifsByQuery')
            // simulamos un resultado aportando el supuesto resultado
            .mockResolvedValue([]);
        
        await act(async () => {
            await result.current.handleSearch('goku1');
            await result.current.handleSearch('goku2');
            await result.current.handleSearch('goku2');
            await result.current.handleSearch('goku3');
        });

        console.log(result.current.previousTerms)
    })
});
