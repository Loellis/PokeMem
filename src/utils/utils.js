const calculateLevenshteinDistance = (s1, s2) => {
  if (!s1.length) return s2.length
  if (!s2.length) return s1.length

  const matrix = [];

  for(let i = 0; i <= s2.length; i++) {
    matrix[i] = [i]
    for (let j = 1; j <= s1.length; j++ ) {
      matrix[i][j] =
        i === 0
          ? j
          : Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + (s1[j - 1] === s2[i - 1] ? 0 : 1)
          )
    }
  }
  return matrix[s2.length][s1.length];
}

const isGuessCloseEnough = (guess, correctAnswer) => {
  const threshold = 2
  if (correctAnswer.toLowerCase().includes("nidoran"))
    correctAnswer = "nidoran"
  return calculateLevenshteinDistance(guess.toLowerCase(), correctAnswer.toLowerCase()) < threshold
}

const formatTimeString = (seconds) => {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return (min)? `${min} min and ${sec} seconds` : `${sec} seconds`
}

export { isGuessCloseEnough, formatTimeString }