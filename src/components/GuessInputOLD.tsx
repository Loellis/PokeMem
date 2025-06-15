// components/GuessInput.tsx
import { TextField } from "@mui/material";
import { memo } from "react";

interface Props {
	onSubmit: (val: string) => void;
	smallScreen: boolean;
}
const GuessInput = ({ onSubmit, smallScreen }: Props) => (
	<form
		onSubmit={(e) => {
			e.preventDefault();
			// @ts-expect-error – first input element
			onSubmit(e.currentTarget.elements[0].value);
			e.currentTarget.reset();
		}}
		style={{ width: smallScreen ? "90%" : "60%" }}
	>
		<TextField
			name="guess"
			fullWidth
			label="Enter Pokémon Name"
			margin="normal"
			inputProps={{ list: smallScreen ? "pokemon-options" : undefined }}
		/>
	</form>
);
export default memo(GuessInput);
