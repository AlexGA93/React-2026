import { Navigate, useNavigate, useParams } from "react-router";

import { useProduct } from "@/admin/hooks/useProduct";
import { CustomLoadingScreen } from "@/components/custom/CustomLoadingScreen";
import type { Product } from "@/interfaces/product.response";
import { toast } from "sonner";
import { AdminProductForm } from "./ui/AdminProductForm";

export const AdminProductPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: product, isLoading, isError, mutation } = useProduct(id || "");

  const productTitle = id === "new" ? "Nuevo producto" : "Editar producto";
  const productSubtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const handleSubmit = async (productData: Partial<Product>) => {
    await mutation.mutate(productData, {
      onSuccess: (data) => {
        toast.success("Producto actualizado correctamente", {
          position: "top-right",
        });

        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.error({ error });

        toast.error("Error al actualizar el producto");
      },
    });
  };

  // * Validaciones

  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading) {
    return <CustomLoadingScreen />;
  }

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <AdminProductForm
      title={productTitle}
      subTitle={productSubtitle}
      product={product}
      onSubmit={handleSubmit}
      isPosting={mutation.isPending}
    />
  );
};
