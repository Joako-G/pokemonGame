import { useEffect, useState } from 'react'
import PokemonList from './PokemonList'
import WinnerModal from './WinnerModal'
import { usePokemons } from '../Hooks/usePokemons'
import { mixPokemonsInGame } from '../Logic/MixPokemonInGame'
import { usePokemonImage } from '../Hooks/usePokemonImage'

const Game = () => {
  const [pokemonsIngGame, setPokemonsInGame] = useState([]) // Lista de pokemons para el juego(4)
  const [guessedPokemon, setGuessedPokemon] = useState(null) // Pokemon elegido por el jugador

  const [guessedAmount, setGuessedAmount] = useState(0)
  const [siguiente, setSiguiente] = useState(false)

  const [gameOver, setGameOver] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  /* NUEVO CODIGO */
  const { pokemonsList, amount, nextPage, refreshPokemons, refreshAmount } = usePokemons()

  const { imgPokemon, pokemon, refreshIndex, index } = usePokemonImage({ pokemons: pokemonsList })

  useEffect(() => {
    setIsLoading(true)

    if (pokemonsList && pokemonsList.length > 0 && pokemon) {
      const newList = mixPokemonsInGame(pokemon, pokemonsList)
      setPokemonsInGame(newList)
    }
  }, [pokemonsList, pokemon])

  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 800)
      return () => clearInterval(timer)
    }
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameOver, isLoading])

  /**
   * Funcion que verifica si el usuario adivino el nombre del pokemon.
   * Recibe por parametro el nombre del pokemon seleccionado por el
   * jugador
   * @param {*} name
   */
  const checkName = (name) => {
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

  /**
   * Metodo para pasar a la siguiente ronda
   */
  const continueGame = () => {
    setGuessedPokemon(null)
    setSiguiente(false)

    refreshAmount()
    refreshIndex()
  }

  const nextGame = () => {
    setGameOver(false)
    setGuessedPokemon(null)
    setSiguiente(false)
    setShowModal(false)
    refreshPokemons(nextPage)
    refreshIndex()
    setGuessedAmount(0)
  }

  return (
    <div className='game'>
      <h4>Faltan: {amount} </h4>
      <div className='img-pokemon'>
        {isLoading && (<h1>Cargando imagen</h1>)}
        {!isLoading && (<img src={imgPokemon} alt='Image de pokemon' />)}
      </div>
      <PokemonList pokemonsInGame={pokemonsIngGame} checkName={checkName} guessedPokemon={guessedPokemon} />
      {
        siguiente && !gameOver && (<button className='siguiente' onClick={continueGame}> Continuar </button>)
      }
      {
        gameOver && showModal && (<WinnerModal guessedAmount={guessedAmount} restartGame={nextGame} gameOver={gameOver} />)
      }
    </div>
  )
}

export default Game
