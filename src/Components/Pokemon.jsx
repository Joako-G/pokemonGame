const Pokemon = ({ name, checkName, guessedPokemon }) => {
  const handleClick = () => {
    checkName(name)
  }

  return (
    <button disabled={guessedPokemon !== null} style={{ background: guessedPokemon === name ? 'green' : guessedPokemon ? 'red' : '' }} onClick={handleClick}> {name} </button>
  )
}

export default Pokemon
