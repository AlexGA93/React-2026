import { fireEvent, render, screen } from "@testing-library/react";
import { use } from "react";
import { beforeEach, describe, expect, test } from "vitest";
import { mockHeroes } from "../mocks/heroes.mock";
import {
  FavoriteHeroContext,
  FavoriteHeroProvider,
} from "./FavoriteHeroContext";

// * Declaramos un componente de test donde llamaremos a nuestro contexto
const TestComponent = () => {
  const { favorites, favoriteCount, isFavorite, toggleFavorite } =
    use(FavoriteHeroContext);

  return (
    <div>
      <div data-testid="favorite-count">{favoriteCount}</div>
      <div data-testid="favorite-list">
        {favorites.map((fav) => (
          <div key={fav.id} data-testid={`favorite-list-item-${fav.id}`}>
            {fav.name}
          </div>
        ))}
      </div>
      {/* buttons - testing methods*/}
      <button
        data-testid="toggle-favorite"
        onClick={() => toggleFavorite(mockHeroes[0])}
      >
        Toggle favorite
      </button>
      {/* testing isFavorite */}
      <div data-testid="is-favorite">
        {isFavorite(mockHeroes[0]) ? "true" : "false"}
      </div>
    </div>
  );
};

// * Declaramos un componente que devuelva el componente anterior englobado por el provider
const renderContextTest = () =>
  render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>,
  );

describe("FavoriteHeroContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  // * 1. Testeamos si se inicializa con los valores por defecto correctos
  test("should initialize with default values", () => {
    // renderizamos el fucntional component provider
    //render(<FavoriteHeroProvider />);
    // screen.debug(); // unicamente muestra un contenedor. ! esto es debido a que necesitamos inicializar nuestro componente a otro nivel.
    // * llamamos al componente provider el cua lengloiba al test con el context
    renderContextTest();
    // screen.debug();

    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("favorite-list").children.length).toBe(0);
  });

  // * 2. Testeamos las funcionalidades del context mediante las acciones de botones y elementos reactivos en el componente
  test("should add hero to favorites when toggleFavorite is called with new hero", () => {
    // renderizamos el componente
    renderContextTest();
    // tomamos el boton
    const button = screen.getByTestId("toggle-favorite");
    // ejecutamos el evento click
    fireEvent.click(button); // emulacion de click en boto nfavorito
    // apreciamos el contenido
    // screen.debug();

    // pruebas
    // esperamos que el valor de favoritos sea mayor de 0
    expect(screen.getByTestId("favorite-count").textContent).not.toBe("0");
    // dado que el primero seria 'Clark Kent - Test' comprobamos
    expect(screen.getByTestId("favorite-list-item-1").textContent).toBe(
      "Clark Kent - Test",
    );
    // comprobamos el contenido de lcoalstorage
    // console.log(localStorage.getItem("favorites"));
    expect(localStorage.getItem("favorites")).toBe(
      JSON.stringify([mockHeroes[0]]),
    );
  });

  test("should remove hero from favorites when toggleFavorite is called", () => {
    // introducimos un elemento en localstorage
    localStorage.setItem("favorites", JSON.stringify([mockHeroes[0]]));
    //console.log(localStorage.getItem("favorites"));
    // renderizamos el componente
    renderContextTest();
    // screen.debug();

    // pruebas previas al evento click (estado previo)
    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("favorite-list-item-1").textContent).toBe(
      mockHeroes[0].name,
    );

    // tomamos el boton
    const button = screen.getByTestId("toggle-favorite");
    // llamamos evento de click
    fireEvent.click(button);

    // screen.debug();

    // comprobamos nuevo estado
    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("is-favorite").textContent).toBe("false");
    expect(screen.queryByTestId("favorite-list-item-1")).toBeNull();
  });
});
