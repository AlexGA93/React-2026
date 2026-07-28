import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

interface HookValue {
    current: {
        counter: number;
        handleAdd: () => void;
        handleSubstract: () => void;
        handleReset: () => void;
    };
}
describe('uceCounter', () => {
    
    /**
     * Teiendo en cuenta que si declaramos en cada test se destruye al terminar este, para  poder usar de forma global esta declaracion debemos 
     */
    const randomValue = 20;
    let result: HookValue;

    beforeEach(() => {
        const { result: hookvalue } = renderHook(() => useCounter(randomValue));
        
        result = hookvalue;
    });


    test('should initialize width default value', () => {
        /**
         * Para llamar a un custo mhook debemos estar dentro de un componente o de un hook.
         * Para probar un hook usamos la funcion de testing-library 'renderHook'
         */

        const { result } = renderHook(() => useCounter());
        
        console.log(result);

        expect(result.current.counter).toBe(5);
    });

    test('should initialize width custom value', () => {
        
        console.log(result);

        expect(result.current.counter).toBe(randomValue);
    });

    // evaluamos las funciones
    test('should increment counter when handleAdd is called', () => {
    
        // llamamos a la funcion deseada mediante una funcion de actuacion o 'act'
        act(() => {
            result.current.handleAdd();
        })

        console.log(result.current.counter);
        // comprobamos que el contador ha sido modificado por la funcion
        expect(result.current.counter).toBe(randomValue+1);
    });

    test('should substract counter when handleSubstract is called', () => {

        // llamamos a la funcion deseada mediante una funcion de actuacion o 'act'
        act(() => {
            result.current.handleSubstract();
        })

        console.log(result.current.counter);
        // comprobamos que el contador ha sido modificado por la funcion
        expect(result.current.counter).toBe(randomValue-1);
    });

    test('should reset counter when handleReset is called', () => {

        // llamamos a la funcion deseada mediante una funcion de actuacion o 'act'
        act(() => {
            result.current.handleReset();
        })

        console.log(result.current.counter);
        // comprobamos que el contador ha sido modificado por la funcion
        expect(result.current.counter).toBe(randomValue);
    });

});