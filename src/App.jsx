import { useEffect, useState } from 'react'
import './App.css'
import { getPokemon, getPokemons } from './servie'
import PokemonList from './Components/PokemonList'
import Start from './Components/Start'

// AGREGO RAMA DEVELOP PARA REALIZAR MEJORAS Y ACTUALIZACIONES DEL JUEGO

const getRandomNum = (max) => {
  if (max > 0) {
    return Math.floor(Math.random() * max)
  }

  return null
}

function App () {
  // Para almacenar el nombre del pokemon a adivinar
  const [pokemon, setPokemon] = useState(null)
  const [imgPokemonSelect, setImgPokemonSelect] = useState('')

  // Para guardar todos los pokemons de la API
  const [pokemons, setPokemons] = useState([])

  // Array para almacenar los pokemons elegidos para adivinar
  const [pokemonSelected, setPokemonSelected] = useState([])

  // Pokemons para el juego
  const [pokemonsIngGame, setPokemonsInGame] = useState([])

  // Para iniciar el juego
  const [inGame, setInGame] = useState(false)
  const [continuee, setContinue] = useState(false)
  const [guessedPokemon, setGuessedPokemon] = useState('')

  // INICIO DEL JUEGO
  useEffect(() => {
    getPokemons()
      .then(data => {
        setPokemons(data.results)
        setPokemon(data.results[getRandomNum(data.results.length)])
      })
      .catch(err => console.log('Error', err))
  }, [])

  // LOGICA DEL JUEGO

  // Agrego pokemons a una lista que sera mostrada en pantalla
  // Despues mezclo el arreglo para cambiar el orden de los pokemons
  const mixPokenon = (pokemon) => {
    const uniquePokemons = new Set()
    uniquePokemons.add(pokemon)

    while (uniquePokemons.size < 5) {
      const randomIndex = getRandomNum(pokemons.length)
      uniquePokemons.add(pokemons[randomIndex])
    }
    const array = Array.from(uniquePokemons)
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }

    setPokemonsInGame(array)
    /* const aux = [pokemon]
    for (let i = 1; i < 5; i++) {
      let p = pokemons[getRandomNum(pokemons.length)]
      if (aux.length > 0) {
        for (let j = 0; j <= aux.length - 1; j++) {
          if (aux[j].name === p.name || aux[j] === pokemon.name) {
            j = 0
            p = pokemons[getRandomNum(pokemons.length)]
          }
        }
      }
      aux[i] = p
    }

    for (let i = aux.length - 1; i > 2; i--) {
      const ramdom = getRandomNum(aux.length)
      const actual = aux[i]
      if (aux[ramdom].name !== actual.name) {
        aux[i] = aux[ramdom]
        aux[ramdom] = actual
      }
    }

    setPokemonsInGame(aux) */
  }

  const startGame = () => {
    // Agrego pokemon a una lista para despues no volver a elegirlo
    setPokemonSelected(pokemon)
    setInGame(true)
    mixPokenon(pokemon)
    getImgPokemon(pokemon)
  }

  const getImgPokemon = (p) => {
    getPokemon(p.url)
      .then(data => {
        setImgPokemonSelect(data.sprites.other.home.front_default)
      })
      .catch(err => console.log('Error', err))
  }

  const checkName = (name) => {
    if (name === pokemon.name) {
      console.log('WINNER')
      setGuessedPokemon(pokemon.name)
      setContinue(true)
      const newPokemon = pokemons[getRandomNum(pokemons.length)]
      setPokemon(newPokemon)
    }
  }

  const continueGame = () => {
    getImgPokemon(pokemon)
    setGuessedPokemon('')
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
