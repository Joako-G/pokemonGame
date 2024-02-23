import Pokemon from './Pokemon'

const PokemonList = ({ pokemonsInGame, checkName, guessedPokemon }) => {
  return (
    <div className='buttons-pokemons'>
      {
      pokemonsInGame.map((pok) => (
        <Pokemon key={pok.name} name={pok.name} checkName={checkName} guessedPokemon={guessedPokemon} />
      ))
    }
    </div>
  )
}

export default PokemonList
