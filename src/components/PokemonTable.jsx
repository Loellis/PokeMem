import { useState } from "react"
import { Grid, TextField, Typography } from "@mui/material"
import { data } from "../assets/pokemonData"
import { isGuessCloseEnough } from "../utils/utils"
import CompletedPokemon from "./CompletedPokemon"

const PokemonTable = ({ setScore, hardMode }) => {
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
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} >
        <CompletedPokemon guesses={guesses} data={data} isCorrect={true} />
      </Grid>
      <Grid item xs={6} >
      {data.slice(0, Math.min(data.length, current + windowSize)).map((item, index) => (
        <Grid item sm={12} key={item.name} textAlign="center" className="pokemon-item" style={{ opacity: 1 - Math.min(Math.abs(index - current) / (windowSize), 1) }}>
          {guesses[item.name] === undefined && index === current && (
            <div className="pokemon-item focused" >
              <Typography pr={2} pt={0.5} variant="h4">#{index + 1}</Typography>
              <TextField
                margin="dense"
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
      </Grid>
      <Grid item xs={3} >
        <CompletedPokemon guesses={guesses} data={data} isCorrect={false} />
      </Grid>
    </Grid>
  )
}

export default PokemonTable