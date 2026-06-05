import { describe, expect, test } from "vitest";
import { add, multiply, subtract } from "./math.helper";

// describe: Agrupa pruebas relacionadas, proporcionando una descripción general del conjunto de pruebas. Es útil para organizar y estructurar las pruebas de manera lógica.
// test: Define una prueba individual, especificando lo que se espera que haga el código bajo prueba. Cada test debe ser independiente y verificar un aspecto específico del código.
// expect: Es una función que se utiliza para realizar afirmaciones sobre el resultado de una prueba. Permite comparar el resultado obtenido con el resultado esperado, utilizando métodos como toBe, toEqual, etc., para validar el comportamiento del código.


// * pruebas para la funcion 'add' del helper math.helper.ts
describe("add", () => {
  // probamos funcion 'add' del helper math.helper.ts
  test(// descripcion de la prueba a realizar
  "add should return the sum of two numbers", // funcion que realiza la prueba
  () => {
    // ! 1. Arrange: Preparamos el escenario de la prueba, incluyendo cualquier dato o configuración necesaria.
    const a = 2;
    const b = 2;
    // ! 2. Act: Ejecutamos la función o el código que queremos probar.
    // probamos la funcion suma importada y pasandole argumentos
    const result = add(a, b);
    // ! 3. Assert: Verificamos que el resultado obtenido es el esperado utilizando afirmaciones.
    // evaluamos usando expect de vitest
    expect(result).toBe(4);
  });
  
    test("add should return the sum of two numbers with the modification", () => {
    const a = 2;
    const b = 2;
    const result = add(a, b);
    expect(result).toBe(5); // Esto fallará debido a la modificación en la función add
    });
    
    test("add should return the sum of two negative numbers", () => {
    const a = -2;
    const b = -2;

    const result = add(a, b);
    expect(result).toBe(-4); // Esto pasará correctamente
    });
});

// * pruebas para la funcion 'subtract' del helper math.helper.ts
describe("subtract", () => {
  test("subtract should return the difference of two numbers", () => {
    const a = 5;
    const b = 3;
    const result = subtract(a, b);
    expect(result).toBe(2);
  });
    
    test("subtract should return the difference of two negative numbers", () => {   
    const a = -5;
    const b = -3;
    const result = subtract(a, b);
    expect(result).toBe(-2);
  });
});

// * pruebas para la funcion 'multiply' del helper math.helper.ts
describe("multiply", () => {
  test("multiply should return the product of two numbers", () => {
    const a = 4;
    const b = 3;
    const result = multiply(a, b);
    expect(result).toBe(12);
  });
    
    test("multiply should return the product of a positive and a negative number", () => {
    const a = 4;
    const b = -3;
    const result = multiply(a, b);
    expect(result).toBe(-12);
  });
});