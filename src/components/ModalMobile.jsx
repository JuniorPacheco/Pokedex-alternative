import { IconArrowsMinimize } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { colorByStat, colorByType, newTextStats } from "../constants/pokemon";
import { isObject } from "../utils";

const ModalMobile = ({
  isOpen,
  closeModal,
  pokemon,
  onClickShowNewPokemon,
}) => {
  const [evolutions, setEvolutions] = useState([]);
  const types = pokemon?.types.map((type) => type.type.name);

  useEffect(() => {
    if (pokemon) {
      const urlSpecies = pokemon?.species.url;
      (async () => {
        try {
          const { data: dataSpecies } = await axios.get(urlSpecies);
          const { data: dataEvolutions } = await axios.get(
            dataSpecies.evolution_chain.url
          );
          const baseFormName = dataEvolutions.chain.species.name;
          const firstEvolutionName =
            dataEvolutions.chain.evolves_to[0]?.species.name;
          const secondEvolutionName =
            dataEvolutions.chain.evolves_to[0]?.evolves_to[0]?.species.name;

          const firstLevelEvolution =
            dataEvolutions.chain.evolves_to[0]?.evolution_details[0].min_level;
          const secondLevelEvolution =
            dataEvolutions.chain.evolves_to[0]?.evolves_to[0]
              ?.evolution_details[0].min_level;

          const promises = [
            baseFormName,
            firstEvolutionName,
            secondEvolutionName,
          ]
            .filter((evolution) => evolution !== undefined)
            .map(
              async (pokemonName) =>
                await axios.get(
                  `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
                )
            );

          Promise.allSettled(promises).then((values) => {
            const filterValues = values.filter(
              (value) => value.status !== "rejected"
            );
            const evolutions = filterValues.map(
              (pokemonEvolution) => pokemonEvolution.value.data
            );
            firstEvolutionName && evolutions.splice(1, 0, firstLevelEvolution);
            secondEvolutionName &&
              evolutions.splice(3, 0, secondLevelEvolution);
            setEvolutions(evolutions);
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [pokemon]);
  return (
    <section
      className={`fixed top-0 left-0 right-0 bottom-0 ${
        colorByType[pokemon?.types[0].type.name]
      } duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } transition-all pt-40 overflow-hidden text-center capitalize lg:hidden`}
    >
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 bg-white p-2 rounded-md hover:bg-white/50 transition-colors"
      >
        <IconArrowsMinimize size={30} stroke={3} />
      </button>
      <article
        className={`h-full bg-white rounded-t-3xl ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } duration-500 transition-transform grid content-start gap-3 px-4 pb-4`}
      >
        <header className="h-8">
          <img
            src={
              pokemon?.sprites.versions?.["generation-v"]["black-white"]
                .animated.front_default
            }
            className="absolute pixelated  scale-[270%] top-0 -translate-y-[120%] left-1/2 -translate-x-1/2 w-auto max-h-[60px]"
            alt=""
          />
        </header>
        <div className="grid gap-3 overflow-y-auto hidden-scroll">
          <span className="text-slate-400 text-sm mt-2 font-bold block">
            N° {pokemon?.id}
          </span>
          <h3 className="font-bold text-2xl">{pokemon?.name}</h3>
          <ul className="flex gap-2 justify-center flex-wrap">
            {types?.map((type) => (
              <li
                className={`text-white text-sm p-1 px-2 rounded-md ${
                  colorByType[type]
                }`}
                key={type}
              >
                {type}
              </li>
            ))}
          </ul>
          <h4 className="font-bold">Pokedex Entry</h4>
          <p className="normal-case text-slate-400 text-[16px]">
            {pokemon?.description.replace(/\f/g, " ")}
          </p>

          {/* Qualities */}
          <div className="grid sm:grid-cols-2 gap-2 [&>div>h4]:font-bold [&>div>span]:rounded-full [&>div>span]:bg-slate-100 [&>div>span]:block [&>div>span]:py-1 [&>div>span]:text-base">
            <div>
              <h4>Height</h4>
              <span>{pokemon?.height}m</span>
            </div>
            <div>
              <h4>Weight</h4>
              <span>{pokemon?.weight}kg</span>
            </div>
          </div>

          {/* Abilities */}
          <div>
            <h4 className="font-bold">Abilities</h4>
            <ul className="grid sm:grid-cols-2 gap-2 [&>li]:rounded-full [&>li]:bg-slate-100 [&>li]:block [&>li]:py-1 [&>li]:text-base">
              {pokemon?.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h4 className="font-bold">Stats</h4>
            <ul className="flex justify-center flex-wrap gap-3">
              {pokemon?.stats.map((stat) => (
                <li
                  key={stat.stat.name}
                  className={`p-1 rounded-full text-sm text-center py-2 ${
                    stat.stat.name === "total"
                      ? "bg-[#88AAEA] text-white"
                      : "bg-slate-100"
                  }`}
                >
                  <div
                    className={`${
                      colorByStat[stat.stat.name]
                    } rounded-full w-7 h-7 grid place-content-center text-white text-xs font-semibold`}
                  >
                    <span>{newTextStats[stat.stat.name]}</span>
                  </div>
                  <span className="font-bold block mt-1">{stat.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evolutions */}
          <div>
            <h4 className="font-bold">Evolution</h4>
            <ul className="flex flex-wrap items-center justify-center [&>li>button]:bg-slate-100 gap-3 font-bold text-sm">
              {evolutions.map((evolution, index) => {
                if (isObject(evolution)) {
                  return (
                    <li key={index}>
                      <button
                        className="w-14 rounded-md p-1 hover:bg-slate-200 transition-colors cursor-pointer"
                        disabled={
                          !evolution?.sprites.versions["generation-v"][
                            "black-white"
                          ].front_default
                        }
                        onClick={() => onClickShowNewPokemon(evolution.id)}
                      >
                        {evolution?.sprites.versions["generation-v"][
                          "black-white"
                        ].front_default ? (
                          <img
                            src={
                              evolution?.sprites.versions["generation-v"][
                                "black-white"
                              ].front_default
                            }
                            alt=""
                          />
                        ) : (
                          <img
                            src={
                              evolution?.sprites.other["official-artwork"].front_default
                            }
                            alt=""
                          />
                        )}
                      </button>
                    </li>
                  );
                } else {
                  return (
                    <li className="px-4 p-1 rounded-full" key={index}>
                      {evolution ?? "?"}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
};
export default ModalMobile;
