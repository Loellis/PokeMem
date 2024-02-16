import { useEffect, useRef, useState } from "react"
import { Grid, TextField, Typography } from "@mui/material"
import { data } from "../assets/pokemonData"
import { isGuessCloseEnough } from "../utils/utils"
import CompletedPokemon from "./CompletedPokemon"

const PokemonTable = () => {
  const [guesses, setGuesses] = useState({});
  const [current, setCurrent] = useState(0)
  const topTextFieldRef = useRef(null)

  useEffect(() => {
    if (topTextFieldRef.current) {
      topTextFieldRef.current.focus()
    }
  }, [guesses])

  const handleGuess = (name, event) => {
    const { value } = event.target
    console.log(name)
    setGuesses(prevGuesses => ({
      ...prevGuesses, 
      [name]: isGuessCloseEnough(value.trim().toLowerCase(), name.toLowerCase())
    }))
    setCurrent(current + 1)
  }

  return (
    <>
    <CompletedPokemon guesses={guesses} data={data}/>
    <Grid container justifyContent="center" alignItems="center">
      {data.map((item, index) => (
        <Grid item sm={12} key={item.name} textAlign="center">
          {guesses[item.name] === undefined && index === current && (
            <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
              <img src={item.imageSil} alt={item.label} />
            </div>
            </>
          )}
          {guesses[item.name] === undefined && index !== current && (
            <>
              <img src={item.imageSil} alt={item.label} />
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
  </>
  )
}

export default PokemonTable