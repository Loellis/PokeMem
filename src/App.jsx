import { Grid } from "@mui/material";
import PokemonTable from "./components/PokemonTable";
import Header from "./components/Header";
import "./App.css";
import GameTracker from "./components/GameTracker";
import { useState, useRef, useEffect, useMemo } from "react";
import StartPage from "./components/StartPage";
import { genI, genII, genIII } from "./assets/pokemonData";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function Game() {
  const location = useLocation();
  const { hardMode = false, generations = 1 } = location.state || {};

  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const timeRef = useRef(null);

  const data = useMemo(() => {
    const selectedData = [];
    if (generations === 111) {
      selectedData.push(genI, genII, genIII);
    } else if (generations === 11) {
      selectedData.push(genI, genII);
    } else if (generations === 101) {
      selectedData.push(genI, genIII);
    } else if (generations === 110) {
      selectedData.push(genII, genIII);
    } else if (generations === 100) {
      selectedData.push(genIII);
    } else if (generations === 10) {
      selectedData.push(genII);
    } else if (generations === 1) {
      selectedData.push(genI);
    } else {
      selectedData.push(genI);
    }
    return [].concat(...selectedData);
  }, [generations]);

  useEffect(() => {
    if (!finished) {
      timeRef.current = window.setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      window.clearInterval(timeRef.current);
    }

    return () => window.clearInterval(timeRef.current);
  }, [finished]);

  return (
    <Grid container direction="column" style={{ minHeight: "90vh" }}>
      {!finished && (
        <Grid item>
          <GameTracker score={score} elapsedTime={elapsedTime} />
        </Grid>
      )}
      <Grid item>
        <PokemonTable
          score={score}
          setScore={setScore}
          elapsedTime={elapsedTime}
          hardMode={hardMode}
          setFinished={setFinished}
          data={data}
        />
      </Grid>
    </Grid>
  );
}

function App() {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = (isHardMode, gens) => {
    setGameStarted(true);
    navigate("/game", { state: { hardMode: isHardMode, generations: gens } });
  };

  return (
    <>
      <Header gameStarted={gameStarted} />
      <Routes>
        <Route
          path="/"
          element={
            <StartPage
              onStart={(isHardMode, gens) => handleStart(isHardMode, gens)}
              setHardMode={() => {}}
              setGenerations={() => {}}
            />
          }
        />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
