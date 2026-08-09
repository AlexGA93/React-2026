import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const page = 1 as number;
  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Boton de previa (por defecto deshabilitado dado que nos situamos en la primera) */}
      <Button variant="outline" size="sm" disabled={page === 1}>
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      {/* Botones de las tres primeras paginas accesibles */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={page === index + 1 ? "default" : "outline"}
          size="sm"
        >
          {index + 1}
        </Button>
      ))}
      {/* Puntos suspensivos */}
      <Button variant="ghost" size="sm" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      {/* Boton de siguiente habilitado dado que podemos avanzar */}
      <Button variant="outline" size="sm" disabled={page === totalPages}>
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
