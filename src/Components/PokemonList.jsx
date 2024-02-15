import Pokemon from './Pokemon'

const PokemonList = ({ pokemons, checkName, guessedPokemon }) => {
  return (
    <div className='buttons-pokemons'>
      {
      pokemons.map((pok, index) => (
        <Pokemon key={{ index }} name={pok.name} checkName={checkName} guessedPokemon={pok.name === guessedPokemon} />
      ))
    }
    </div>
  )
}

export default PokemonList
