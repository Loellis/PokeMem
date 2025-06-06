import { useState } from "react";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";

const StartPage = ({ onStart }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [hardMode, setHardModeLocal] = useState(false);
  const [generations, setGenerationsLocal] = useState(0);

  const handleStartClick = () => {
    setIsGameStarted(true);
    onStart(hardMode, generations);
  };

  const handleHardModeChange = (event) => {
    setHardModeLocal(event.target.checked);
  };

  const handleGenerationChange = (event) => {
    const value = parseInt(event.target.value);
    setGenerationsLocal((prev) => (event.target.checked ? prev + value : prev - value));
  };

  if (isGameStarted) {
    return null;
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
  );
};

export default StartPage;
