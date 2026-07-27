import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

describe('MyCounterApp', () => {
    test('should render thecomponent', () => {
        render(<MyCounterApp />);
        // screen.debug();

        // localizamos el elemento con el counter. En este caso es un header de nivel 1 (h1)
        const heading = screen.getByRole('heading', { level: 1 });
        // localizamos los botones
        const addButton = screen.getByRole('button', { name: '+1' });
        const subButton = screen.getByRole('button', { name: '-1' });
        const resetButton = screen.getByRole('button', { name: 'Reset' });
        
        expect(heading.innerHTML).toContain('counter: 5');
        expect(addButton).toBeDefined();
        expect(subButton).toBeDefined();
        expect(resetButton).toBeDefined();
    });

    test('should increment the counter', () => {
        render(<MyCounterApp />);
        // screen.debug();
        // localizamos el elemento con el counter. En este caso es un header de nivel 1 (h1)
        const heading = screen.getByRole('heading', { level: 1 });
        // localizamos los botones
        const addButton = screen.getByRole('button', { name: '+1' });

        fireEvent.click(addButton);

        expect(heading.innerHTML).toContain('counter: 6');
    });
    
    test('should decrement the counter', () => {
        render(<MyCounterApp />);
        // screen.debug();
        // localizamos el elemento con el counter. En este caso es un header de nivel 1 (h1)
        const heading = screen.getByRole('heading', { level: 1 });
        // localizamos los botones
        const addButton = screen.getByRole('button', { name: '-1' });

        fireEvent.click(addButton);

        expect(heading.innerHTML).toContain('counter: 4');
    });

    test('should reset the counter', () => {
        render(<MyCounterApp />);
        // screen.debug();
        // localizamos el elemento con el counter. En este caso es un header de nivel 1 (h1)
        const heading = screen.getByRole('heading', { level: 1 });
        // localizamos los botones
        const addButton = screen.getByRole('button', { name: 'Reset' });

        fireEvent.click(addButton);

        expect(heading.innerHTML).toContain('counter: 5');
    });
});