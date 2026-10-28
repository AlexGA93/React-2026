import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { getProductsAction } from "../actions/get-products.actions";

export const useProducts = () => {
  // extraemos de la url el genero (si lo hubiera)
  const { gender } = useParams();
  const [searchParams] = useSearchParams();

  // `query` indica si se ha esrito en el buscador del header alguna cosa
  const query = searchParams.get("query") || undefined;

  // `limit` indica cuántos productos solicitar por página; usamos 9 si no viene en la URL.
  const limit = searchParams.get("limit") || 9;

  // `page` indica qué página solicitar; empezamos en la página 1 si no viene en la URL.
  const page = searchParams.get("page") || 1;

  // `sizes` indica las tallas de los productos
  const sizes = searchParams.get("sizes") || "";
  // La API recibe `offset`: cuántos productos debe omitir antes de devolver resultados.
  // Ejemplo con limit=9: página 1 -> offset 0, página 2 -> offset 9, página 3 -> offset 18.
  const offset = (Number(page) - 1) * Number(limit);

  // `price` indica los precios a especificar tras conversion. Por defecto, el valor esany
  const price = searchParams.get("priceRange") || "any";
  // diferenciamos a traves del identificador precio minimo y maximo
  let minPrice = undefined;
  let maxPrice = undefined;

  switch (price) {
    case "0-50":
      minPrice = 0;
      maxPrice = 50;
      break;
    case "50-100":
      minPrice = 50;
      maxPrice = 100;
      break;
    case "100-200":
      minPrice = 100;
      maxPrice = 200;
      break;
    case "200+":
      minPrice = 200;
      maxPrice = undefined;
      break;
  }

  return useQuery({
    // Cada combinación de offset y límite tiene su propia entrada en caché.
    // Así, al cambiar de página o de límite, React Query solicita los datos correspondientes.
    queryKey: [
      "products",
      { offset, limit, gender, sizes, minPrice, maxPrice, query },
    ],
    queryFn: () =>
      getProductsAction({
        // Los parámetros de URL son strings; usamos 9 si `limit` no es numérico.
        limit: isNaN(+limit) ? 9 : limit,
        // Si el cálculo del offset no es válido, solicitamos desde el inicio.
        offset: isNaN(offset) ? 0 : offset,
        // indicamos los generos
        gender,
        // indicamos tallas (pro defecto nada)
        sizes,
        // precios
        minPrice,
        maxPrice,
        query,
      }),
    // Los datos se consideran recientes durante cinco minutos antes de volver a validarlos.
    staleTime: 1000 * 60 * 5,
  });
};
