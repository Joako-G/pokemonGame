import { useState } from 'react'
import './App.css'
import Start from './Components/Start'
import Game from './Components/Game'

function App () {
  // Para iniciar el juego
  const [inGame, setInGame] = useState(false)

  const startGame = () => {
    setInGame(true)
  }

  return (
    <>
      <div className='App'>
        {inGame
          ? (<Game />)
          : (<Start startGame={startGame} />)}
      </div>
    </>
  )
}

export default App
