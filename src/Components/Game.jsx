import { useEffect, useState } from 'react'
import PokemonList from './PokemonList'
import WinnerModal from './WinnerModal'
import { usePokemons } from '../Hooks/usePokemons'
import { mixPokemonsInGame } from '../Logic/MixPokemonInGame'
import { usePokemonImage } from '../Hooks/usePokemonImage'
import { useVerify } from '../Hooks/useVerify'

// CRAEAR UN COMPONENTE LLAMADO MODAL EL CUAL CONTENDRA 2 COMPONENTES:
// COMPONENTE CONTINUEMODAL Y ENDGAMEMODAL

const Game = () => {
  const [pokemonsIngGame, setPokemonsInGame] = useState([]) // Lista de pokemons para el juego(4)

  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  /* NUEVO CODIGO */
  const { pokemonsList, nextPage, refreshPokemons } = usePokemons()
  const { pokemon, refreshIndex, index } = usePokemonImage({ pokemons: pokemonsList })
  const { guessedPokemon, guessedAmount, gameOver, siguiente, checkName, continueGame, nextGame } = useVerify()

  useEffect(() => {
    setIsLoading(true)
    if (pokemonsList && pokemonsList.length > 0) {
      const newList = mixPokemonsInGame(pokemon, pokemonsList)
      setPokemonsInGame(newList)
    }
  }, [pokemon])

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

  const verify = (name) => {
    checkName(name, pokemon, pokemonsList, index)
  }

  const restartGame = () => {
    nextGame(refreshIndex, refreshPokemons, nextPage)
    setShowModal(false)
  }

  return (
    <div className='game'>
      <h4>Faltan: {pokemonsList.length - index} </h4>
      <div className='img-pokemon'>
        {isLoading && (<h1>Cargando imagen</h1>)}
        {!isLoading && (<img src={pokemon.img} alt='Image de pokemon' />)}
      </div>
      <PokemonList pokemonsInGame={pokemonsIngGame} checkName={verify} guessedPokemon={guessedPokemon} />
      {
        siguiente && !gameOver && (<button className='siguiente' onClick={() => continueGame(refreshIndex)}> Continuar </button>)
      }
      {
        gameOver && showModal && (<WinnerModal guessedAmount={guessedAmount} restartGame={() => restartGame(refreshIndex, refreshPokemons, nextPage)} gameOver={gameOver} />)
      }
    </div>
  )
}

export default Game
