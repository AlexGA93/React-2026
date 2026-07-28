import type { GiphyResponse } from "../interfaces/giphy.response";
import type { Gif } from "../interfaces/gif.interface";
import { giphyApi } from "../api/giphy.api";

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  try {
    /**
     * Dado que para este caso la API funciona igualmente con un 200 si no enviamos el paramtro q, vamos a salri si no le enviamos este parametro para NO hacer la peticion
     */
    if (query.trim().length === 0) {
      return []; // devolvemos un array vacio dado que la api lo hace tambien. Asi nos ahorramos procesos
    }

    const response = await giphyApi<GiphyResponse>("/search", {
      params: {
        q: query,
        limit: 10,
      },
    });

    // transformamos la data que sea segun nuestro modelo de inetrfaz de Gif
    return response.data.data.map((gif) => ({
      id: gif.id,
      title: gif.title,
      url: gif.images.original.url,
      width: Number(gif.images.original.width),
      height: Number(gif.images.original.height),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
