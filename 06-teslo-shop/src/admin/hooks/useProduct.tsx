import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUpdateProductAction } from "../actions/create-update-product.action";
import { getProductById } from "../actions/get-product-by-id.action";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductById(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // TanStack Query: una mutation representa una operacion que modifica datos,
  // como crear o actualizar un producto. mutationFn recibe los datos que se
  // pasan al llamar mutation.mutate(...) o mutation.mutateAsync(...).
  const mutation = useMutation({
    // mutationFn debe contener la accion que realiza la peticion HTTP.
    // Aqui recibe el Partial<Product> enviado desde mutation.mutate(productData).
    mutationFn: createUpdateProductAction,
    // onSuccess se ejecuta automaticamente si mutationFn termina correctamente.
    // El resultado devuelto por la accion esta disponible en product.
    onSuccess: (product) => {
      // invalidateQueries marca las consultas relacionadas como obsoletas.
      // TanStack las vuelve a ejecutar para mantener la interfaz sincronizada.
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });

      console.log("Funcion ejecutada satisfactoriamente", { product });

      // setQueryData actualiza directamente la cache con la respuesta recibida.
      // Esto permite mostrar el producto actualizado sin esperar una consulta nueva.
      queryClient.setQueryData(["products", { id: product.id }], product);
    },
    // onError se ejecuta automaticamente si mutationFn lanza un error.
    // Tambien puede usarse un callback onError al llamar mutation.mutate.
    onError: (error) => {
      console.log("Error en la peticion", { error });
    },
  });

  // TODO: por eliminar
  // const handleSubmit = async (productData: Partial<Product>) => {
  //   console.log({ productData });
  // };

  return {
    ...query,
    mutation,
  };
};
