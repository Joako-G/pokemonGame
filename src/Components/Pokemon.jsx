const Pokemon = ({ name, checkName, guessedPokemon }) => {
  const handleClick = () => {
    checkName(name)
  }

  return (
    <button className='pokemons' disabled={guessedPokemon !== null} style={{ background: guessedPokemon === name ? 'green' : guessedPokemon ? 'red' : '' }} onClick={handleClick}> {name} </button>
  )
}

export default Pokemon
