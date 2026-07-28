import { useEffect, useState } from "react";
import type { Pokemon } from "../interfaces/pokeon.types";

interface Props {
    id: number;
}

export const usePokemon = ({ id }: Props) => {
    
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getPokemonById = async (id: number) => {
        setIsLoading(true);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        console.log({ data });
        
        setPokemon({
            id: id,
            name: data.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        })
        
        setIsLoading(false);
    }
    
    useEffect(() => {
        
        getPokemonById(id);

    }, [id]);

    return {
        // properties
        pokemon,
        isLoading,
        //computed
        fomattedId: id.toString().padStart(3,'0')
        // methods
    };
}
