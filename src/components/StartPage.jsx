import { useState } from "react"
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material"

const StartPage = ({ onStart, setHardMode }) => {
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

  if (isGameStarted) {
    return null 
  }

  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
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