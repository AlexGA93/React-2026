import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const searchHeroesAction = async (options: Options): Promise<Hero[]> => {
  const { name, team, category, universe, status, strength } = options;

  // validamos
  if (!name && !team && !category && !universe && !status && !strength) {
    return [];
  }

  const { data } = await heroApi.get<Hero[]>(`/search`, {
    params: options,
  });

  // IMPLEMENTAMOS LAS IMAGENES
  const heroes = data.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.id}.jpeg`,
  }));

  // console.log(heroes);
  return [...heroes];
};
