// importamos la configuracion de axios para hacer peticiones
import { tesloApi } from "@/api/teslo-api";
import type { ProductResponse } from "@/interfaces/products.response";

interface Options {
  limit?: number | string;
  offset?: number | string;
  gender?: string;
  sizes?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string | null;
}

// definimos la funcion exportada donde haremos la peticion y obtendremos los datos
export const getProductsAction = async (options: Options) => {
  // extraemos las posibles opciones para la query
  const { limit, offset, gender, sizes, minPrice, maxPrice, query } = options;
  // extraemos los datos desestructurando la data de la peticion
  // llamamos a la ruta hija: import.meta.env.VITE_API_URL/products
  // http://localhost:3000/api/products
  const { data } = await tesloApi.get<ProductResponse>("/products", {
    params: {
      limit,
      offset,
      gender,
      sizes,
      minPrice,
      maxPrice,
      q: query,
    },
  });

  // necesitamos transformar el contenido del array images de cada producto de la respuesta
  const productsWithImageUrl = data.products.map((product) => ({
    ...product,
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  }));

  // devolvemos los datos
  return {
    ...data,
    products: productsWithImageUrl,
  };
};
