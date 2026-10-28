import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";
import { useParams } from "react-router";

export const GenderPage = () => {
  const { gender } = useParams();

  const { data } = useProducts();

  const genderLabel = () => {
    switch (gender) {
      case "men":
        return "Hombres";
      case "women":
        return "Mujeres";
      case "kid":
        return "Niños";
      default:
        return "genero";
    }
  };

  return (
    <div>
      {/* Jumbotron - seccion vistosa y dinamica que presenta la seccion */}
      <CustomJumbotron title={genderLabel()} />
      {/* Contenido */}
      <ProductsGrid products={data?.products || []} />
      {/* pginacion */}
      <CustomPagination totalPages={data?.pages || 1} />
    </div>
  );
};
