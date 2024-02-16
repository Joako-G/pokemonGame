export const getRandomNum = (max) => {
  if (max > 0) {
    return Math.floor(Math.random() * max)
  }

  return null
}
