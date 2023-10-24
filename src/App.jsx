import Aside from "./components/Aside";
import ModalMobile from "./components/ModalMobile";
import Pokemons from "./components/Pokemons";
import { usePokemonContext } from "./hooks/usePokemon";

function App() {
  const {
    pokemonToShow,
    showDetailPokemon,
    closeDetailPokemon,
    showPokmonById,
    isLoading
  } = usePokemonContext();

  return (
    <main className="font-outfit min-h-screen bg-[#F6F8FC] p-6 py-10 text-lg bg-[url(/images/pokeball-icon.png)] bg-no-repeat bg-[-100px_-100px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] max-w-[1400px] mx-auto gap-4">
        <Pokemons />
        <ModalMobile
          closeModal={closeDetailPokemon}
          isOpen={showDetailPokemon}
          pokemon={pokemonToShow}
          onClickShowNewPokemon={showPokmonById}
        />
        <Aside
          pokemon={pokemonToShow}
          showDetailPokemon={showDetailPokemon}
          isLoading={isLoading}
          onClickShowNewPokemon={showPokmonById}
        />
      </div>
    </main>
  );
}

export default App;
