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
  const [hardMode, setHardMode] = useState(false)
  const timeRef = useRef(null)

  useEffect(() => {
    if (gameStarted) {
      timeRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(timeRef.current)
    }

    return () => clearInterval(timeRef.current)
  }, [gameStarted])

  const handleStart = (isHardMode) => {
    setGameStarted(true)
    setHardMode(isHardMode)
  }

  return (
    <>
    <Header />
    <Grid container direction="column"  style={{ minHeight: "90vh" }} >
      {!gameStarted && (
        <StartPage onStart={handleStart} setHardMode={setHardMode}/>
      )}
      {gameStarted && (
        <>
          <Grid item>
            <GameTracker score={score} elapsedTime={elapsedTime} />
          </Grid>
          <Grid item>
            <PokemonTable setScore={setScore} hardMode={hardMode} />
          </Grid>
        </>
      )}
    </Grid>
    </>
  )
}

export default App
