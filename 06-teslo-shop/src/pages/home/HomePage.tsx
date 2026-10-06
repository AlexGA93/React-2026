import { CustomPagination } from "@/components/custom/CustomPagination";
import { products } from "@/mocks/products.mock";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";

export const HomePage = () => {
  return (
    <div>
      {/* Jumbotron - seccion vistosa y dinamica que presenta la seccion */}
      <CustomJumbotron title="Todos los Productos" />
      {/* Contenido */}
      <ProductsGrid products={products} />
      {/* pginacion */}
      <CustomPagination totalPages={7} />
    </div>
  );
};
