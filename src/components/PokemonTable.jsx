import { useState } from "react";
import { Grid, TextField, Typography, Box } from "@mui/material";
import { isGuessCloseEnough, formatTimeString } from "../utils/utils";
import CompletedPokemon from "./CompletedPokemon";

const PokemonTable = ({ score, setScore, hardMode, elapsedTime, setFinished, data }) => {
  const [guesses, setGuesses] = useState({}); // { [name]: { correct: boolean, strikes: number } }
  const [current, setCurrent] = useState(0);
  const windowSize = 5;

  const handleGuess = (name, event) => {
    const { value } = event.target;
    const guess = value.trim().toLowerCase();
    const isCorrect = isGuessCloseEnough(guess, name.toLowerCase());

    setGuesses((prev) => {
      const prevEntry = prev[name] || { correct: false, strikes: 0 };

      // Already guessed correctly or failed
      if (prevEntry.correct || prevEntry.strikes >= 3) return prev;

      if (isCorrect) {
        if (hardMode) setScore((s) => s + 2);
        else setScore((s) => s + 1);
        if (current === data.length - 1) setFinished(true);

        setCurrent((c) => c + 1);
        return {
          ...prev,
          [name]: { correct: true, strikes: prevEntry.strikes },
        };
      } else {
        const newStrikes = prevEntry.strikes + 1;
        if (newStrikes >= 3 && current === data.length - 1) setFinished(true);

        if (newStrikes >= 3) {
          setCurrent((c) => c + 1);
        }

        return {
          ...prev,
          [name]: { correct: false, strikes: newStrikes },
        };
      }
    });
  };

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={3}>
        <CompletedPokemon guesses={guesses} data={data} isCorrect={true} />
      </Grid>
      <Grid item xs={6}>
        {data.slice(0, Math.min(data.length, current + windowSize)).map((item, index) => (
          <Grid
            item
            sm={12}
            key={item.name}
            textAlign="center"
            className="pokemon-item"
            style={{ opacity: 1 - Math.min(Math.abs(index - current) / windowSize, 1) }}
          >
            {(!guesses[item.name] ||
              (!guesses[item.name].correct && guesses[item.name].strikes < 3)) &&
              index === current &&
              current !== data.length && (
                <div className="pokemon-item focused">
                  <Grid container spacing={0} direction="column">
                    <Grid item display="flex" justifyContent="center" alignItems="center">
                      <Typography pr={2} variant="h4">
                        #{index + 1}
                      </Typography>
                      <TextField
                        margin="normal"
                        autoFocus
                        style={{ width: "40%" }}
                        label="Enter Pokémon Name"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleGuess(item.name, e);
                          }
                        }}
                      />
                      {!hardMode && <img src={item.imageSil} alt={item.name} />}
                    </Grid>
                    <Grid>
                      <Box mt={1} display="flex" justifyContent="center">
                        {Array.from({ length: guesses[item.name]?.strikes || 0 }).map((_, i) => (
                          <Typography
                            key={i}
                            role="img"
                            aria-label="strike"
                            component="span"
                            sx={{ fontSize: "1.5rem", mx: 0.3 }}
                          >
                            ❌
                          </Typography>
                        ))}
                      </Box>
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
            {(!guesses[item.name] ||
              (!guesses[item.name].correct && guesses[item.name].strikes < 3)) &&
              index !== current && (
                <>
                  {!hardMode && <img src={item.imageSil} alt={item.name} />}
                  <TextField
                    style={{ width: "60%" }}
                    label="Enter Pokémon Name"
                    margin="normal"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGuess(item.name, e);
                      }
                    }}
                  />
                </>
              )}
          </Grid>
        ))}
        {current === data.length && (
          <div className="end-game-score" style={{ paddingTop: "5em" }}>
            <Typography variant="h3" sx={{ padding: "5px" }}>
              Your final score is {score}!
            </Typography>
            <Typography variant="h3" sx={{ padding: "5px" }}>
              With a time of: {formatTimeString(parseInt(elapsedTime))}
            </Typography>
          </div>
        )}
      </Grid>
      <Grid item xs={3}>
        <CompletedPokemon guesses={guesses} data={data} isCorrect={false} />
      </Grid>
    </Grid>
  );
};

export default PokemonTable;
