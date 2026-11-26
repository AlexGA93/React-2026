import { tesloApi } from "@/api/teslo-api";
import type { Product } from "@/interfaces/product.response";

export const createUpdateProductAction = async (
  productLike: Partial<Product>,
): Promise<Product> => {
  // desestructuramos los campos del producto
  const { id, user, images = [], ...rest } = productLike;

  // diferenciamos en funcion del id del producto
  const isCreating = id === "new";

  rest.stock = Number(rest.stock || 0);
  rest.price = Number(rest.price || 0);

  // realizamos la peticion http en funcion del modo: POST o PATCH
  const { data } = await tesloApi<Product>({
    // especificamos dinamicamente la url
    url: isCreating ? "/products" : `/products/${id}`,
    // especificamos el verbo dinamicamente
    method: isCreating ? "POST" : "PATCH",
    // especificamos los datos a pasar de la peticion
    data: rest,
  });

  console.log({ data });

  // devolvemos la data con las imagenes transformadas
  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes("http")) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    }),
  };
};
