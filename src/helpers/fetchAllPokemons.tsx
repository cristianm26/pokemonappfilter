import { pokemonApi } from "../api/pokemonApi"
import { FetchAllPokemonResponse, Pokemon, SmallPokemon } from "../interfaces/fetchAllPokemonResponse";

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
    const resp = await pokemonApi.get<FetchAllPokemonResponse>('/pokemon?limit=1500');
    const smallPokemonList = resp.data.results;
    return transformSmallPokemonIntoPokemonList(smallPokemonList);

}

const transformSmallPokemonIntoPokemonList = (smallPokemonList: SmallPokemon[]): Pokemon[] => {
    const pokemonArr = smallPokemonList.map(poke => {
        const pokeArr = poke.url.split('/');
        const id = pokeArr[6];
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        return {
            id,
            pic,
            name: poke.name,

        }
    })
    return pokemonArr;
}