import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

// * funciones elevadas para que no sean anonimas y acceder desde otros tests
const handleAddMock = vi.fn();
const handleSubstractMock = vi.fn();
const handleResetMock = vi.fn();

/**
 * 
 * * TESTING DEL CUSTOM HOOK
 * 
 */

// * IMPORTAMOS EL CUSTOM HOOK PERO MEDIANTE VI DE VITEST
// import { useCounter } from "./hooks/useCounter";
// * Dado que el hook devuelve los metodos para ser desestructurados, debemos ponerle en el callback el objeto pertinente con datos para la prueba
vi.mock('./hooks/useCounter', () => ({
    useCounter: () => ({
        counter: 69, // valor inicial
        // metodos simulados como funcion mediante vitest
        handleAdd: handleAddMock,
        handleSubstract: handleSubstractMock,
        handleReset: handleResetMock,

    })
}));

describe('MyCounterApp', () => {

    test('should render the component', () => {
        render(<MyCounterApp />);
    
        // probamos el screen debug
        // screen.debug();

        // localizamos el elemento con el counter. En este caso es un header de nivel 1 (h1)
        const heading = screen.getByRole('heading', { level: 1 });
        // localizamos los botones
        const addButton = screen.getByRole('button', { name: '+1' });
        const subButton = screen.getByRole('button', { name: '-1' });
        const resetButton = screen.getByRole('button', { name: 'Reset' });
        
        expect(heading.innerHTML).toContain('counter: 69');
        expect(addButton).toBeDefined();
        expect(subButton).toBeDefined();
        expect(resetButton).toBeDefined();
    });

    // * testeamos los botones
    test('should call handleAdd if button is clicked', () => {
        render(<MyCounterApp />);
        
        // localizamos el boton de handleAdd
        const addButton = screen.getByRole('button', { name: '+1' });
        // simulamos el evento click con fireevent
        fireEvent.click(addButton);

        // probamos a ver que esperamos que pase (que handleAdd sea llamado)
        expect(handleAddMock).toHaveBeenCalled();
        // esperamos que solo se haya llamado una vez (o un numero de veces)
        expect(handleAddMock).toHaveBeenCalledTimes(1);

        
        // ! esperariamos que el resto de funciones NO hayan sido llamadas
        expect(handleSubstractMock).not.toHaveBeenCalled();
        expect(handleResetMock).not.toHaveBeenCalled();
        

    });

});