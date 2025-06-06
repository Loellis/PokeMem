import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // if using routing

const Header = ({ gameStarted }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // remove if not using react-router

  const handleImageClick = () => {
    if (gameStarted) {
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    // Replace this with your own reset logic if you're not using routing
    navigate("/");
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item textAlign="center">
          <img
            src="/banner.png"
            alt="Image of the text 'Who's that Pokémon' in the Pokémon font"
            width={!gameStarted ? "100%" : "65%"}
            className={!gameStarted ? "wiggle-image" : ""}
            style={{ cursor: gameStarted ? "pointer" : "default" }}
            onClick={handleImageClick}
          />
        </Grid>
      </Grid>

      <Dialog open={showModal} onClose={handleCancel}>
        <DialogTitle>Return to Start?</DialogTitle>
        <DialogContent sx={{ fontFamily: "PokemonPixel", fontSize: "1rem" }}>
          Do you really want to return to the home screen? Your current progress will be lost.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error">
            Yes, return
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
