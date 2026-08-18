import { describe, expect, test } from "vitest";
import { getSummaryAction } from "./get-summary.action";

// Definimos la "forma" que debe tener cada hero dentro del resumen.
// expect.any(...) valida el tipo de dato, sin fijar un valor concreto.
const heroShape = {
  id: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
  alias: expect.any(String),
  // powers debe ser un array, y dentro debe haber al menos un string.
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

// Mock del resumen completo. Aquí validamos solo la estructura y el tipo,
// no el contenido exacto, porque la API puede devolver valores reales.
const mockSummary = {
  totalHeroes: expect.any(Number),
  // strongestHero y smartestHero son del mismo tipo de objeto,
  // por eso reutilizamos la misma definición mediante objectContaining.
  strongestHero: expect.objectContaining(heroShape),
  smartestHero: expect.objectContaining(heroShape),
  heroCount: expect.any(Number),
  villainCount: expect.any(Number),
};

describe("getSummaryAction", () => {
  // Esta prueba verifica que la acción obtiene un resumen con la estructura
  // esperada y que cada campo tiene el tipo correcto.
  test("should fetch summary and return complete information", async () => {
    const result = await getSummaryAction();

    // toEqual + objectContaining permite comprobar que el resultado contiene
    // al menos los campos esperados, sin depender de un objeto exacto.
    expect(result).toEqual(expect.objectContaining(mockSummary));
  });
});
