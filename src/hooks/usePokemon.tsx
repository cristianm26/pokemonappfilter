import { useEffect } from "react";
import { useState } from "react"
import { fetchAllPokemons } from "../helpers/fetchAllPokemons";
import { Pokemon } from '../interfaces/fetchAllPokemonResponse';

export const usePokemon = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    useEffect(() => {
        //La carga de los Pokemones
        fetchAllPokemons().then(pokemons => {
            setIsLoading(false);
            setPokemons(pokemons)
        });
    }, [])
    return {
        isLoading,
        pokemons
    }
}
