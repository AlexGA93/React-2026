import type { EstHero } from "./hero-stats.interface";

export interface SummaryResponse {
  totalHeroes: number;
  strongestHero: EstHero;
  smartestHero: EstHero;
  heroCount: number;
  villainCount: number;
}
