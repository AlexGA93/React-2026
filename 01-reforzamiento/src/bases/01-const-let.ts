/**
 * En JavaScript, antes de ES6, se utilizaba la palabra clave `var` para declarar variables. Sin embargo, `var` tiene un alcance de función, lo que significa que las variables declaradas con `var` son accesibles dentro de la función en la que se declaran, incluso antes de su declaración debido al hoisting. Esto puede llevar a comportamientos inesperados y errores difíciles de depurar.
 *  var firstName = "John";
    var lastName = "Doe";
 */

// Con ES6, se introdujeron `let` y `const` para mejorar la gestión de variables. `let` tiene un alcance de bloque, lo que significa que las variables declaradas con `let` solo son accesibles dentro del bloque en el que se declaran. Esto ayuda a evitar errores relacionados con el hoisting y mejora la legibilidad del código.
// Por otro lado, `const` se utiliza para declarar variables que no pueden ser reasignadas después de su inicialización. Esto es útil para garantizar que ciertas variables mantengan un valor constante a lo largo del programa, lo que puede mejorar la seguridad y la claridad del código.

let firstName = "John";
const lastName = "Doe";

firstName = "Jane"; // Esto es válido
// lastName = "Smith"; // Esto generará un error
