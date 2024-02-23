const WinnerModal = ({ guessedAmount, restartGame, gameOver }) => {
  if (gameOver === false) return null

  const handleClick = () => {
    restartGame()
  }

  return (

    <section className='winner'>
      <div className='text'>
        <h2> Game Over</h2>
        <header className='win'> Acertaste {guessedAmount} pokemon </header>
        <footer>
          <button className='siguiente' onClick={handleClick}>Siguiente Nivel</button>
        </footer>
      </div>
    </section>

  )
}

export default WinnerModal
