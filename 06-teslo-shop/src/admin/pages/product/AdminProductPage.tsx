import { Navigate, useParams } from "react-router";

import { useProduct } from "@/admin/hooks/useProduct";
import { CustomLoadingScreen } from "@/components/custom/CustomLoadingScreen";
import { AdminProductForm } from "./ui/AdminProductForm";

export const AdminProductPage = () => {
  const { id } = useParams();

  const { data: product, isLoading, isError } = useProduct(id || "");

  const productTitle = id === "new" ? "Nuevo producto" : "Editar producto";
  const productSubtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

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
    />
  );
};
