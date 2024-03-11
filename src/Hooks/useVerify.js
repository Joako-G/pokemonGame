import { useState } from 'react'

export function useVerify () {
  const [guessedPokemon, setGuessedPokemon] = useState(null)
  const [guessedAmount, setGuessedAmount] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [siguiente, setSiguiente] = useState(false)

  const checkName = (name, pokemon, pokemonsList, index) => {
    if (index === pokemonsList.length - 1) {
      setGameOver(true)
    }

    setGuessedPokemon(pokemon.name)

    if (name === pokemon.name) {
      const newGuessedAmount = guessedAmount + 1
      setGuessedAmount(newGuessedAmount)
      console.log('CORRECT')
    }

    setSiguiente(true)
  }

  const continueGame = (refreshIndex) => {
    setGuessedPokemon(null)
    setSiguiente(false)
    refreshIndex()
  }

  const nextGame = (refreshIndex, refreshPokemons, nextPage) => {
    setGameOver(false)
    setGuessedPokemon(null)
    setSiguiente(false)
    refreshPokemons(nextPage)
    refreshIndex()
    setGuessedAmount(0)
  }

  return { guessedPokemon, guessedAmount, gameOver, siguiente, checkName, continueGame, nextGame }
}
