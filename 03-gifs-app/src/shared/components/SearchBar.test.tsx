import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("SearchBar", () => {
  test("should render search bar correctly", () => {
    // traemos el componente
    const { container } = render(<SearchBar onQuery={() => {}} />);

    expect(container).toMatchSnapshot();
  });

  test("should call onQuery with the correct value after 700ms", async () => {
    // simulamos la funcion que se usara en el componente como prop
    const onQuery = vi.fn();
    // renderizamos el componente
    render(<SearchBar onQuery={onQuery} />);

    // ocupamos tomar el input. En este caso al ser un solo textobox podemos cogerlo por ahi
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    // screen.debug();

    // mediante esta funcion podemos esperara hasta qye sea llamado y asi los 700ms pueden darse sin que se rompa o se de error por llamarse demasiado pronto

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith("test");
    });
  });

  /**
   * Pruebas sobre la funcion clearTimeout del effect
   * Queremos comprobar que la funcion onQuery no se llame mas veces hasta que acabe de escribir el usuario
   *
   */
  test("should call only once with the last value (debounce)", async () => {

    // simulamos la funcion que se usara en el componente como prop
    const onQuery = vi.fn();
    // renderizamos el componente
    render(<SearchBar onQuery={onQuery} />);

    // ocupamos tomar el input. En este caso al ser un solo textobox podemos cogerlo por ahi
    const input = screen.getByRole("textbox");
    // * Probamos varias modificaciones
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    // mediante esta funcion podemos esperara hasta que sea llamado y asi los 700ms pueden darse sin que se rompa o se de error por llamarse demasiado pronto
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1); // comprobamos que solo se ha llamado una sola vez
      expect(onQuery).toHaveBeenCalledWith("test");// probaremos que se ha llamado con el argumento
    });

    /**
     * La prueba dara positivo debido a que se ha realizado uan simulacion de escritura en el elemento html y al final se ha llamado una unica vez con el valro final el cual corresponde con el valor comprobaro. Todo esto debido al debounce
     */
  });

  // prueba para comprobar si el boton hace click y si manda el valor
  test('should call onQuery when button clicked qith the input value', () => {
    const textValue = 'test';

    // simulamos la funcion que se usara en el componente como prop
    const onQuery = vi.fn();
    // renderizamos el componente
    render(<SearchBar onQuery={onQuery} />);

    // ocupamos tomar el input. En este caso al ser un solo textobox podemos cogerlo por ahi
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: textValue } });

    // referencia a boton
    const button = screen.getByRole('button');
    fireEvent.click(button);

    //comprobamos que el boton ha sido llamado una sola vez (clickado)
    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith(textValue);
  });

  
});
