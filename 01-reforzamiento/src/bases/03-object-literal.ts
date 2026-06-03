
interface HeroAddress {
    street: string;
    city: string;
    country: string;
}

interface Hero {
    name: string;
    age: number;
    email: string;
    isActive: boolean;
    address: HeroAddress;
}

const person: Hero = {
    name: "Alice",
    age: 30,
    email: "test@mail.com",
    isActive: true,
    address: {
        street: "123 Main St",
        city: "Anytown",
        country: "USA"
    }
};

console.log(person); // Output: { name: "Alice", age: 30, email: "test@mail.com", isActive: true }
// Accessing properties
console.log(person.name); // Output: "Alice"
console.log(person.age); // Output: 30
console.log(person.email); // Output: "test@mail.com"
console.log(person.isActive); // Output: true

// Modifying properties
person.age = 31;
console.log(person.age); // Output: 31

// Adding new properties
person.email = "alice@example.com";
console.log(person.email); // Output: "alice@example.com"   
// Deleting properties
// delete person.isActive;
console.log(person.isActive); // Output: undefined  

const cloned = structuredClone(person);
console.log(cloned); // Output: { name: "Alice", age: 31, email: "