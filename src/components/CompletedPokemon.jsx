import { Paper, Stack } from "@mui/material";

const CompletedPokemon = ({ guesses, data, isCorrect }) => {
  const filteredData = data.filter((item) => guesses[item.name] === isCorrect);

  return (
    <div style={{ justifyContent: "center", alignItems: "center", maxWidth: "100%"}}>
      {filteredData.length > 0 && (
        <>
          <span
            role="img"
            aria-label={isCorrect ? "checkmark" : "cross"}
            style={{ fontSize: "2rem", position: "relative", top: "-1em" }}
          >
            {isCorrect ? "✅" : "❌"}
          </span>
          <Paper
            sx={{
              margin: "5px",
              border: isCorrect ? "3px solid #5DA746" : "3px solid #BA0C0C",
              padding: "5px",
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "80%"
            }}
          >
            {filteredData.map((item) => (
              <Stack key={item.name} sx={{ margin: "5px", width: "49px" }}>
                <img src={item.image} alt={item.name} style={{ margin: "1px"}} />
              </Stack>
            ))}
          </Paper>
        </>
      )}
    </div>
  );
};

export default CompletedPokemon;
