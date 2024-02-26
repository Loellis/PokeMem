import { Paper, Stack, Typography } from "@mui/material"
import { useState, useEffect } from "react"

const numberOfColumns = () => {
  const full_width = Math.min(1280, window.innerWidth)
  const sidebar_width = full_width/4
  const sidebar_adjusted = sidebar_width - 100
  const numOfCols = Math.floor(sidebar_adjusted / 49)

  return numOfCols
}

const CompletedPokemon = ({ guesses, data, isCorrect }) => {
  const [filteredData, setFilteredData] = useState([])
  const numColumns = numberOfColumns()
  const numRows = 7
  const itemsBeforeEllipse = numColumns * numRows - 1

  useEffect(() => {
    const newFilteredData = data.filter((item) => guesses[item.name] === isCorrect)

    if (newFilteredData.length > itemsBeforeEllipse) {
      setFilteredData(newFilteredData.slice(-itemsBeforeEllipse))
    } else {
      setFilteredData(newFilteredData)
    }
  }, [data, guesses, isCorrect, itemsBeforeEllipse])

  return (
    <div style={{ justifyContent: "center", alignItems: "center", maxWidth: "100%" }}>
      {filteredData.length > 0 && (
        <>
          <span
            role="img"
            aria-label={isCorrect ? "checkmark" : "cross"}
            style={{ fontSize: "2rem", position: "relative", top: filteredData.length === itemsBeforeEllipse ? 0 : "-1em" }}
          >
            {isCorrect ? "✅" : "❌"}
          </span>
          <Paper
            sx={{
              margin: "5px",
              border: `3px solid ${isCorrect ? "#5DA746" : "#BA0C0C"}`,
              padding: "5px",
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "80%",
              maxHeight: "55vh",
              overflow: "hidden"
            }}
          >
            {filteredData.length === itemsBeforeEllipse && (
              <Stack sx={{ margin: "5px", maxWidth: "49px" }}>
                <Typography fontSize="16px" fontWeight="bold" textAlign="center" width="49px">
                  . . .
                </Typography>
              </Stack>
            )}
            {filteredData.map((item) => (
              <Stack key={item.name} sx={{ margin: "5px", maxWidth: "49px" }}>
                <img src={item.image} alt={item.name} style={{ margin: "1px" }} />
              </Stack>
            ))}
          </Paper>
        </>
      )}
    </div>
  )
}

export default CompletedPokemon
