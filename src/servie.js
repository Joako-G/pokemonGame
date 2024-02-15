const SERVER_DOMAIN = 'https://pokeapi.co/api/v2/pokemon'

export const getPokemons = async () => {
  try {
    const response = await fetch(`${SERVER_DOMAIN}`)
    if (!response.ok) {
      throw new Error('Error')
    }
    return response.json()
  } catch (error) {
    throw new Error('Errero get pokemons')
  }
}

export const getPokemon = async (url) => {
  try {
    const response = await fetch(`${url}`)
    if (!response.ok) {
      throw new Error('Error')
    }
    return response.json()
  } catch (error) {
    throw new Error('Error get Pokemon')
  }
}
