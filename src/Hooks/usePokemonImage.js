import { useEffect, useState } from 'react'
import { getPokemon } from '../servie'

export function usePokemonImage ({ pokemons }) {
  const [pokemon, setPokemon] = useState({})
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!pokemons[index]) return

    getPokemon(pokemons[index].url)
      .then(data => {
        const newPokemon = data
        setPokemon(newPokemon)
      })
      .catch(err => console.log('Error: ', err))
  }, [pokemons, index])

  const refreshIndex = () => {
    if (index < pokemons.length - 1) {
      setIndex(index + 1)
    } else setIndex(0)
  }

  return { pokemon, refreshIndex, index }
}
