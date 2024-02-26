import { useState } from "react"
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material"

const StartPage = ({ onStart, setHardMode, setGenerations }) => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [hardMode, setHardModeLocal] = useState(false)

  const handleStartClick = () => {
    setIsGameStarted(true)
    onStart(hardMode) 
  }

  const handleHardModeChange = (event) => {
    setHardModeLocal(event.target.checked)
    setHardMode(event.target.checked) 
  }

  const handleGenerationChange = (event) => {
    if (event.target.checked) {
      setGenerations(prevValue => prevValue + parseInt(event.target.value))
    } else {
      setGenerations(prevValue => prevValue - parseInt(event.target.value))
    }
    
  }

  if (isGameStarted) {
    return null 
  }

  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox value="1" onChange={handleGenerationChange} />}
          label="Generation 1"
        />
        </Grid>
        <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox value="10" onChange={handleGenerationChange} />}
          label="Generation 2"
        />
        </Grid>
        <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox value="100" onChange={handleGenerationChange} />}
          label="Generation 3"
        />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleStartClick}>
            Start Game
          </Button>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={hardMode} onChange={handleHardModeChange} />}
            label="Hard Mode"
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default StartPage