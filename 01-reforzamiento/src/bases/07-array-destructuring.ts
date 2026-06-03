const numeros = [10, 20, 30];
const [a, b, c] = numeros;

console.log(a, b, c); // 10 20 30


const frutas = ["manzana", "pera", "uva", "kiwi"];
const [primera, segunda, ...resto] = frutas;

console.log(primera); // "manzana"
console.log(segunda); // "pera"
console.log(resto);   // ["uva", "kiwi"]

let x = 1;
let y = 2;

[x, y] = [y, x]; // a X se le asigna el valor de y=2

console.log(x, y); // 2 1

function imprimirCoordenadas([x, y]: [number, number]) {
    console.log(`X: ${x}, Y: ${y}`);
}

imprimirCoordenadas([15, 30]); // X: 15, Y: 30

// TAREA:
/**
 * Crea una función llamada useState. Debe cumplir con los siguientes requisitos:
Requisitos

    La función debe llamarse useState.

    Debe retornar un arreglo con dos elementos:

    #1 - Un string (el valor inicial).

    #2 - Una función anónima de flecha que:
        Recibe un string.
        Imprime ese string en consola.
ejemplo de uso:
const [name, setName] = useState('Goku');
console.log(name);       // Goku
setName('Vegeta');       // Imprime "Vegeta"
 */
const useState = (name: string) => {
    return [name, (newName: string) => console.log(newName)] as const
};

const [data, setData] = useState("Goku");

console.log(data); // Goku
setData("Vegeta"); // Imprime "Vegeta"
