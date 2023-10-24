import axios from "axios";
import { useEffect, useState } from "react";
import { colorByType } from "../constants/pokemon";

const PokemonPreview = ({ pokemonUrl, onClick }) => {
  const [pokemon, setPokemon] = useState(null);

  const types = pokemon?.types.map((type) => type.type.name);

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <article
      onClick={() => onClick(pokemon?.id)}
      className="relative shadow-lg shadow-slate-400/10 bg-white rounded-3xl border-2 border-transparent capitalize pb-4 px-2 grid gap-2 cursor-pointer group hover:border-slate-200"
    >
      <header className="h-8">
        <img
          src={
            pokemon?.sprites.versions["generation-v"]["black-white"]
              .front_default
          }
          className="absolute pixelated top-0 -translate-y-[58%] left-1/2 -translate-x-1/2 group-hover:hidden transition-transform"
          alt=""
        />
        <img
          src={
            pokemon?.sprites.versions["generation-v"]["black-white"].animated
              .front_default
          }
          className="absolute pixelated top-0 -translate-y-[58%] left-1/2 -translate-x-1/2 hidden group-hover:block"
          alt=""
        />
      </header>
      <span className="text-slate-600 text-xs font-semibold">
        N° {pokemon?.id}
      </span>
      <h4 className="font-bold">{pokemon?.name}</h4>
      <ul className="flex gap-2 justify-center flex-wrap">
        {types?.map((type) => (
          <li
            className={`text-white text-sm p-1 px-2 rounded-md ${colorByType[type]}`}
            key={type}
          >
            {type}
          </li>
        ))}
      </ul>
    </article>
  );
};
export default PokemonPreview;
