import { Grid, Box, Chip, SwipeableDrawer, useMediaQuery, Typography } from "@mui/material";
import { formatTimeString } from "../utils/utils";
import CompletedPokemon from "./CompletedPokemon";
import PokemonItem from "./PokemonItem";
import { usePokemonGame } from "../hooks/usePokemonGame";
import React from "react";

const windowSize = 5;

const PokemonTable = ({ score, setScore, hardMode, elapsedTime, setFinished, data }) => {
	const isSmallScreen = useMediaQuery("(max-width:600px)");
	const [drawerType, setDrawerType] = React.useState<"correct" | "incorrect" | null>(null);

	const { current, guesses, correctCount, incorrectCount, handleGuess } = usePokemonGame(
		data,
		hardMode,
		setScore,
		setFinished
	);

	return (
		<>
			{/* Mobile autocomplete datalist */}
			{isSmallScreen && (
				<datalist id="pokemon-options">
					{data.map((p) => (
						<option key={p.name} value={p.name} />
					))}
				</datalist>
			)}

			{/* Bottom drawer (mobile) */}
			{isSmallScreen && (
				<SwipeableDrawer
					anchor="bottom"
					open={!!drawerType}
					onClose={() => setDrawerType(null)}
					onOpen={() => {}}
				>
					<Box p={2} textAlign="center">
						{drawerType === "correct" && (
							<CompletedPokemon data={data} guesses={guesses} isCorrect />
						)}
						{drawerType === "incorrect" && (
							<CompletedPokemon data={data} guesses={guesses} isCorrect={false} />
						)}
					</Box>
				</SwipeableDrawer>
			)}

			<Grid container spacing={2}>
				{/* Left column – correct list */}
				<Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" }, mt: 8 }}>
					<CompletedPokemon data={data} guesses={guesses} isCorrect />
				</Grid>

				{/* Center column */}
				<Grid item xs={12} md={6}>
					{/* Mobile chips */}
					{isSmallScreen && (
						<Box mb={2} display="flex" justifyContent="center" gap={1}>
							<Chip
								label={`✅ ${correctCount}`}
								color="success"
								onClick={() => setDrawerType("correct")}
							/>
							<Chip
								label={`❌ ${incorrectCount}`}
								color="error"
								onClick={() => setDrawerType("incorrect")}
							/>
						</Box>
					)}

					{data.slice(0, Math.min(data.length, current + windowSize)).map((p, idx) => (
						<PokemonItem
							key={p.name}
							data={p}
							index={idx}
							currentIndex={current}
							isCurrent={idx === current}
							smallScreen={isSmallScreen}
							hardMode={hardMode}
							guesses={guesses}
							handleGuess={handleGuess}
							windowSize={windowSize}
						/>
					))}

					{current === data.length && (
						<Box pt={10} textAlign="center">
							<Typography variant="h3" gutterBottom>
								Your final score is {score}!
							</Typography>
							<Typography variant="h3">
								With a time of: {formatTimeString(Number(elapsedTime))}
							</Typography>
						</Box>
					)}
				</Grid>

				{/* Right column – incorrect list */}
				<Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" }, mt: 8 }}>
					<CompletedPokemon data={data} guesses={guesses} isCorrect={false} />
				</Grid>
			</Grid>
		</>
	);
};

export default PokemonTable;
