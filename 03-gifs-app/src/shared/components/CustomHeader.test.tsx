import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";

describe('CustomHeader', () => {
    // declaramos un titulo de prueba
    const title = 'Test title';
    // declaramos una descripcion de prueba
    const description = 'Test Description';

    test('should render the title correctly', () => {    
        // renderizamos el componente
        render(<CustomHeader title={title} />);

        // buscamos que el texto estesituado en un header de nivel 1 (h1)
        const header = screen.getByRole('heading', { level: 1, name: title });

        expect(header).not.toBeNull();

        // buscamos el titulo buscando el texto
        expect(screen.getByText(title)).toBeDefined();
    });
    
    test('should render the description when provided', () => {
        // renderizamos el componente
        render(<CustomHeader title={title} description={ description } />);
        // screen.debug();

        // buscamos el titulo buscando el texto
        expect(screen.getByText(description)).toBeDefined();

        // buscamos que la descripcion este definida como paragrafo
        const paragraph = screen.getByRole('paragraph');
        // console.log(paragraph);

        expect(paragraph).toBeDefined();
        // console.log(paragraph.textContent);
        
        expect(paragraph.innerHTML).toBe(description);
    });
    
    test('should not render description when not provided', () => {
        /**
         * Dado que en el componente cabe la posibilidad de que desc exista o no
         */
        const { container } = render(<CustomHeader title={title} />);
        
        // localizamos el contendor con la clase
        const divElement = container.querySelector('.content-center');
        
        const h1 = divElement?.querySelector('h1');
        expect(h1?.innerHTML).toBe(title);

        const p = divElement?.querySelector('p');
        expect(p).toBeNull();
    });
});