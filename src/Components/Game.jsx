import { useEffect, useState } from 'react'
import { getNextPage, getPokemon } from '../servie'
import { getRandomNum } from '../Logic/RamdomNum'
import { mezclarPokemons } from '../Logic/MixPokemon'
import PokemonList from './PokemonList'
import WinnerModal from './WinnerModal'

const Game = ({ pokemons, data, setDatos }) => {
  const { next, results } = data
  const [pokemonsList, setPokemonsList] = useState(results)

  const [index, setIndex] = useState(0) // Para recorrer la lista de pokemons de la API
  const [pokemon, setPokemon] = useState(null) // Pokemon para adivinar
  const [imgPokemon, setImgPokemon] = useState('') // Imagen del pokemon
  const [pokemonsIngGame, setPokemonsInGame] = useState([]) // Lista de pokemons para el juego(4)
  const [guessedPokemon, setGuessedPokemon] = useState(null) // Pokemon elegido por el jugador
  const [amount, setAmount] = useState(pokemons.length)
  const [guessedAmount, setGuessedAmount] = useState(0)
  const [siguiente, setSiguiente] = useState(false)

  const [gameOver, setGameOver] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const newPokemon = pokemonsList[index]
    setPokemon(newPokemon)
    mixPokenon(newPokemon)
    getPokemon(newPokemon.url)
      .then(data => {
        setImgPokemon(data.sprites.other.home.front_default)
      })
      .catch(err => console.log('Error', err))
  }, [index, pokemonsList])

  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 800)
      return () => clearInterval(timer)
    }
  }, [gameOver])

  /*
    Agrego el pokemon a una lista y completo con 4 pokemons mas,
    luego mezclo la lista anterior para mostrar las opciones al jugador
    No hay pokemons repetidos
  */
  const mixPokenon = (pokemon) => {
    const uniquePokemons = new Set()
    uniquePokemons.add(pokemon)

    while (uniquePokemons.size < 5) {
      const randomIndex = getRandomNum(pokemonsList.length)
      uniquePokemons.add(pokemonsList[randomIndex])
    }

    const array = mezclarPokemons(Array.from(uniquePokemons))

    setPokemonsInGame(array)
  }

  /**
   * Funcion que verifica si el usuario adivino el nombre del pokemon.
   * Recibe por parametro el nombre del pokemon seleccionado por el
   * jugador
   * @param {*} name
   */
  const checkName = (name) => {
    if (index === 10) {
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
    const newIndex = index + 1
    setIndex(newIndex)

    const newAmount = amount - 1
    setAmount(newAmount)
    setGuessedPokemon(null)
    setSiguiente(false)
  }

  const nextGame = () => {
    setGameOver(false)
    setGuessedPokemon(null)
    setSiguiente(false)
    setShowModal(false)
    setIndex(0)
    setGuessedAmount(0)

    getNextPage(next)
      .then(data => {
        const newList = mezclarPokemons(data.results)
        setPokemonsList(newList)
        const newAmount = data.results.length
        setAmount(newAmount)
        setDatos(data)
      })
      .catch(err => console.log('Error: ', err))
  }

  return (
    <div className='game'>
      <h4>Faltan: {amount} </h4>
      <div className='img-pokemon'>
        <img src={imgPokemon} alt='' />
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
