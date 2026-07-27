/**
 * Custom hook que reune toda la logica que gestiona el estado local de los hooks
 */

import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query";

export const useGifs = () => {
  // Gestion de estado local para la lista de busquedas
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  // estado local que almacena los gifs a mostrar
  const [gifs, setGifs] = useState<Gif[]>([]);

    // almacenamiento de busquedas anteriores
    /**
     * ! PROBLEMA: enter renders el espacio de memoria de un objeto simple se reasigna con lo que se puede perder informacion.
     * 
     * ! hay dos opciones: O lo sacamos del ciclo de vida del componente definiendolo fuera
     * ! o crear un hook 'useRef' manteniendolo en el ciclo de vida de componente
     */
    // const gifsCache: Record<string, Gif[]> = {};
    
    /**
     * *USAREMOS EL HOOK USEREF EL CUAL SE UTILIZA PARA REFERENCIAS MUTABLES QUE NO CAUSAN UAN NUEVA RENDERIZACION
     */
    const gifsCache = useRef<Record<string, Gif[]>>({});

  // funcion que imprime el termino de busqueda cuando el usuario le hace click
  // LA MANDAMOS COMO PROP (COMUNICACION ENTRE COMPONENTES)
  const handleTermClicked = async (term: string) => {
    console.log({ term });

    // primero que nada comprobamos si figura en gifsCche
    if (gifsCache.current[term]) {
      // si existe un registro en cache, asignamos dicho registro almacenado al estado lo cla para mostrar
      setGifs(gifsCache.current[term]);

      // no hacemos nada mas
      return;
    }

    const gifs = await getGifsByQuery(term);

    setGifs(gifs);
  };

  // funcion encargada de recoger el valor de busqueda del input para gestion
  const handleSearch = async (searchTerm: string = "") => {
    // convertir la query en minusculas y eliminar espacios en blanco
    searchTerm = searchTerm.trim().toLowerCase();

    // validar que el query no este vacio
    if (searchTerm.length === 0) return;

    // evitar busquedas duplicadas verificando si el termino ya existe en previousTerms (si , existe no hacer nada)
    if (previousTerms.includes(searchTerm)) return;

    // actualizamos estado
    setPreviousTerms([searchTerm, ...previousTerms].slice(0, 7));

    const gifsResponse = await getGifsByQuery(searchTerm);
    // console.log(gifs)

    setGifs(gifsResponse);

    // registramos entrada en gifsCache
    gifsCache.current[searchTerm] = gifsResponse;
    console.log(gifsCache);
  };

  return {
    // props or values
    previousTerms,
    gifs,
    // methods or actions
    handleTermClicked,
    handleSearch,
  };
};
