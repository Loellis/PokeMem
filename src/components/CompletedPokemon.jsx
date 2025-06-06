import { Paper } from "@mui/material";
import { useState, useEffect } from "react";

const CompletedPokemon = ({ guesses, data, isCorrect }) => {
  const [filteredData, setFilteredData] = useState([]);
  const columns = 4; // keep layout consistent at 4 Pokémon per row
  const maxRows = 8; // show up to 8 rows before scrolling
  const containerHeight = 59 * maxRows; // 49px image + ~10px gap

  useEffect(() => {
    const newFilteredData = data.filter((item) => {
      const guess = guesses[item.name];
      if (!guess) return false;

      if (isCorrect) {
        return guess.correct === true;
      } else {
        return guess.correct === false && guess.strikes >= 3;
      }
    });

    setFilteredData(newFilteredData);
  }, [data, guesses, isCorrect]);

  return (
    <div style={{ justifyContent: "center", alignItems: "center", maxWidth: "100%" }}>
      {filteredData.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: isCorrect ? "row" : "row-reverse",
          }}
        >
          <span
            role="img"
            aria-label={isCorrect ? "checkmark" : "cross"}
            style={{ fontSize: "2rem", margin: isCorrect ? "0 8px 0 0" : "0 0 0 8px" }}
          >
            {isCorrect ? "✅" : "❌"}
          </span>
          <Paper
            sx={{
              margin: "5px",
              border: `3px solid ${isCorrect ? "#5DA746" : "#BA0C0C"}`,
              padding: "5px",
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 49px)`,
              justifyContent: "center",
              gap: "10px 10px",
              maxWidth: "80%",
              maxHeight: `${containerHeight}px`,
              overflowY: "auto",
              // Use overlay scrollbar where supported so width doesn't change
              scrollbarGutter: "stable", // keeps space for scrollbar preventing reflow
            }}
          >
            {filteredData.map((item) => (
              <img
                key={item.name}
                src={item.image.startsWith("/") ? item.image : `/${item.image}`}
                alt={item.name}
                style={{ width: "49px", height: "49px" }}
              />
            ))}
          </Paper>
        </div>
      )}
    </div>
  );
};

export default CompletedPokemon;
