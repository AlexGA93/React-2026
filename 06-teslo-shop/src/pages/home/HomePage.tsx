import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";

export const HomePage = () => {
  // llamamos al custom hook el cual usa tanstackquery para llamar a ala action y obtener los productos
  const { data } = useProducts();

  return (
    <div>
      {/* Jumbotron - seccion vistosa y dinamica que presenta la seccion */}
      <CustomJumbotron title="Todos los Productos" />
      {/* Contenido */}
      <ProductsGrid products={data?.products || []} />
      {/* pginacion */}
      <CustomPagination totalPages={data?.pages || 0} />
    </div>
  );
};
