/**
 * PRUEBAS SOBRE ACCION
 * 
 */

import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query";


import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from "../api/giphy.api";
import { gipyResponseMock } from "../../tests/mock/giphy.response.data";

describe('getGifsByQuery', () => {
    // llamamos una instancia mock de giphyApi mediante el nuevo paquete
    let mock = new AxiosMockAdapter(giphyApi);
    const queryName = 'Goku';
    
    // * llamamos al ciclo de vida para que se resetee en cada ueva iteracion
    beforeEach(() => {
        mock = new AxiosMockAdapter(giphyApi);
    });

    // primero queremos probar que nos devuelva la lista de gifs como respuesta (response)
    // test('should return a list of gifs', async () => {
    //     // definimos el nombre de la query
    //     const queryName = 'Goku';
    //     // llamamos a la peticion asincrona con la query
    //     const gifs = await getGifsByQuery(queryName);

    //     // comprobamos el resultado
    //     console.log(gifs[0]);

    //     // vamos a evaluar el contenido de uno de los gifs de forma que veamos si cada parametro espera un tipo concreto de datos (sin importar lo que mande realmente)
    //     expect(gifs[0]).toStrictEqual({
    //         id: expect.any(String), // el campo debe ser un string
    //         title: expect.any(String), // el campo debe ser un string
    //         url: expect.any(String), // el campo debe ser un string
    //         width: expect.any(Number), // el campo debe ser un number
    //         height: expect.any(Number), // el campo debe ser un number
    //     });
    // });
/**
 * ! Vamos a crear un test con la misma finalidad pero usando una libreria adicional especializada para peticiones
 * 
 * * https://www.npmjs.com/package/axios-mock-adapter
 */
    test('should return a list of gifs', async () => {
        // queremos testear una peticion GET
        // console.log(mock.onGet('/search'));
        mock.onGet('/search')
            // queremos solapar la respuesta
            .reply(
                200, // el status (statusOrCallback)
                gipyResponseMock // la data que nos llega como respuesta mockeada
        )
        
        // llamamos a la peticion asincrona con la query
        const gifs = await getGifsByQuery(queryName);
        
        // console.log(gifs);
        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');
        })
    });

    test('should return an empty list of gifs if query is empty', async () => {
        // restauramos la estancia del mock
        mock.restore();

        // llamamos a la peticion asincrona con la query
        const gifs = await getGifsByQuery('');
        
        expect(gifs.length).toBe(0);
    });

    // que ocurre si el endpoint revuelve un error
    test('should handle error when the API returns an error', async () => {
        /**
         * Vamos a usar un 'espia' para sobreescribir el console error del catch en getGifsByQuery
         */
        const consoleErrorSpy = vi.spyOn(console, 'error').
            /**
             * Dado que en este caso es una funcion (error()) del objeto (console), debemos implementar un mock de una funcion ( puede no hacer nada)
             */
            mockImplementation(() => {});

        // provocamos un error para una respuesta de codigo 400 (Bad Request)
        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request',
            }
        });
        
        const gifs = await getGifsByQuery(queryName);
        // console.log(gifs);

        // comprobamos si no hay gifs (devolveria array vacio)
        expect(gifs.length).toBe(0);
        // comprobamos que el espia (y por tanto el catch) sea llamado
        expect(consoleErrorSpy).toHaveBeenCalled();
        // comprobamos que el espia (y por tanto el catch) sea llamado n veces
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        // comporbamos que sea llamado con unos argumentos (en este caso ponemos algo generico como  'lo que sea', pero podemos implementar modelos mockeados de respuestas de error)
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
    })
})