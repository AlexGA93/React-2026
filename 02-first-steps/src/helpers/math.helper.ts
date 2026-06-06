/**
 * Funciones matemáticas básicas para el proyecto de React.
 */

export const add = (a: number, b: number): number => {
    // anadimos modificacion para que la funcion tenga un fallo y asi probar la prueba unitaria
    // ++a;
    return a + b;
};

export const subtract = (a: number, b: number): number => {
    return a - b;
};          

export const multiply = (a: number, b: number): number => {
    return a * b;
};

export const divide = (a: number, b: number): number => {
    if (b === 0) {
        throw new Error("No se puede dividir por cero");
    }
    return a / b;
};

export const power = (base: number, exponent: number): number => {
    return Math.pow(base, exponent);
};

export const squareRoot = (value: number): number => {
    if (value < 0) {
        throw new Error("No se puede calcular la raíz cuadrada de un número negativo");
    }
    return Math.sqrt(value);
};
