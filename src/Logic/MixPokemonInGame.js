import { mixPokemons } from './MixPokemon'
import { getRandomNum } from './RamdomNum'

export const mixPokemonsInGame = (pokemon, pokemonsList) => {
  const uniquePokemons = new Set()
  uniquePokemons.add(pokemon)
  while (uniquePokemons.size < 5) {
    const randomIndex = getRandomNum(pokemonsList.length)
    if (pokemonsList[randomIndex].name !== pokemon.name) uniquePokemons.add(pokemonsList[randomIndex])
  }
  const array = mixPokemons(Array.from(uniquePokemons))
  return array
}
