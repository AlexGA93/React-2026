import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router";
import { Button } from "../ui/button";

interface Props {
  totalPages: number;
}
/**
 * Queremos que el componente trabaje con los query parameters
 */
export const CustomPagination = ({ totalPages }: Props) => {
  // llamamos a useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  // construimos el query page a partir del valor de la url
  const queryPage = searchParams.get("page") ?? "1";
  // establecemos la pagina en funcion del valor con una vaidacion
  const page = isNaN(+queryPage) ? 1 : +queryPage;

  // ! MERA INFORMACION PARA APRENDIZAJE
  const colorValor = "color: #007bff; font-weight: bold;"; // Azul
  const colorTexto = "color: #999999;"; // Gris para el texto normal

  console.log(
    `
    %c1.%c Primero llamamos a useSearchParams para obtener las herramientas de acceso a parametros de la url: %c${searchParams}
    %c2.%c Sacamos el parametro 'page' de la url (Si no recibe nada, tiene el valor "1" por defecto):  %c${queryPage}
    %c3.%c en base a dicho valor le asignamos el valor (en formato numerico), y si es NaN, asignamos 1: %c${page}
`,
    colorTexto,
    colorTexto,
    colorValor,
    colorTexto,
    colorTexto,
    colorValor,
    colorTexto,
    colorTexto,
    colorValor,
  );

  // * Para cambiar el numero tenemos que cambiar la url
  const handlePageChange = (page: number) => {
    // validamos
    if (page < 1 || page > totalPages) return;

    // SIMPLEMENTA CAMBIAMOS EL VALOR DEL OBJETO
    searchParams.set("page", page.toString());
    // NECESARIO LLAMAR AL CALLBACK CON EL VALOR CAMBIADO
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Boton de previa (por defecto deshabilitado dado que nos situamos en la primera) */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      {/* Botones de las tres primeras paginas accesibles */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={page === index + 1 ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
      {/* Puntos suspensivos */}
      {/* <Button variant="ghost" size="sm" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button> */}
      {/* Boton de siguiente habilitado dado que podemos avanzar */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
