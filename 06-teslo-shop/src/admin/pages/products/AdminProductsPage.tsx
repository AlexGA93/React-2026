import { AdminTitle } from "@/admin/components/AdminTitle";
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
import { products } from "@/mocks/products.mock";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export const AdminProductsPage = () => {
  const calculateTotalPrice = () => {
    let total = 0;
    products.map((product) => (total += product.price));
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
            <TableHead>ID</TableHead>
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
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>
                <img
                  src={product.image}
                  alt={`${product.name}_${product.id}`}
                  width={50}
                  height={50}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>inventario</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {product.sizes.map((size) => (
                    <Badge key={`${product.id}-${size}`}>{size}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Link to={product.to}>
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

      <CustomPagination totalPages={10} />
    </>
  );
};
