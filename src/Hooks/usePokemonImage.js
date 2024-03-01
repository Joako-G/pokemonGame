import { useEffect, useState } from 'react'
import { getPokemon } from '../servie'

export function usePokemonImage ({ pokemons }) {
  const [imgPokemon, setImgPokemon] = useState('') // Imagen del pokemon
  const [pokemon, setPokemon] = useState({})
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!pokemons[index]) return

    const newPokemon = pokemons[index]
    setPokemon(newPokemon)

    getPokemon(newPokemon.url)
      .then(data => {
        setImgPokemon(data.sprites.other.home.front_default)
      })
      .catch(err => console.log('Error: ', err))

    setPokemon(newPokemon)
  }, [pokemons, index])

  const refreshIndex = () => {
    if (index < pokemons.length - 1) {
      setIndex(index + 1)
    } else setIndex(0)
  }

  return { imgPokemon, pokemon, refreshIndex, index }
}
