import AxiosMockAdapter from "axios-mock-adapter";
import { beforeEach, describe, expect, test } from "vitest";
import { heroApi } from "../api/hero.api";
import { mockHeroesResponse } from "../mocks/heroes.mock";
import { getHeroApiByPageAction } from "./get-heroes-by-page.action";

describe("getHeroApiByPageAction", () => {
  /**
   * *MOCK DE AXIOS USANDO 'axios-mock-adapter'
   */

  const heroesApiMock = new AxiosMockAdapter(heroApi);

  // * LIMPIEZA
  beforeEach(() => {
    heroesApiMock.reset();
    heroesApiMock.resetHistory();
  });

  // tests
  test("should return default heroes", async () => {
    heroesApiMock.onGet("/").reply(
      // definimos que la respuesta deb tener status code 200
      200,
      // y la respuesta debe ser la especificada (en este caso, un mock de heroes)
      mockHeroesResponse,
    );

    // llamamos a la peticion mediante la instancia de axios mockeada cuya respuesta debe ser la especificada arriba
    const response = await getHeroApiByPageAction(
      // page: 1
      1,
    );
    // console.log(response.heroes[0].image);

    expect(response).toStrictEqual(mockHeroesResponse);
  });

  test("should return the correct heroes when page is not a number", async () => {
    heroesApiMock.onGet("/").reply(
      // definimos que la respuesta deb tener status code 200
      200,
      // y la respuesta debe ser la especificada (en este caso, un mock de heroes)
      mockHeroesResponse,
    );

    await getHeroApiByPageAction("abc" as unknown as number);

    // * VAMOS A COMPROBAR EL HISTORIAL DE LA PETICION
    const requestParams = heroesApiMock.history.get[0].params;

    // * En el codigo tenemos definido que cuando no sea un numero se establece que el valor de la pagina es 1
    expect(requestParams).toStrictEqual({
      limit: 6,
      offset: 0,
      category: "all",
    });
  });
  test("should call the API with correct params", async () => {
    heroesApiMock.onGet("/").reply(
      // definimos que la respuesta deb tener status code 200
      200,
      // y la respuesta debe ser la especificada (en este caso, un mock de heroes)
      mockHeroesResponse,
    );

    await getHeroApiByPageAction(2, 10, "heroes");

    // * VAMOS A COMPROBAR EL HISTORIAL DE LA PETICION
    const requestParams = heroesApiMock.history.get[0].params;

    expect(requestParams).toStrictEqual({
      limit: 10,
      offset: 10,
      category: "heroes",
    });
  });
});
