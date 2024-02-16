import Pokemon from './Pokemon'

const PokemonList = ({ pokemons, checkName, guessedPokemon }) => {
  return (
    <div className='buttons-pokemons'>
      {
      pokemons.map((pok) => (
        <Pokemon key={pok.name} name={pok.name} checkName={checkName} guessedPokemon={guessedPokemon} />
      ))
    }
    </div>
  )
}

export default PokemonList
