import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useQueryParameters } from "@/heroes/hooks/useQueryParameters";
import { Filter, Grid, Plus, Search, SortAsc } from "lucide-react";
import { useRef } from "react";

export const SearchControls = () => {
  /**
   * * Llamamos al custom hook para poder acceder a las funcionalidades de las query parameters
   */
  const { name, accordion, strength, setSearchParams } = useQueryParameters();

  // * Funcion para actualizar las query parameters de la url
  const handleSearchParams = (
    section: string,
    name: string,
    category: string = "all",
    accordion: string = "",
  ) => {
    setSearchParams((prev) => {
      prev.set("tab", section);
      prev.set("category", category);
      prev.set("name", name);
      prev.set("active-accordion", accordion);
      // devolvemos el valor
      return prev;
    });
  };

  /*******************************************************************************************/

  /**
   * A la hora de lidiar con el valor del input, pensariamos que lo mas normal es usar useState, sin embargo, no necesitamos usarlo en ningun sitio.
   * * Para hacerlo eficiente, vamos a crear una referencia al input
   */
  // * useRef crea una referencia que permite acceder al elemento del DOM sin necesidad de usar estado ni provocar un nuevo render.
  const inputRef = useRef<HTMLInputElement>(null);

  // * Funcion que detecta si hemos pulsado enter para enviar la informacion
  const handleKeyEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const refValue = inputRef.current?.value;

    if (!refValue || refValue.length === 0) return;

    if (event.key === "Enter") {
      // console.log(inputRef.current?.value);
      // mandamos actualizar la url
      handleSearchParams("search", refValue);
    }
  };
  /*******************************************************************************************/
  const handleFiltersParams = (accordion: string) => {
    setSearchParams((prev) => {
      prev.set("active-accordion", accordion);
      // devolvemos el valor
      return prev;
    });
  };

  const handleAdvancedFilters = () => {
    if (accordion === "advanced-filters") {
      // * BORRAMOS EL VALOR
      setSearchParams((prev) => {
        prev.delete("active-accordion");
        return prev;
      });
      return;
    }
    handleFiltersParams("advanced-filters");
  };
  /*******************************************************************************************/
  const handleStrengthParams = (value: string) => {
    setSearchParams((prev) => {
      prev.set("strength", value);
      // devolvemos el valor
      return prev;
    });
  };

  const handleStrength = (value: number[]) => {
    handleStrengthParams(value[0].toString());
  };
  /*******************************************************************************************/
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search heroes, villains, powers, teams..."
            className="pl-12 h-12 text-lg bg-white"
            ref={inputRef}
            onKeyDown={(event) => handleKeyEvent(event)}
            defaultValue={name}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant={accordion === "advanced-filters" ? "default" : "outline"}
            className="h-12"
            onClick={handleAdvancedFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button variant="outline" className="h-12">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort by Name
          </Button>

          <Button variant="outline" className="h-12">
            <Grid className="h-4 w-4" />
          </Button>

          <Button className="h-12">
            <Plus className="h-4 w-4 mr-2" />
            Add Character
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <Accordion type="multiple" defaultValue={[accordion]} value={[accordion]}>
        <AccordionItem value="advanced-filters">
          <AccordionContent>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <Button variant="ghost">Clear All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Team</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All teams
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All categories
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Universe</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All universes
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All statuses
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium">
                  Minimum Strength: {strength}/10
                </label>
                <Slider
                  defaultValue={[Number(strength)]}
                  onValueChange={(value) => handleStrength(value)}
                  max={10}
                  step={1}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
