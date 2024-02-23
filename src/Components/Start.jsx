const Start = ({ startGame }) => {
  const handleClick = () => {
    startGame()
  }
  return (
    <div className='start-game'>
      <h1 className='title'>Bienvenidos</h1>
      <img className='image' src='https://i.blogs.es/82d7ef/pokemon/1366_2000.jpeg' alt='' />
      <p>El juego es simple, consiste en adivinar el nombre del pokemon de la imagen.</p>
      <button className='start' onClick={handleClick}>Comenzar Juego</button>
    </div>
  )
}

export default Start
