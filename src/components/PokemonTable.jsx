import { useState } from "react"
import { Grid, TextField, Typography, Box } from "@mui/material"
import { data } from "../assets/pokemonData"
import { isGuessCloseEnough, formatTimeString } from "../utils/utils"
import CompletedPokemon from "./CompletedPokemon"

const PokemonTable = ({ score, setScore, hardMode, elapsedTime, setFinished }) => {
  const [guesses, setGuesses] = useState({})
  const [current, setCurrent] = useState(0)
  const windowSize = 5

  const handleGuess = (name, event) => {
    const { value } = event.target
    const isCorrect = isGuessCloseEnough(value.trim().toLowerCase(), name.toLowerCase())

    setGuesses(prevGuesses => ({
      ...prevGuesses, 
      [name]: isCorrect
    }))
    setCurrent(current + 1)

    if (isCorrect) {
      setScore(prevScore => hardMode ? prevScore + 2 : prevScore + 1)
    }

    if (current === 150) {
      setFinished(true)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} >
        <CompletedPokemon guesses={guesses} data={data} isCorrect={true} />
      </Grid>
      <Grid item xs={6} >
      {data.slice(0, Math.min(data.length, current + windowSize)).map((item, index) => (
        <Grid item sm={12} key={item.name} textAlign="center" className="pokemon-item" style={{ opacity: 1 - Math.min(Math.abs(index - current) / (windowSize), 1) }}>
          {guesses[item.name] === undefined && index === current && current !== 151 && (
            <div className="pokemon-item focused" >
              <Grid container spacing={0} direction="column" >
                <Grid item display="flex" justifyContent="center" alignItems="center">
                  <Typography pr={2} variant="h4">#{index + 1}</Typography>
                  <TextField
                    margin="normal"
                    autoFocus
                    style={{ width: "40%" }} 
                    label="Enter Pokémon Name" 
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGuess(item.name, e)
                      }
                    }} 
                  />
                  {!hardMode && <img src={item.imageSil} alt={item.name} />}
                </Grid>
                <Grid item>
                  {item.types && (
                    <Box mt={2} display="flex" justifyContent="center">
                      {item.types.map((type) => (
                        <img
                          key={type}
                          src={`/images/types/${type}.png`}
                          alt={type}
                          height="20px"
                          style={{ marginRight: "2px" }}
                        />
                      ))}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </div>
          )}
          {guesses[item.name] === undefined && index !== current && (
            <>
              {!hardMode && <img src={item.imageSil} alt={item.name} />}
              <TextField
                style={{ width: "60%" }} 
                label="Enter Pokémon Name" 
                margin="normal"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleGuess(item.name, e)
                  }
                }} 
              />
            </>
          )}
        </Grid>
      ))}
      {current === 151 && (
        <div className="end-game-score" style={{paddingTop: "5em"}}>
          <Typography variant="h3" sx={{ padding: "5px"}} >Your final score is {score}!</Typography>
          <Typography variant="h3" sx={{ padding: "5px"}} >With a time of: {formatTimeString(parseInt(elapsedTime))}</Typography>
        </div>
      )}
      </Grid>
      <Grid item xs={3} >
        <CompletedPokemon guesses={guesses} data={data} isCorrect={false} />
      </Grid>
    </Grid>
  )
}

export default PokemonTable