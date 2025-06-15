import { isGuessCloseEnough } from "../utils/utils";
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import type { Pokemon } from "../types/Pokemon";

export interface GuessState {
	correct: boolean;
	strikes: number;
}
export interface UsePokemonGame {
	current: number;
	guesses: Record<string, GuessState>;
	correctCount: number;
	incorrectCount: number;
	handleGuess: (targetName: string, raw: string) => void;
}

export const usePokemonGame = (
	data: Pokemon[],
	hardMode: boolean,
	setScore: Dispatch<SetStateAction<number>>,
	setFinished: Dispatch<SetStateAction<boolean>>
): UsePokemonGame => {
	const [guesses, setGuesses] = useState<Record<string, GuessState>>({});
	const [current, setCurrent] = useState(0);

	const handleGuess = useCallback(
		(name: string, value: string) => {
			const guess = value.trim().toLowerCase();
			const isCorrect = isGuessCloseEnough(guess, name.toLowerCase());

			setGuesses((prev) => {
				const prevEntry = prev[name] ?? { correct: false, strikes: 0 };
				if (prevEntry.correct || prevEntry.strikes >= 3) return prev;

				if (isCorrect) {
					setScore((s) => s + (hardMode ? 2 : 1));
					if (current === data.length - 1) setFinished(true);
					setCurrent((c) => c + 1);
					return { ...prev, [name]: { correct: true, strikes: prevEntry.strikes } };
				} else {
					const strikes = prevEntry.strikes + 1;
					if (strikes >= 3) {
						if (current === data.length - 1) setFinished(true);
						setCurrent((c) => c + 1);
					}
					return { ...prev, [name]: { correct: false, strikes } };
				}
			});
		},
		[current, data.length, hardMode, setFinished, setScore]
	);

	const correctCount = Object.values(guesses).filter((g) => g.correct).length;
	const incorrectCount = Object.values(guesses).filter((g) => !g.correct && g.strikes >= 3).length;

	return { current, guesses, correctCount, incorrectCount, handleGuess };
};
