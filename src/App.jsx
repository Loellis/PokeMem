import { Grid } from "@mui/material"
import PokemonTable from "./components/PokemonTable"
import Header from "./components/Header"
import "./App.css"

function App() {
  return (
    <>
    <Header />
    <Grid container direction="column"  style={{ minHeight: "90vh" }} >
      <Grid item>
        <PokemonTable />
      </Grid>
    </Grid>
    </>
  )
}

export default App
