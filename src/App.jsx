import { Grid } from "@mui/material"
import PokemonTable from "./components/PokemonTable"
import Header from "./components/Header"
import "./App.css"
import GameTracker from "./components/GameTracker"
import { useState, useRef, useEffect } from "react"
import StartPage from "./components/StartPage"

function App() {
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [finished, setFinished] = useState(false)
  const [hardMode, setHardMode] = useState(false)
  const timeRef = useRef(null)

  useEffect(() => {
    if (gameStarted && !finished) {
      timeRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(timeRef.current)
    }

    return () => clearInterval(timeRef.current)
  }, [gameStarted, finished])

  const handleStart = (isHardMode) => {
    setGameStarted(true)
    setHardMode(isHardMode)
  }

  return (
    <>
    <Header gameStarted={gameStarted} />
    <Grid container direction="column"  style={{ minHeight: "90vh" }} >
      {!gameStarted && (
        <StartPage onStart={handleStart} setHardMode={setHardMode}/>
      )}
      {gameStarted && (
        <>
          {!finished && (
            <Grid item>
              <GameTracker score={score} elapsedTime={elapsedTime} />
            </Grid>
          )}
          <Grid item>
            <PokemonTable score={score} setScore={setScore} elapsedTime={elapsedTime} hardMode={hardMode} setFinished={setFinished} />
          </Grid>
        </>
      )}
    </Grid>
    </>
  )
}

export default App
