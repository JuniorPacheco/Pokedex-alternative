import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import PokemonList from "./PokemonList";

const INCREASE_LIMIT = 20;

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(INCREASE_LIMIT);
  const [pokemonName, setPokemonName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLimit(INCREASE_LIMIT)
    setPokemonName(e.target.pokemonName.value.toLowerCase());
  };
  
  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const handleIncreaseLimit = () => {
    const newLimit = limit + INCREASE_LIMIT;
    if (newLimit <= pokemonsByName.length) return setLimit(newLimit);
    setLimit(pokemonsByName.length);
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=898")
      .then(({ data }) => {
        setPokemons(data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="flex bg-white p-3 px-4 shadow-xl rounded-lg"
      >
        <input
          placeholder="Searh your pokemon"
          className="flex-1 outline-none"
          name="pokemonName"
          type="text"
        />
        <button className="bg-red-500 shadow-lg shadow-red-500 text-white p-2 rounded-md hover:bg-red-400 transition-colors">
          <IconSearch size={20} stroke={4} />
        </button>
      </form>
      <PokemonList pokemons={pokemonsByName.slice(0, limit)} />
      <button
        onClick={handleIncreaseLimit}
        disabled={pokemonsByName.length === limit}
        className="mx-auto block mt-10 bg-blue-500 text-white px-4 py-1 rounded-md text-base hover:bg-blue-600 transition-colors disabled:bg-blue-700"
      >
        Show more...
      </button>
    </section>
  );
};
export default Pokemons;
