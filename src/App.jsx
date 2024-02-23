import { useEffect, useState } from 'react'
import './App.css'
import { getPokemons } from './servie'
import Start from './Components/Start'
import { mezclarPokemons } from './Logic/MixPokemon'
import Game from './Components/Game'

// AGREGO RAMA DEVELOP PARA REALIZAR MEJORAS Y ACTUALIZACIONES DEL JUEGO

function App () {
  // Para guardar todos los pokemons de la API
  const [pokemons, setPokemons] = useState([])
  const [datos, setDatos] = useState({})

  // Para iniciar el juego
  const [inGame, setInGame] = useState(false)

  // INICIO DEL JUEGO
  /* En esta parte se llama a la API para traer una lista de pokemon */
  useEffect(() => {
    getPokemons()
      .then(data => {
        setPokemons(data.results)
        setDatos(data)
      }
      )
      .catch(err => console.log('Error', err))
  }, [])

  /**
   * dsad
   */
  const startGame = () => {
    // MEZCLO EL ARRAY DE POKEMONS DE LA API
    const newArray = mezclarPokemons(pokemons)
    setPokemons(newArray)
    setInGame(true) // Para iniciar el juego
  }

  return (
    <div className='App'>
      {inGame
        ? (<Game pokemons={pokemons} data={datos} setDatos={setDatos} />
          )
        : (<Start startGame={startGame} />)}
    </div>
  )
}

export default App
