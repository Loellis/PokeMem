import { memo, forwardRef } from "react";
import { TextField } from "@mui/material";

export interface GuessInputProps {
	onSubmit: (val: string) => void;
	smallScreen: boolean;
}

const GuessInput = forwardRef<HTMLInputElement, GuessInputProps>(function GuessInput(
	{ onSubmit, smallScreen },
	ref
) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const value = (e.currentTarget.elements[0] as HTMLInputElement).value;
				onSubmit(value);
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
				inputRef={ref}
			/>
		</form>
	);
});

GuessInput.displayName = "GuessInput";

export default memo(GuessInput);
