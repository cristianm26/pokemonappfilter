import { usePokemon } from "../hooks/usePokemon";
import { Loading } from '../components/Loading';
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";
import { ChangeEvent, useState } from "react";

export const HomePage = () => {
    const { isLoading, pokemons } = usePokemon();
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const filteredPokemons = (): Pokemon[] => {
        if (search.length === 0)
            return pokemons.slice(currentPage, currentPage + 5)
        //si hay algo en la caja de texto
        const filtered = pokemons.filter(poke => poke.name.includes(search));
        return filtered.slice(currentPage, currentPage + 5);
    }
    const nextPage = () => {
        if (pokemons.filter(poke => poke.name.includes(search)).length > currentPage + 5)
            setCurrentPage(currentPage + 5);
    }
    const prevPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 5);
    }
    const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(0);
        setSearch(target.value)
    }
    return (
        <div className="mt-5">
            <h1>Listado de Pokemons</h1>
            <hr />
            <input type="text" className="mb-2 form-control" placeholder="Buscar un Pokemon" value={search} onChange={onSearchChange} />
            <button className="btn btn-primary" onClick={prevPage}>Anteriores</button>
            &nbsp;
            <button className="btn  btn-primary" onClick={nextPage} >Siguientes</button>
            <table className="table caption-top">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredPokemons().map(({ id, name, pic }) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>
                                    <img src={pic} alt={name} style={{ height: 100 }} />
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

            {
                isLoading && <Loading />
            }
        </div>
    )
}
