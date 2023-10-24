import { useContext, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";
import axios from "axios";
import { waitSeconds } from "../utils";

const usePokemon = () => {
  const [pokemonToShow, setPokemonToShow] = useState(null);
  const [showDetailPokemon, setShowDetailPokemon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showPokmonById = (id) => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        const { data: infoPokemonSpecie } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}/`
        );
        data.description = infoPokemonSpecie.flavor_text_entries[1].flavor_text;
        data.stats.push({
          base_stat: data.stats.reduce((acc, curr) => acc + curr.base_stat, 0),
          stat: {
            name: "total",
          },
        });
        await waitSeconds(600)
        setPokemonToShow(data);
        setShowDetailPokemon(true);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  const closeDetailPokemon = () => {
    setShowDetailPokemon(false);
    setTimeout(() => {
      setPokemonToShow(null);
    }, 300);
  };

  return {
    showPokmonById,
    pokemonToShow,
    closeDetailPokemon,
    showDetailPokemon,
    isLoading
  };
};

export const usePokemonContext = () => {
  return useContext(PokemonContext);
};

export default usePokemon;
