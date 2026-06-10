import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ItemCounter from "./ItemCounter";
import styles from './ItemCounter.module.css';

describe('ItemCounter', () => {
    // primera prueba: valores por defecto
    test('should render with default values', async () => {
        const name = "Test Item";
        // dibujamos el componente dandole unos props para este test
        const { getByText } = render(
            <ItemCounter
                name={ name }
                quantity={1}
            />
        );

        // comprobamos que el texto del prop name este definido
        expect(getByText(name)).toBeDefined();
        // comprobamos que el valor del texto no sea null
        expect(getByText(name)).not.toBeNull();
    });

    // evaluamos las cantidades
    test('should render with default values', async () => {
        const name = "Test Item";
        const qty = 10;
        // dibujamos el componente dandole unos props para este test
        const { getByText } = render(
            <ItemCounter
                name={ name }
                quantity={qty}
            />
        );

        expect(getByText(qty)).toBeDefined();
    });

    // tests de botones de contador: incremento
    test('should increase count when +1 button is pressed', () => {
        // renderizamos el componente
        render(<ItemCounter name={'Test'} quantity={1} />);
        // screen.debug();

        const incrementButton = screen.getByTestId("item-counter-increment");
        const valueElement = screen.getByTestId("item-counter-value");

        expect(valueElement.textContent).toBe("1");

        fireEvent.click(incrementButton);

        expect(valueElement.textContent).toBe("2");
    });

    // tests de botones de contador: decremento
    test('should decrease count when -1 button is pressed', () => {
        // renderizamos el componente
        render(<ItemCounter name={'Test'} quantity={1} />);
        // screen.debug();

        const incrementButton = screen.getByTestId("item-counter-decrement");
        const valueElement = screen.getByTestId("item-counter-value");

        expect(valueElement.textContent).toBe("1");

        fireEvent.click(incrementButton);

        expect(valueElement.textContent).toBe("0");
    })

    // pruebas orientadas a los estilos
    // test('should change to red when count is smaller than or equal to 2', () => {
    //     // definimos los props para el componente
    //     const qty = 2; // En el componente se ha definido como valor minimo para cambio de estilo
    //     const name = "Test Item";

    //     // renderizamos el componente
    //     render(<ItemCounter name={name} quantity={qty} />);

    //     // extraemos el texto afectado el estilo: el contador
    //     const itemCounterText = screen.getByText(qty);
    //      console.log(itemCounterText.style);
    //     // evaluamos
    //     expect(itemCounterText.style.color).toBe('red');
    // });
    
    test('should change to red when count is smaller than or equal to 2', () => {
        // definimos los props para el componente
        const qty = 2; // En el componente se ha definido como valor minimo para cambio de estilo
        const name = "Test Item";

        // renderizamos el componente
        render(<ItemCounter name={name} quantity={qty} />);

        // extraemos el texto afectado el estilo: el contador
        const itemCounterText = screen.getByText(qty);
        console.log(itemCounterText.classList.value); // _underMin_8b32a2, hace referencia a la clase del componente
        console.log(itemCounterText.classList.contains(styles.underMin)); // true -> Vemos que contiene nuestra clase pese a estar cifrada
        
        // evaluamos si tiene la clase apropiada asociada a los estilos
        // Para esto le pasamos a la funcion aquella coincidencia de clase que aparezca en la lista de clases perteneciente a la variable representada por el elemento con el texto
        
        expect(itemCounterText.classList.contains(styles.underMin)).toBe(true);
    });

    test('should change to gren when count is greater or equal to 3', () => {
        // definimos los props para el componente
        const qty = 3; // En el componente se ha definido como valor minimo para cambio de estilo
        const name = "Test Item";

        // renderizamos el componente
        render(<ItemCounter name={name} quantity={qty} />);

        // extraemos el texto afectado el estilo: el contador
        const itemCounterText = screen.getByText(qty);
        console.log(itemCounterText.classList.value); // _underMin_8b32a2, hace referencia a la clase del componente
        console.log(itemCounterText.classList.contains(styles.overMin)); // true -> Vemos que contiene nuestra clase pese a estar cifrada
        
        // evaluamos si tiene la clase apropiada asociada a los estilos
        // Para esto le pasamos a la funcion aquella coincidencia de clase que aparezca en la lista de clases perteneciente a la variable representada por el elemento con el texto
        
        expect(itemCounterText.classList.contains(styles.overMin)).toBe(true);
    });
});