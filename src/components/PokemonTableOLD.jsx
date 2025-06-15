import { useState } from "react";
import {
	Grid,
	TextField,
	Typography,
	Box,
	useMediaQuery,
	Chip,
	SwipeableDrawer,
} from "@mui/material";
import { isGuessCloseEnough, formatTimeString } from "../utils/utils";
import CompletedPokemon from "./CompletedPokemon";

const PokemonTable = ({ score, setScore, hardMode, elapsedTime, setFinished, data }) => {
	const [guesses, setGuesses] = useState({}); // { [name]: { correct: boolean, strikes: number } }
	const [current, setCurrent] = useState(0);
	const windowSize = 5;
	const isSmallScreen = useMediaQuery("(max-width:600px)");
	// 'correct' | 'incorrect' | null – controls which list is shown in mobile drawer
	const [drawerType, setDrawerType] = useState(null);

	const handleGuess = (name, inputOrEvent) => {
		// Support being passed either an event from input/onKeyDown or a raw string value
		const value = typeof inputOrEvent === "string" ? inputOrEvent : inputOrEvent.target.value;
		const guess = value.trim().toLowerCase();
		const isCorrect = isGuessCloseEnough(guess, name.toLowerCase());

		setGuesses((prev) => {
			const prevEntry = prev[name] || { correct: false, strikes: 0 };

			// Already guessed correctly or failed
			if (prevEntry.correct || prevEntry.strikes >= 3) return prev;

			if (isCorrect) {
				setScore((s) => s + (hardMode ? 2 : 1));
				if (current === data.length - 1) setFinished(true);

				setCurrent((c) => c + 1);
				return {
					...prev,
					[name]: { correct: true, strikes: prevEntry.strikes },
				};
			} else {
				const newStrikes = prevEntry.strikes + 1;
				if (newStrikes >= 3 && current === data.length - 1) setFinished(true);
				if (newStrikes >= 3) setCurrent((c) => c + 1);

				return {
					...prev,
					[name]: { correct: false, strikes: newStrikes },
				};
			}
		});
	};

	// helpers for chip counts
	const correctCount = Object.values(guesses).filter((g) => g.correct).length;
	const incorrectCount = Object.values(guesses).filter((g) => !g.correct && g.strikes >= 3).length;

	return (
		<>
			{/* Datalist for mobile autocomplete */}
			{isSmallScreen && (
				<datalist id="pokemon-options">
					{data.map((p) => (
						<option key={p.name} value={p.name} />
					))}
				</datalist>
			)}

			{/* Mobile bottom drawer with completed Pokémon */}
			{isSmallScreen && (
				<SwipeableDrawer
					anchor="bottom"
					open={drawerType !== null}
					onClose={() => setDrawerType(null)}
					onOpen={() => {}}
				>
					<Box
						p={2}
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
					>
						{drawerType === "correct" && (
							<CompletedPokemon guesses={guesses} data={data} isCorrect={true} />
						)}
						{drawerType === "incorrect" && (
							<CompletedPokemon guesses={guesses} data={data} isCorrect={false} />
						)}
					</Box>
				</SwipeableDrawer>
			)}

			<Grid container spacing={2} alignItems="flex-start">
				{/* Left column – hide on small screens */}
				<Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" }, mt: { md: 8 } }}>
					<CompletedPokemon guesses={guesses} data={data} isCorrect={true} />
				</Grid>

				{/* Central column */}
				<Grid item xs={12} md={6}>
					{/* Chips only on mobile */}
					{isSmallScreen && (
						<Box mb={2} display="flex" justifyContent="center" gap={isSmallScreen ? 1 : 2}>
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

					{data.slice(0, Math.min(data.length, current + windowSize)).map((item, index) => (
						<Grid
							item
							sm={12}
							key={item.name}
							textAlign="center"
							className="pokemon-item"
							style={{ opacity: 1 - Math.min(Math.abs(index - current) / windowSize, 1) }}
						>
							{/* CURRENT ITEM */}
							{(!guesses[item.name] ||
								(!guesses[item.name].correct && guesses[item.name].strikes < 3)) &&
								index === current &&
								current !== data.length && (
									<div className="pokemon-item focused">
										<Grid container spacing={0} direction="column">
											<Grid item display="flex" justifyContent="center" alignItems="center">
												<Typography
													variant="body1"
													sx={{
														fontSize: { xs: "1rem", md: "1.5rem" },
														width: { xs: "55px", md: "70px" },
														textAlign: "center",
														ml: 1,
														mr: 2,
													}}
												>
													#{index + 1}
												</Typography>
												{/* FORM WRAPS INPUT TO CAPTURE ENTER ON MOBILE */}
												<form
													onSubmit={(e) => {
														e.preventDefault();
														const value = e.currentTarget.elements[0].value;
														handleGuess(item.name, value);
													}}
													style={{ width: isSmallScreen ? "80%" : "40%", display: "inline-block" }}
												>
													<TextField
														name="guess"
														margin="normal"
														autoFocus
														fullWidth
														label="Enter Pokémon Name"
														inputProps={{ list: isSmallScreen ? "pokemon-options" : undefined }}
													/>
												</form>
												{!hardMode && <img src={item.imageSil} alt={item.name} />}
											</Grid>
											{/* strikes */}
											<Grid>
												<Box mt={1} display="flex" justifyContent="center">
													{Array.from({ length: guesses[item.name]?.strikes || 0 }).map((_, i) => (
														<Typography
															key={i}
															role="img"
															aria-label="strike"
															component="span"
															sx={{ fontSize: "1.5rem", mx: 0.3 }}
														>
															❌
														</Typography>
													))}
												</Box>
											</Grid>
											{/* types */}
											<Grid item>
												{item.types && (
													<Box mt={2} display="flex" justifyContent="center">
														{item.types.map((type) => (
															<img
																key={type}
																src={`/images/types/${type}.png`}
																alt={type}
																height="20px"
																style={{ marginRight: "2px" }}
															/>
														))}
													</Box>
												)}
											</Grid>
										</Grid>
									</div>
								)}

							{/* NON-CURRENT ITEMS */}
							{(!guesses[item.name] ||
								(!guesses[item.name].correct && guesses[item.name].strikes < 3)) &&
								index !== current && (
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
										flexDirection={isSmallScreen ? "column" : "row"}
										gap={isSmallScreen ? 0 : 2}
										sx={{ mb: isSmallScreen ? 1.5 : 2 }}
									>
										{!hardMode && (
											<img
												src={item.imageSil}
												alt={item.name}
												style={{ maxWidth: isSmallScreen ? "120px" : "150px" }}
											/>
										)}
										<form
											onSubmit={(e) => {
												e.preventDefault();
												const value = e.currentTarget.elements[0].value;
												handleGuess(item.name, value);
											}}
											style={{ width: isSmallScreen ? "90%" : "60%" }}
										>
											<TextField
												name="guess"
												fullWidth
												label="Enter Pokémon Name"
												margin="normal"
												inputProps={{ list: isSmallScreen ? "pokemon-options" : undefined }}
											/>
										</form>
									</Box>
								)}
						</Grid>
					))}

					{current === data.length && (
						<div className="end-game-score" style={{ paddingTop: "5em" }}>
							<Typography variant="h3" sx={{ padding: "5px" }}>
								Your final score is {score}!
							</Typography>
							<Typography variant="h3" sx={{ padding: "5px" }}>
								With a time of: {formatTimeString(parseInt(elapsedTime))}
							</Typography>
						</div>
					)}
				</Grid>

				{/* Right column – hide on small screens */}
				<Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" }, mt: { md: 8 } }}>
					<CompletedPokemon guesses={guesses} data={data} isCorrect={false} />
				</Grid>
			</Grid>
		</>
	);
};

export default PokemonTable;
