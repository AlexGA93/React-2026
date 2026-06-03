let numeros: number[] = [1, 2, 3, 4];

let nombres: Array<string> = ["Ana", "Luis", "María"];

interface Persona {
    nombre: string;
    edad: number;
}

let personas: Persona[] = [
    { nombre: "Ana", edad: 20 },
    { nombre: "Luis", edad: 25 }
    
];

// metodos mas comunes de los arrays
numeros.push(5); // agrega un elemento al final del array
numeros.pop(); // elimina el ultimo elemento del array
numeros.shift(); // elimina el primer elemento del array
numeros.unshift(0); // agrega un elemento al inicio del array
personas.filter(p => p.edad > 21); // devuelve un nuevo array con los elementos que cumplen la condicion


personas.map(p => p.nombre); // devuelve un nuevo array con los resultados de la funcion aplicada a cada elemento
personas.find(p => p.nombre === "Ana"); // devuelve el primer elemento que cumple la condicion
personas.some(p => p.edad > 30); // devuelve true si al menos un elemento cumple la condicion
personas.every(p => p.edad > 18); // devuelve true si todos los elementos cumplen la condicion
console.log(numeros);