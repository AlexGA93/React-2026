// Funciones tradicionales
/**
 * Suma dos números y devuelve el resultado.    
 * @param a 
 * @param b 
 * @returns 
 */
function sumar(a: number, b: number): number {
    return a + b;
}

// Funciones anónimas
/**
 *  Resta dos números y devuelve el resultado.
 *  Anonimas: No tienen un nombre específico, se asignan a una variable o se pasan como argumentos a otras funciones.
 * @param a 
 * @param b 
 * @returns 
 */
const restar = function(a: number, b: number): number {
    return a - b;
};

// Funciones flecha
/**
 *  Multiplica dos números y devuelve el resultado.
 * Flecha: Sintaxis más concisa, no tienen su propio contexto de `this`, lo que las hace ideales para funciones anónimas y callbacks.
 * @param a 
 * @param b 
 * @returns 
 */
const multiplicar = (a: number, b: number): number => {
    return a * b;
};

// Función flecha con retorno implícito
/**
 *  Divide dos números y devuelve el resultado.
 *  Retorno implícito: Si la función tiene una sola expresión, se puede omitir la palabra clave `return` y las llaves `{}`.
 * @param a 
 * @param b 
 * @returns 
 */
const dividir = (a: number, b: number): number => a / b;

// Uso de las funciones
console.log(sumar(5, 3)); // 8
console.log(restar(5, 3)); // 2
console.log(multiplicar(5, 3)); // 15
console.log(dividir(5, 3)); // 1.6666666666666667