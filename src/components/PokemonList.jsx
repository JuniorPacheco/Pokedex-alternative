import { usePokemonContext } from "../hooks/usePokemon";
import PokemonPreview from "./PokemonPreview";

const PokemonList = ({ pokemons }) => {
  const { showPokmonById } = usePokemonContext();

  return (
    <section className="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-4 gap-y-20 justify-center pt-20 text-center">
      {pokemons.map((pokemon) => (
        <PokemonPreview
          key={pokemon.url}
          onClick={showPokmonById}
          pokemonUrl={pokemon.url}
        />
      ))}
    </section>
  );
};
export default PokemonList;
