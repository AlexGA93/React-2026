import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";

// El slider de Base UI observa cambios de tamaño; jsdom no lo implementa.
if (typeof window.ResizeObserver === "undefined") {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver;
}

// El componente lee y modifica parámetros de búsqueda, así que cada prueba necesita un router.
const renderWithRouter = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>,
  );
};

describe("SearchControls", () => {
  // El snapshot detecta cambios inesperados en la estructura inicial de los controles.
  test("should render SearchControls with default values", () => {
    const { container } = renderWithRouter();

    expect(container).toMatchSnapshot();
  });

  // Comprueba que el nombre de la URL se use para inicializar el input.
  test("should set input value when search param name is set", () => {
    renderWithRouter(["/?name=Batman"]);

    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    );

    expect(input.getAttribute("value")).toBe("Batman");
  });

  // Simula una búsqueda confirmada con Enter y comprueba el valor visible del input.
  test("should change params when input is changed and enter is pressed", () => {
    renderWithRouter(["/?name=Batman"]);
    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    );
    expect(input.getAttribute("value")).toBe("Batman");

    fireEvent.change(input, { target: { value: "Superman" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input.getAttribute("value")).toBe("Superman");
  });

  // El parámetro abre los filtros para que el slider exista; ArrowRight debe aumentar su valor.
  test("should change params strength when slider is changed", () => {
    renderWithRouter(["/?name=Batman&active-accordion=advanced-filters"]);
    const slider = screen.getByRole("slider");
    expect(slider.getAttribute("aria-valuenow")).toBe("0");

    fireEvent.keyDown(slider, { key: "ArrowRight" });

    expect(slider.getAttribute("aria-valuenow")).toBe("1");
  });

  // Un parámetro que identifica el acordeón debe abrir la sección avanzada.
  test("should accordion be open when active-accordion param is set", () => {
    renderWithRouter(["/?name=Batman&active-accordion=advanced-filters"]);

    const accordion = screen.getByTestId("accordion");
    const accordionItem = accordion.querySelector("div");

    expect(accordionItem?.getAttribute("data-state")).toBe("open");
  });

  // Sin el parámetro, los filtros avanzados deben permanecer cerrados.
  test("should accordion be closed when active-accordion param is not set", () => {
    renderWithRouter(["/?name=Batman"]);

    const accordion = screen.getByTestId("accordion");
    const accordionItem = accordion.querySelector("div");

    expect(accordionItem?.getAttribute("data-state")).toBe("closed");
  });
});
