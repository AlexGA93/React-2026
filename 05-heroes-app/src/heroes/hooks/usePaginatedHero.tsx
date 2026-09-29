import { useQuery } from "@tanstack/react-query";
import { getHeroApiByPageAction } from "../actions/get-heroes-by-page.action";

interface Props {
  page: number;
  limit: number;
  category: string;
}

export const usePaginatedHero = ({ page, limit, category = "all" }: Props) => {
  /**
   * useQuery se encarga de manejar el estado de la petición de forma reactiva:
   * - carga inicial
   * - revalidación cuando cambia la key
   * - caché
   * - loading/error/success
   * - re-fetch automático según la configuración
   *
   * En este caso buscamos los héroes paginados usando la página y el límite que vienen de la URL.
   */
  return useQuery({
    // queryKey identifica esta consulta dentro del caché de react-query.
    // Si cambia la página o el límite, TanStack sabe que debe volver a consultar los datos.
    /**
     * Desglose de esta key:
     * - "heroes": nombre general de la query, identifica el recurso.
     * - "page": indica que la consulta está paginada.
     * - page: número de la página actual obtenida desde la URL.
     * - "limit": indica cuántos elementos se quieren por página.
     * - limit: valor actual del límite obtenido desde la URL.
     *
     * Esto significa: "trae los héroes de la página X con un límite de Y".
     * Como la key incluye ambos valores, React Query diferencia entre:
     * ["heroes", "page", "1", "limit", "6"]
     * y ["heroes", "page", "2", "limit", "6"]
     * y también entre distintos límites para la misma página.
     * ! ESto haria un queryKey con esa estructura exacta, pero imaginemos que cambiamos el orden o los datos. Entonces cuando los argumentos no son posicionales, es consejable crear un objeto
     */
    // queryKey: ["heroes", "page", page, "limit", limit], // VERSION FIJA
    queryKey: ["heroes", { page, limit, category }], // * VERSION MAS DINAMICA

    // queryFn ejecuta la petición HTTP y devuelve los resultados de la API.
    // Aquí convertimos page y limit a números para pasarlos a la acción del backend.
    queryFn: () => getHeroApiByPageAction(page, limit, category),

    // staleTime indica cuánto tiempo los datos se consideran "frescos".
    // Mientras dure ese intervalo, react-query puede devolver el caché sin hacer otra petición.
    // Después de 5 minutos, la query se vuelve stale y se puede revalidar.
    staleTime: 1000 * 60 * 5,
  });
};
