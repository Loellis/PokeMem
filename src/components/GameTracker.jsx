import { Grid, Typography } from "@mui/material";
import { formatTimeString } from "../utils/utils";

const GameTracker = ({ score, elapsedTime }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} textAlign={"right"}>
          <Typography variant="h4" aria-label="Score">
            Score:
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign={"left"}>
          <Typography variant="h4">{score}</Typography>
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <Typography variant="h4" aria-label="ElaspedTime">
            Timer:{" "}
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign={"left"}>
          <Typography variant="h4">{formatTimeString(parseInt(elapsedTime))}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default GameTracker;
