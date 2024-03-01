import { useState } from 'react'
import './App.css'
import Start from './Components/Start'
import Game from './Components/Game'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

// AGREGO RAMA DEVELOP PARA REALIZAR MEJORAS Y ACTUALIZACIONES DEL JUEGO

function App () {
  // Para iniciar el juego
  const [inGame, setInGame] = useState(false)

  const startGame = () => {
    setInGame(true) // Para iniciar el juego
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        {inGame
          ? (

            <Game />

            )
          : (<Start startGame={startGame} />)}
      </div>
    </QueryClientProvider>
  )
}

export default App
