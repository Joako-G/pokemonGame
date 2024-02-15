const Pokemon = ({ name, checkName, guessedPokemon }) => {
  const handleClick = () => {
    checkName(name)
  }

  return (
    <button style={{ background: guessedPokemon ? 'green' : '' }} onClick={handleClick}> {name} </button>
  )
}

export default Pokemon
