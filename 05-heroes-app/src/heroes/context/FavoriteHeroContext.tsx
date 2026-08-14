/**
 * Gestion del estado de una aplicacion a nivel superior a los componentes.
 * En este caso, definiremos un estado para los heroes marcados como favoritos de forma que dicha informacion se almacene y sea accesible desde varios niveles de la app
 */

import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import * as z from "zod";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  // State
  favorites: Hero[];
  favoriteCount: number;

  // Methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// * ZOD: definimos esquema de validacion
const FavoriteSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  alias: z.string(),
  powers: z.array(z.string()),
  description: z.string(),
  strength: z.number(),
  intelligence: z.number(),
  speed: z.number(),
  durability: z.number(),
  team: z.string(),
  image: z.string(),
  firstAppearance: z.string(),
  status: z.string(),
  category: z.string(),
  universe: z.string(),
});

const FavoritesSchema = z.array(FavoriteSchema);

// creamos y exportamos el contexto de los favoritos
// Le pasamos el estado inicial
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

// funcion para sacar los datos almacenados en Local Storage (robusta)
const getFavoritesFromLocalStorage = (): Hero[] => {
  try {
    // * 1. extraemos los datos de localstorage
    const raw = localStorage.getItem("favorites");

    // * 2. devolvemos array vacio si no tenemos datos y devolvemos array vacio
    if (!raw) return [];

    // * 3. en caso de tener datos parseamos los datos
    const parsed = JSON.parse(raw);

    // * 4. validar con ZOD el objeto de localstorage
    const result = FavoritesSchema.safeParse(parsed);

    // * 5. en caso de error, mostramos error y devolvemos array vacio
    if (!result.success) {
      console.error("Favorites validation failed:", result.error);
      return [];
    }

    // * 6. devolver los datos validados
    return result.data;
  } catch (error) {
    console.error("Failed to read favorites from localStorage:", error);
    return [];
  }
};

// componente provider del context
export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  // guardamos el estado local para favoritos
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage(),
  );

  // funcion
  const toggleFavorite = (hero: Hero) => {
    // es favorito? consultamos el estado global de favoritos
    const heroExist = favorites.find((h) => h.id === hero.id);

    // si el heroe existe, lo removemos
    if (heroExist) {
      setFavorites((prev) => prev.filter((h) => h.id !== hero.id));
      return;
    }

    // si no existe, lo añadimos
    setFavorites((prev) => [...prev, hero]);
  };

  const isFavorite = (hero: Hero) => favorites.some((h) => h.id === hero.id);

  // disparamos la llamada de registro de datos en el localstorage cada vez que haya cambios en favoritos
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext.Provider
      value={{
        // State
        favorites,
        favoriteCount: favorites.length,
        // methods
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext.Provider>
  );
};

/**
 * EL siguiente paso es consumir nuestro contexto.
 * Para ello, envolveremos el elemento al nivel que queramos en la app en uestro provider.
 * En este caso, como la app enteramente consta de los heroes, podemos elegir HeroesApp como objetivo
 */
