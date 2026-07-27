/**
 * Testing de instancia de AXIOS destinada a la prueba de la configuracion para las peticiones
 */

import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe('giphyApi', () => {
    test('should be configured correctly', () => {
        // comprobemos la configuracion exportada
        const urlToTest = 'https://api.giphy.com/v1/gifs';
        const giphyDefaults = giphyApi.defaults;
        const giphyDefaultsParams = giphyDefaults.params;

        // comprobamos la url
        expect(giphyDefaults.baseURL).toBe(urlToTest);
        // evaluamos el lenguaje
        // expect(giphyDefaultsParams.lang).toBe('es');
        // evaluamos el api key
        // expect(giphyDefaultsParams.api_key).toBe(import.meta.env.VITE_GIPHY_API);

        // ! TOBE ES PARA PRIMITIVOS. DEBEMOS EVALUAR OBJETOS MEDIANTE LA SIGUIENTE INSTRUCCION
        expect(giphyDefaultsParams).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_GIPHY_API
        })
    });
})