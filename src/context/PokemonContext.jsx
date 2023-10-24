import { createContext } from "react";
import usePokemon from "../hooks/usePokemon";

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const pokemon = usePokemon();

  return (
    <PokemonContext.Provider value={{...pokemon}}>
      {children}
    </PokemonContext.Provider>
  );
};
export default PokemonProvider;
