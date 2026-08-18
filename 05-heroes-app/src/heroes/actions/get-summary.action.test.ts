import { describe, expect, test } from "vitest";
import { getSummaryAction } from "./get-summary.action";

const heroShape = {
  id: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
  alias: expect.any(String),
  // dato espera un array el cual contiene strings
  powers: expect.arrayContaining([expect.any(String)]),
  description: expect.any(String),
  strength: expect.any(Number),
  intelligence: expect.any(Number),
  speed: expect.any(Number),
  durability: expect.any(Number),
  team: expect.any(String),
  image: expect.any(String),
  firstAppearance: expect.any(String),
  status: expect.any(String),
  category: expect.any(String),
  universe: expect.any(String),
};

const mockSummary = {
  totalHeroes: expect.any(Number),
  // los datos se validaran como objetos que contienen la 'forma' definida
  strongestHero: expect.objectContaining(heroShape),
  smartestHero: expect.objectContaining(heroShape),
  heroCount: expect.any(Number),
  villainCount: expect.any(Number),
};

describe("getSummaryAction", () => {
  test("should fetch summary and return complete information", async () => {
    const result = await getSummaryAction();
    // console.log(result);
    expect(result).toEqual(expect.objectContaining(mockSummary));
  });
});
