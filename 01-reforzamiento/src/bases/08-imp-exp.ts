import {heroes as myFavoriteSuperheroes, Owner, type Hero} from "../data/heroes.data";

const getHeroById = (id: number): Hero => {
    return myFavoriteSuperheroes.find(hero => hero.id === id) ?? {} as Hero;
};

console.log(getHeroById(20)); // { id: 2, name: 'Spiderman', owner: 'Marvel' }


// Tarea
const getHeroByOwner = (owner: Owner): Hero[] => {
    return myFavoriteSuperheroes.filter(hero => hero.owner === owner);
}

console.log(getHeroByOwner(Owner.DC)); // [{ id: 1, name: 'Batman', owner: 'DC' }, { id: 3, name: 'Superman', owner: 'DC' }]