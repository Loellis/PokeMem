import { Grid, Box, Typography } from "@mui/material";
import GuessInput from "./GuessInput";
import StrikeRow from "./StrikeRow";
import TypeIcons from "./TypeIcons";
import SilhouetteImg from "./SilhouetteImg";
import {memo, useEffect, useRef} from "react";
import type { Pokemon } from "types/Pokemon";

interface Props {
	data: Pokemon;
	index: number;
	currentIndex: number;
	isCurrent: boolean;
	smallScreen: boolean;
	hardMode: boolean;
	guesses: Record<string, { correct: boolean; strikes: number }>;
	handleGuess: (targetName: string, raw: string) => void;
	windowSize: number;
}

const PokemonItem = ({
	data: item,
	index,
	currentIndex,
	isCurrent,
	smallScreen,
	hardMode,
	guesses,
	handleGuess,
	windowSize,
}: Props) => {
	
	// Make sure to auto-focus inputfield
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (isCurrent) {
			inputRef.current?.focus();
		}
	}, [isCurrent]);


	// If already solved/failed, don't render
	const g = guesses[item.name];
	if (g?.correct || g?.strikes >= 3) return null;

	const opacity = 1 - Math.min(Math.abs(index - currentIndex) / windowSize, 1);
	const content = (
		<Box
			display="flex"
			flexDirection={smallScreen ? "column" : "row"}
			justifyContent="center"
			alignItems="center"
			gap={smallScreen ? 0 : 2}
			sx={{ mb: smallScreen ? 1.5 : 2 }}
		>
			{!hardMode && (
				<SilhouetteImg src={item.imageSil} alt={item.name} size={smallScreen ? 120 : 150} />
			)}

			<GuessInput ref={inputRef} smallScreen={smallScreen} onSubmit={(val) => handleGuess(item.name, val)} />
		</Box>
	);

	if (isCurrent) {
		return (
			<Grid item sm={12} className="pokemon-item focused" sx={{ opacity }}>
				<Grid container direction="column" spacing={0}>
					<Grid item display="flex" justifyContent="center" alignItems="center">
						<Typography
							variant="body1"
							sx={{
								fontSize: { xs: "1rem", md: "1.5rem" },
								width: { xs: 55, md: 70 },
								textAlign: "center",
								mx: 1,
							}}
						>
							#{index + 1}
						</Typography>
						{content}
					</Grid>

					<Grid item>
						<StrikeRow count={g?.strikes ?? 0} />
					</Grid>

					<Grid item>
						<TypeIcons types={item.types} />
					</Grid>
				</Grid>
			</Grid>
		);
	}

	return (
		<Grid item sm={12} sx={{ opacity }}>
			{content}
		</Grid>
	);
};

export default memo(PokemonItem);
