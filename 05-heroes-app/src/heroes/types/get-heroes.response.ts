import type { Hero } from "./hero.interface";

export interface HeroresResponse {
  total: number;
  pages: number;
  heroes: Hero[];
}
