export const getPokemons = async (url) => {
  if (!url) {
    url = 'https://pokeapi.co/api/v2/pokemon'
  }
  try {
    const response = await fetch(`${url}`)
    if (!response.ok) {
      throw new Error('Error')
    }
    const { results, next } = await response.json()

    return { results, next }
  } catch (error) {
    throw new Error('Error get pokemons: ', error)
  }
}

export const getPokemon = async (url) => {
  try {
    const response = await fetch(`${url}`)
    if (!response.ok) {
      throw new Error('Error')
    }

    const json = await response.json()

    const newPokemon = {
      name: json.name,
      img: json.sprites.other.home.front_default
    }

    return newPokemon
  } catch (error) {
    throw new Error('Error get Pokemon')
  }
}
