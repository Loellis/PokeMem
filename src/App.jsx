import { Grid } from "@mui/material"
import PokemonTable from "./components/PokemonTable"
import Header from "./components/Header"

function App() {
  return (
    <>
    <Header />
    <Grid container direction="column"  style={{ minHeight: "90vh", width: "75%"}} display="inline">
      <Grid item>
        <PokemonTable style={{ width: "80%" }}/>
      </Grid>
    </Grid>
    </>
  )
}

export default App
