import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "react-router";

type Sizes = "XS" | "S" | "M" | "L" | "XL" | "XXL";

interface SizesObj {
  id: Sizes;
  label: Sizes;
}

export const FilterSidebar = () => {
  // accedemos a los parametros de busqueda de la url para operar con los filtros
  const [searchParams, setSearchParams] = useSearchParams();

  // * TALLAS
  // declaramos las tallas en funcion de parametro
  const currentSizes = searchParams.get("sizes")?.split(",") || [];

  // funcion de gestion de tallas
  const handleSizeChange = (size: Sizes) => {
    // comprobamos que la talla figure dentro del dato extraido
    const newSizes = currentSizes.includes(size)
      ? // si lo tiene, filtramos el array de la talla
        currentSizes.filter((s) => s !== size)
      : // si no, incorporamos la talla al array de los elementos
        [...currentSizes, size];

    // aplicamos los cambios a los searchParameters
    searchParams.set("sizes", newSizes.join(","));
    // nos aseguramos que la busqueda se inicie en la pagina 1
    searchParams.set("page", "1");

    setSearchParams(searchParams);
  };

  const sizes: SizesObj[] = [
    { id: "XS", label: "XS" },
    { id: "S", label: "S" },
    { id: "M", label: "M" },
    { id: "L", label: "L" },
    { id: "XL", label: "XL" },
    { id: "XXL", label: "XXL" },
  ];

  // * PRECIO
  const currentPriceRange = searchParams.get("priceRange") || "any";

  const handlePriceRangesChange = (price: string) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("priceRange", price);
    nextParams.set("page", "1");

    setSearchParams(nextParams);
  };

  return (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Filtros</h3>
      </div>
      {/* Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium">Tallas</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <Button
              key={size.id}
              variant={currentSizes.includes(size.id) ? "default" : "outline"}
              // variant="outline"
              size="sm"
              className="h-8"
              onClick={() => handleSizeChange(size.label)}
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium">Precio</h4>
        <RadioGroup
          value={currentPriceRange}
          onValueChange={handlePriceRangesChange}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="priceAny" />
            <Label htmlFor="priceAny" className="text-sm cursor-pointer">
              Cualquier precio
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0-50" id="price1" />
            <Label htmlFor="price1" className="text-sm cursor-pointer">
              $0 - $50
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50-100" id="price2" />
            <Label htmlFor="price2" className="text-sm cursor-pointer">
              $50 - $100
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100-200" id="price3" />
            <Label htmlFor="price3" className="text-sm cursor-pointer">
              $100 - $200
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="200+" id="price4" />
            <Label htmlFor="price4" className="text-sm cursor-pointer">
              $200+
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterSidebar;
