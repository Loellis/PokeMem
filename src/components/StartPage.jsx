import { useState } from "react";
import { Button, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";

const StartPage = ({ onStart, setHardMode }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [hardMode, setHardModeLocal] = useState(false);

  const handleStartClick = () => {
    setIsGameStarted(true);
    onStart(hardMode); // Pass hardMode state to parent component
  };

  const handleHardModeChange = (event) => {
    setHardModeLocal(event.target.checked);
    setHardMode(event.target.checked); // Pass hardMode state to parent component
  };

  if (isGameStarted) {
    return null; // Hide the start page when the game is started
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          Pokémon Name Guessing Game
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox checked={hardMode} onChange={handleHardModeChange} />}
          label="Hard Mode: Hide Pokémon Silhouettes"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleStartClick}>
          Start Game
        </Button>
      </Grid>
    </Grid>
  );
};

export default StartPage;