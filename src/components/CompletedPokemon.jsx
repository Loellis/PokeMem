import { Paper, Stack } from "@mui/material";

const CompletedPokemon = ({ guesses, data }) => {
  const correctGuesses = data.filter((item) => guesses[item.name] === true);
  const incorrectGuesses = data.filter((item) => guesses[item.name] === false);

  return (
    <div style={{ justifyContent: "center", alignItems: "center", textAlign: "center", maxWidth: "50%"}}>
      {correctGuesses.length > 0 && (
        <>
          <span role="img" aria-label="checkmark" style={{ fontSize: "2rem", position: "relative", top: "-1em"}}>✅</span>
          <Paper
            sx={{
              margin: "5px",
              marginRight: "25px",
              border: "3px solid #5DA746",
              padding: "5px",
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "37%",
            }}
          >
            {correctGuesses.map((item) => {
              return (
                <Stack key={item.name} sx={{ margin: "5px", width: "49px" }}>
                  <img src={item.image} alt={item.label} style={{ margin: "1px", width: "100%" }} />
                </Stack>
              );
            })}
          </Paper>
        </>
      )}

      {incorrectGuesses.length > 0 && (
        <>
          <span role="img" aria-label="cross" style={{ fontSize: "2rem", position: "relative", top: "-1em"}}>❌</span>
          <Paper
          sx={{
            margin: "5px",
            border: "3px solid #BA0C0C",
            padding: "5px",
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "37%"
          }}
        >
          {incorrectGuesses.map((item) => {
              return (
                <Stack key={item.name} sx={{ margin: "5px", width: "49px" }}>
                  <img src={item.image} alt={item.label} style={{ margin: "1px", width: "100%" }} />
                </Stack>
              );
            })}
        </Paper>
      </>
      )}
    </div>
  );
};

export default CompletedPokemon;
