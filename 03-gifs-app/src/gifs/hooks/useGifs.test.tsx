import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useGifs } from "./useGifs";
import { act } from "react";

describe('useGifs', () => {
    // definiciones globales
    
    test('should return default values and methods', () => {
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

    test('should return a list of gifs', async () => {

        const { result } = renderHook(() => useGifs());

        // llamamos al handleSearch 
        await act(async () => {
            await result.current.handleSearch('goku');
        });
        
        // console.log(result.current.gifs);

        // esperamos que con esta llamada se hayan actualizado los gifs
        expect(result.current.gifs.length).toBeGreaterThanOrEqual(0);
    });

    test('should return a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());

        // llamamos al handleSearch 
        await act(async () => {
            await result.current.handleTermClicked('goku');
        });
        
        // console.log(result.current.previousTerms);

        // esperamos que con esta llamada se hayan actualizado los gifs
        expect(result.current.previousTerms.length).toBeGreaterThanOrEqual(0);
    });
})