import { tesloApi } from "@/api/teslo-api";
import type { Product } from "@/interfaces/product.response";

export const getProductById = async (id: string): Promise<Product> => {
  // * COMPROBACION: si no tenemos id saltamos el error
  if (!id) throw new Error("Id is required");

  // * COMPROBACION: si el id es 'new' devolvemos un producto "nuevo"
  if (id === "new") {
    return {
      id: "new",
      title: "",
      price: 0,
      description: "",
      slug: "",
      stock: 0,
      sizes: [],
      gender: "men",
      tags: [],
      images: [],
    } as unknown as Product;
  }

  // * hacemos peticion mediante axios
  const { data } = await tesloApi.get<Product>(`/products/${id}`);

  // * scamos las imagenespara cada imagen del array data
  const images = data.images.map((image: string) => {
    if (image.includes("http")) return image;
    return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
  });

  return {
    ...data,
    images,
  };
};
