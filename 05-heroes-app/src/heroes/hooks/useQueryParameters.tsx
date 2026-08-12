import { useMemo } from "react";
import { useSearchParams } from "react-router";

export const useQueryParameters = () => {
  /**
   * En lugar de guardar la pestaña activa en un useState local, la sincronizamos con la URL mediante useSearchParams.
   *
   * ¿Por qué este enfoque?
   * - La pestaña no depende solo del render del componente, sino también del estado de navegación.
   * - Si el usuario recarga la página, comparte el enlace o vuelve atrás/adelante en el navegador, la sección activa se mantiene.
   * - Evita que la información se pierda al desmontar o volver a montar el componente.
   *
   * La URL queda algo así: ?tab=favorites
   * y el componente lee ese valor para decidir qué panel debe mostrarse.
   */

  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("page")); // http://localhost:5173/?page=69
  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const category = searchParams.get("category") ?? "all";

  /**
   * useMemo se usa aquí para validar y normalizar el valor obtenido de la URL.
   *
   * Si el usuario manipula la URL o llega con un valor inválido, evitamos que el componente intente
   * renderizar una pestaña que no existe. En ese caso, devolvemos "all" como valor seguro.
   *
   * Además, useMemo evita recalcular esta validación en cada render si el valor de activeTab no cambia.
   */
  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];

    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  return {
    // variables
    page,
    limit,
    category,
    selectedTab,
    // methods
    setSearchParams,
  };
};
