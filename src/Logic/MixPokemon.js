/**
 * Metodo utilizado para mezclar una lista
 * @param {*} array
 * @returns Una lista mezclada
 */
export const mezclarPokemons = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
