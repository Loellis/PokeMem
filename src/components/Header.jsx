import { Grid } from "@mui/material"

const Header = ({ gameStarted }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item textAlign="center">
        <img 
          src="banner.png" 
          alt="Image of a the text who's that pokemon in the pokemon font" 
          width={!gameStarted ? "100%" : "65%"}
          className={!gameStarted ? "wiggle-image" : ""}
        />
      </Grid>
    </Grid>
  )
}

export default Header