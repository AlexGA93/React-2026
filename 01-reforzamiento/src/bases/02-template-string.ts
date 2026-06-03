let firstName: string = "Alice";
let greeting: string = `Hola ${firstName}`;

console.log(greeting); // Output: Hola Alice

// También se pueden incluir expresiones más complejas dentro de las llaves
let age: number = 30;
let message: string = `Tengo ${age} años`;

console.log(message); // Output: Tengo 30 años

// Las template strings también pueden abarcar múltiples líneas sin necesidad de caracteres especiales

let multiLineString: string = `Esta es una cadena
que abarca varias
líneas.`;

console.log(multiLineString);