import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";

const BASE_URL = import.meta.env.VITE_API_URL;
const mockHero = {
  id: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
  alias: expect.any(String),
  powers: expect.arrayContaining([expect.any(String)]),
  description: expect.any(String),
  strength: expect.any(Number),
  intelligence: expect.any(Number),
  speed: expect.any(Number),
  durability: expect.any(Number),
  team: expect.any(String),
  image: expect.stringMatching(/^http/),
  firstAppearance: expect.any(String),
  status: expect.any(String),
  category: expect.any(String),
  universe: expect.any(String),
};
describe("getHeroAction", () => {
  test("should fetch hero data and return with complete image url", async () => {
    // llamamos a la funcion
    const slug = "clark-kent";
    const result = await getHeroAction(slug); // * Habiendo apuntado al servidor de pruebas la versio nde desarrollo no apunta, pero aqui si que devuelve datos
    // console.log(result);
    const image = result.image;

    expect(image).toContain("http");
    expect(image).toContain(`${BASE_URL}/images/`);
    expect(result).toEqual(expect.objectContaining(mockHero));
  });

  test("should throw an error if hero is not found", async () => {
    // * Queremos detectar un caso de error controlado
    const fakeIdSlug = "batman-2";

    const result = await getHeroAction(fakeIdSlug).catch((error) => {
      // * Queremos que la excepcion n osea null o uidnefined
      expect(error).toBeDefined();
      // * probamos el mensaje de error definido por el servidor
      expect(error.message).toBe("Request failed with status code 404");
    });

    // * Revisamos el result para asegurarnos que NO nos venga nada, dado que estudiamos el error
    // console.log(result); // deberia dar undefined
    expect(result).toBeUndefined();
  });
});
