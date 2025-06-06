import { Grid, Typography } from "@mui/material";
import { formatTimeString } from "../utils/utils";

const GameTracker = ({ score, elapsedTime }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} textAlign={"right"}>
          <Typography
            variant="body1"
            aria-label="Score"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            Score:
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign={"left"}>
          <Typography variant="body1" sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>
            {score}
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <Typography
            variant="body1"
            aria-label="ElaspedTime"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            Timer:{" "}
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign={"left"}>
          <Typography variant="body1" sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>
            {formatTimeString(parseInt(elapsedTime))}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default GameTracker;
