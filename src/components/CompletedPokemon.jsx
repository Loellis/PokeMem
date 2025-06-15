import { Paper } from "@mui/material";
import { useState, useEffect } from "react";

const CompletedPokemon = ({ guesses, data, isCorrect }) => {
	const [filteredData, setFilteredData] = useState([]);
	const columns = 4; // keep layout consistent at 4 Pokémon per row
	const tileSize = 49;
	const gap = 10;
	const maxRows = 8; // show up to 8 rows before scrolling
	const containerHeight = (tileSize + gap) * maxRows - gap; // image + internal gaps
	const paperWidth = columns * tileSize + (columns - 1) * gap;

	useEffect(() => {
		const newFilteredData = data.filter((item) => {
			const guess = guesses[item.name];
			if (!guess) return false;

			if (isCorrect) {
				return guess.correct === true;
			} else {
				return guess.correct === false && guess.strikes >= 3;
			}
		});

		setFilteredData(newFilteredData);
	}, [data, guesses, isCorrect]);

	return (
		<div style={{ justifyContent: "center", alignItems: "center", maxWidth: "100%" }}>
			{filteredData.length > 0 && (
				<div
					style={{
						position: "relative",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<span
						role="img"
						aria-label={isCorrect ? "checkmark" : "cross"}
						style={{
							fontSize: "2rem",
							position: "absolute",
							top: 0,
							transform: "none",
							left: isCorrect ? "-35px" : "auto",
							right: isCorrect ? "auto" : "-35px",
						}}
					>
						{isCorrect ? "✅" : "❌"}
					</span>
					<Paper
						sx={{
							margin: "5px",
							border: `3px solid ${isCorrect ? "#5DA746" : "#BA0C0C"}`,
							padding: "5px",
							display: "grid",
							gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
							justifyContent: "center",
							gap: `${gap}px ${gap}px`,
							width: "100%",
							maxWidth: `${paperWidth}px`,
							maxHeight: `${containerHeight}px`,
							overflowY: "auto",
							overflowX: "hidden",
							// Use overlay scrollbar where supported so width doesn't change
							scrollbarGutter: "stable", // keeps space for scrollbar preventing reflow
						}}
					>
						{filteredData.map((item) => (
							<img
								key={item.name}
								src={item.image.startsWith("/") ? item.image : `/${item.image}`}
								alt={item.name}
								style={{ width: "49px", height: "49px" }}
							/>
						))}
					</Paper>
				</div>
			)}
		</div>
	);
};

export default CompletedPokemon;
