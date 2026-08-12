import { heroApi } from "../api/hero.api";
import type { HeroresResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroApiByPageAction = async (
  page: number,
  limit: number = 6,
  category: string = "all",
): Promise<HeroresResponse> => {
  // console.log({ page });

  // si hay algun problema situamos en pagina 1
  if (isNaN(page)) {
    page = 1;
  }

  if (isNaN(limit)) {
    page = 6;
  }
  const { data } = await heroApi.get<HeroresResponse>("/", {
    params: {
      limit,
      offset: (page - 1) * limit,
      category,
    },
  });
  // console.log({ data });

  // mapeamos el array de heroes para incorporar las imagenes
  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.id}.jpeg`,
  }));

  return {
    ...data,
    heroes,
  };
};
