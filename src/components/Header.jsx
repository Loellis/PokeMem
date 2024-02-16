import { Grid } from "@mui/material"

const Header = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item textAlign="center">
        <img src="banner.png" alt="Image of a the text who's that pokemon in the pokemon font" width="65%"/>
      </Grid>
    </Grid>
  )
}

export default Header