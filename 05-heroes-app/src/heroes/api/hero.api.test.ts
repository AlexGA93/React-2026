import { describe, expect, test } from "vitest";
import { heroApi } from "./hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;

describe("HeroApi", () => {
  test("should be configured pointing to the testing server", () => {
    // vitest ha encontrado env.test para usar sus variables de entorno en lugar de las otras
    // console.log(heroApi.defaults.baseURL);

    // !suponemos que el testing server tiene que tener el puerto 3001
    expect(heroApi).toBeDefined();
    expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
    expect(BASE_URL).toContain(3001);
  });
});
