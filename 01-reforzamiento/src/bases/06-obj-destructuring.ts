interface Person {
    name: string;
    age: number;
    key: string;
    country: string;
    rank?: string;
}

const person: Person = {
    name: "Tony",
    age: 45,
    key: "Ironman",
    country: "USA",
};

// const name = person.name;
// const age = person.age;
// const key = person.key;
// const country = person.country;

// console.log(name, age, key, country);

// Desestructuración de objetos

// const { name, age, key } = person;
// console.log(name, age, key);

// Desestructuración con alias en typescript

const { name: nombre2, age: edad, key: clave } = person;
console.log(nombre2, edad, clave);

// Desestructuración con valores por defecto
const { name: nombre3, age: edad3, key: clave3, country = "USA" } = person;
console.log(nombre3, edad3, clave3, country);

const useContext = ({ key, name, age, rank="" }: Person) => {
    return {
        keyName: key,
        user: {
            name,
            age,
        },
        rank: rank,
    }
}

const { rank, keyName, user: { name, age } } = useContext(person);

console.log({rank, keyName, name, age});