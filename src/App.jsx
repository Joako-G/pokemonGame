import { useEffect, useState } from 'react'
import './App.css'
import { getPokemon, getPokemons } from './servie'
import PokemonList from './Components/PokemonList'
import Start from './Components/Start'
import { getRandomNum } from './Logic/RamdomNum'
import { mezclarPokemons } from './Logic/MixPokemon'

// AGREGO RAMA DEVELOP PARA REALIZAR MEJORAS Y ACTUALIZACIONES DEL JUEGO

function App () {
  // Para almacenar el nombre del pokemon a adivinar
  const [pokemon, setPokemon] = useState(null)
  const [imgPokemonSelect, setImgPokemonSelect] = useState('')

  // Para guardar todos los pokemons de la API
  const [pokemons, setPokemons] = useState([])
  const [index, setIndex] = useState(0)

  // Pokemons para el juego
  const [pokemonsIngGame, setPokemonsInGame] = useState([])

  // Para iniciar el juego
  const [inGame, setInGame] = useState(false)
  const [continuee, setContinue] = useState(false)
  const [guessedPokemon, setGuessedPokemon] = useState(null)

  // INICIO DEL JUEGO
  /* En esta parte se llama a la API para traer una lista de pokemon */
  useEffect(() => {
    getPokemons()
      .then(data => {
        setPokemons(data.results)
        // setPokemon(data.results[index])
      })
      .catch(err => console.log('Error', err))
  }, [])

  // LOGICA DEL JUEGO

  /*
    Agrego el pokemon a una lista y completo con 4 pokemons mas,
    luego mezclo la lista anterior para mostrar las opciones al jugador
    No hay pokemons repetidos
  */
  const mixPokenon = (pokemon) => {
    const uniquePokemons = new Set()
    uniquePokemons.add(pokemon)

    while (uniquePokemons.size < 5) {
      const randomIndex = getRandomNum(pokemons.length)
      uniquePokemons.add(pokemons[randomIndex])
    }

    const array = mezclarPokemons(Array.from(uniquePokemons))

    setPokemonsInGame(array)
  }

  /* Meotodo para obtener la imagen del pokemon a adivinar */
  const getImgPokemon = (p) => {
    getPokemon(p.url)
      .then(data => {
        setImgPokemonSelect(data.sprites.other.home.front_default)
      })
      .catch(err => console.log('Error', err))
  }

  /**
   * dsad
   */
  const startGame = () => {
    // MEZCLO EL ARRAY DE POKEMONS DE LA API
    const newArray = mezclarPokemons(pokemons)
    setPokemons(newArray)

    // SELECCIONO EL PRIMER POKEMON PARA ADIVINAR MENDIANTE LA VARIABLE INDEX
    const newPokemon = pokemons[index]
    setPokemon(newPokemon) // Pokemon a adivinar
    mixPokenon(newPokemon) // Mezclar la lista
    getImgPokemon(newPokemon) // Obtiene la imagen del pokemon
    setInGame(true) // Para iniciar el juego
  }

  /**
   * Funcion que verifica si el usuario adivino el nombre del pokemon.
   * Recibe por parametro el nombre del pokemon seleccionado por el
   * jugador
   * @param {*} name
   */
  const checkName = (name) => {
    setGuessedPokemon(pokemon.name)

    if (name === pokemon.name) {
      console.log('WINNER')
    }
    const newIndex = index + 1
    setIndex((prev) => prev + 1)
    setContinue(true)
    const newPokemon = pokemons[newIndex]
    setPokemon(newPokemon)
  }

  /**
   * Metodo para pasar a la siguiente ronda
   */
  const continueGame = () => {
    getImgPokemon(pokemon)
    setGuessedPokemon(null)
    mixPokenon(pokemon)
    setContinue(false)
  }

  return (
    <>
      {inGame
        ? (
          <>
            <div>
              <img className='pokemon' src={imgPokemonSelect} />
            </div>
            <PokemonList pokemons={pokemonsIngGame} checkName={checkName} guessedPokemon={guessedPokemon} />
          </>
          )
        : (<Start startGame={startGame} />)}
      {
        continuee ? (<button onClick={continueGame}> continuar</button>) : (<></>)
      }
    </>
  )
}

export default App
