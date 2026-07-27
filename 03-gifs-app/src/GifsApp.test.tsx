import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { GifsApp } from './GifsApp';

describe('GifsApp', () => {
    // test de comprobacion de render
    test('should render component properly', () => {
        const { container } = render(<GifsApp />);

        expect(container).toMatchSnapshot();

        expect(screen.getByText(/Buscador de Gifs/i)).toBeDefined();

        expect(screen.getByPlaceholderText(/Buscar Gifs/i)).toBeDefined();
    });
});