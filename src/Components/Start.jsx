const Start = ({ startGame }) => {
  const handleClick = () => {
    startGame()
  }
  return (
    <>
      <h1>Bienvenidos</h1>
      <img src='https://i.blogs.es/82d7ef/pokemon/1366_2000.jpeg' alt='' />
      <p>El juego es simple, consiste en adivinar el nombre del pokemon de la imagen.</p>
      <button className='start-game' onClick={handleClick}>Comenzar Juego</button>
    </>
  )
}

export default Start
