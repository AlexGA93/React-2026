import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Buena practica es definir un grupo con `describe` otrogandole el nombre del componente a testear, esto ayuda a organizar mejor los test y a entender mejor el contexto de cada test.
describe('App component', () => {
    // primera prueba: deberia hacer render del componente carrito de compras
    test('should render shopping cart component', () => {
        
        // renderizamos el componente App, esto nos devuelve un objeto con varias propiedades, entre ellas `container` que es el elemento raiz del componente renderizado, es decir, el elemento que contiene todo el contenido del componente App.
        const { container } = render(<App />);

        // mostramos el innerHTML del container para verificar que el componente se renderizo correctamente, esto es solo para fines de depuracion, en un test real se deberia usar expect para verificar que el contenido del container es el esperado.
        // console.log(container.innerHTML);

    });

    test('should render shopping cart component', () => {
        
        render(<App />); // renderizamos el componente a testear, esto nos permite interactuar con el DOM generado por el componente
        // screen.debug(); // esto nos muestra el DOM generado por el componente, es util para entender mejor la estructura del DOM y para debuggear los test

    });

    // Test para verificar elementos en el componente renderizado:
    test('should render shopping cart component with correct items', () => {
        const { container } = render(<App />); // renderizamos el componente a testear
        // screen.debug(); // mostramos el DOM generado por el componente para entender mejor la estructura del DOM y para debuggear los test
        // seleccionamos uno de los elementos del HTML como el h1
        const h1 = container.querySelector('h1');
        // console.log(h1?.innerHTML);// comprobamos el titulo

        // verificamos con 'expect'
        expect(h1?.innerHTML).toBe('Carrito de Compras');
        // opcion alternativa: 'toContain' que verifica que el contenido del h1 contenga la cadena 'Carrito de Compras', esto es util cuando el contenido del h1 puede variar pero siempre contiene una parte fija.
        expect(h1?.innerHTML).toContain('Carrito de Compras');

    });

    // testing el screen
    test('should render shopping cart component with correct items - screen', () => {
        render(<App />); // renderizamos el componente a testear
        // screen.debug(); // mostramos el DOM generado por el componente para entender mejor la estructura del DOM y para debuggear los test
        
        // Queremos localizar los elementos con un rol de 'heading'
        const h1 = screen.getByRole('heading', { level: 1 });
        // tambien podemos buscarlo por los tests ids
        const h1TestId = screen.getByTestId("app-title");
        console.log(h1TestId.innerHTML);

        const firstItemCounterName = screen.getByTestId('item-counter-0-name');
        console.log(firstItemCounterName.innerHTML);

    });
});

