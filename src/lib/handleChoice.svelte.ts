import { coin } from '../routes/coinEvents.svelte';
import { gameState } from '../routes/gamestate.svelte';
import type { Moneybag_t } from '../routes/moneybags';

export const handleChoice = (moneybag: Moneybag_t, choice: Moneybag_t['open'][0]) => {
	// gameState.moneybags[moneybag.name].owned -= 1;

	if (choice.effect === 'add') {
		gameState.coins += choice.value;

		return `+${choice.value}`;
	}

	return null;
};

export const handleChoices = (_moneybag: Moneybag_t, choices: (Moneybag_t['open'][0] | null)[]) => {
	// gameState.moneybags[moneybag.name].owned -= 1;
	let addTotal = 0;

	for (const choice of choices) {
		if (!choice) {
			continue;
		}

		if (choice.effect === 'add') {
			gameState.coins += choice.value;
			addTotal += choice.value;
		}
	}

	coin('+', addTotal);

	return `+${addTotal}`;
};
