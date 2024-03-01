import { useEffect, useState } from 'react'
import { getPokemons } from '../servie'
import { mixPokemons } from '../Logic/MixPokemon'

export function usePokemons () {
  const [pokemonsList, setPokemonsList] = useState([])
  const [amount, setAmount] = useState()
  const [nextPage, setNextPage] = useState('')

  const refreshPokemons = (currentPage = 'https://pokeapi.co/api/v2/pokemon') => {
    if (!pokemonsList) return
    getPokemons(currentPage)
      .then(data => {
        const newList = mixPokemons(data.results)
        setPokemonsList(newList)
        setAmount(newList.length)
        setNextPage(data.next)
      })
      .catch(err => console.log('Error: ', err))
  }

  const refreshAmount = () => {
    setAmount(amount - 1)
  }

  useEffect(refreshPokemons, [])
  return { pokemonsList, amount, nextPage, refreshPokemons, refreshAmount }
}
