import { Grid } from "@mui/material"
import PokemonTable from "./components/PokemonTable"
import Header from "./components/Header"
import "./App.css"
import GameTracker from "./components/GameTracker"
import { useState, useRef, useEffect, useMemo } from "react"
import StartPage from "./components/StartPage"
import { genI, genII, genIII } from "./assets/pokemonData"

function App() {
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [finished, setFinished] = useState(false)
  const [hardMode, setHardMode] = useState(false)
  const [generations, setGenerations] = useState(0)
  const timeRef = useRef(null)

  const data = useMemo(() => {
    console.log(generations)
    const selectedData = []
    if (generations === 111) {
      selectedData.push(genI, genII, genIII)
    } else if (generations === 11) {
      selectedData.push(genI, genII)
    } else if (generations === 101) {
      selectedData.push(genI, genIII)
    } else if (generations === 110) {
      selectedData.push(genII, genIII)
    } else if (generations === 100) {
      selectedData.push(genIII)
    } else if (generations === 10) {
      selectedData.push(genII)
    } else if (generations === 1) {
      selectedData.push(genI)
    } else {
      selectedData.push(genI)
    }
    return [].concat(...selectedData)
  }, [generations])
  

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
        <StartPage onStart={handleStart} setHardMode={setHardMode} setGenerations={setGenerations}/>
      )}
      {gameStarted && (
        <>
          {!finished && (
            <Grid item>
              <GameTracker score={score} elapsedTime={elapsedTime} />
            </Grid>
          )}
          <Grid item>
            <PokemonTable score={score} setScore={setScore} elapsedTime={elapsedTime} hardMode={hardMode} setFinished={setFinished} data={data} />
          </Grid>
        </>
      )}
    </Grid>
    </>
  )
}

export default App
