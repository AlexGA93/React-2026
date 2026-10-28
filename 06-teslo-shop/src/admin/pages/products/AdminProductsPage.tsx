import { AdminTitle } from "@/admin/components/AdminTitle";
import { CustomLoadingScreen } from "@/components/custom/CustomLoadingScreen";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormatter } from "@/lib/currencyFormatter";
// import { products } from "@/mocks/products.mock";
import { useProducts } from "@/shop/hooks/useProducts";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export const AdminProductsPage = () => {
  // llamamos al custom hook encargado de realizar la peticion de los productos
  const { data, isLoading } = useProducts();
  const products = data?.products || [];
  const totalPages = data?.pages || 0;

  if (isLoading) {
    return <CustomLoadingScreen />;
  }

  const calculateTotalPrice = () => {
    let total = 0;
    if (products.length > 0) {
      products?.map((product) => (total += product.price));
    }

    return total;
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aqui puedes ver y administrar tus productos."
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white my-3 p-10 shadow-xs border border-gray-200 rounded-b-md mb-10">
        <TableCaption>Lista de Productos.</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead>ID</TableHead> */}
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              {/* <TableCell className="font-medium">{product.id}</TableCell> */}
              <TableCell>
                <img
                  src={product.images[0]}
                  alt={`${product.title}_${product.id}`}
                  width={50}
                  height={50}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </TableCell>
              <TableCell>{product?.title}</TableCell>
              <TableCell>{currencyFormatter(product.price)}</TableCell>
              <TableCell>{product.gender}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {product.sizes.map((size) => (
                    <Badge key={`${product.id}-${size}`}>{size}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/admin/products/${product.id}`}>
                  <Button variant="default" size="sm" className="ml-2">
                    Editar
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              ${calculateTotalPrice()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <CustomPagination totalPages={totalPages} />
    </>
  );
};
