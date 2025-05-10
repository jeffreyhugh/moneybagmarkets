import { coin } from '../routes/coinEvents.svelte';
import { gameState } from '../routes/gamestate.svelte';
import type { Moneybag_t } from '../routes/moneybags';

export const handleChoice = (moneybag: Moneybag_t, choice: Moneybag_t['open'][0]) => {
	// gameState.moneybags[moneybag.name].owned -= 1;

	if (choice.effect === 'add') {
		const newCoins = Math.round(
			(Math.random() * (choice.maxValue - choice.minValue + 1) + choice.minValue) *
				gameState.coinMultiplier
		);
		coin('+', newCoins);
		gameState.coins += newCoins;

		return `+${newCoins}`;
	} else if (choice.effect === 'powerup') {
		let ownedMoneybags = 0;

		switch (choice.value) {
			case 'doubleMoney':
				gameState.coins *= 2;
				coin('x', 2);
				return 'x2';
			case 'tripleMoney':
				gameState.coins *= 3;
				coin('x', 3);
				return 'x3';
			case 'plusTenMaxMoneybags':
				gameState.maxEachMoneybag += 10;
				return '+10 Max';
			case 'spinMultiplier':
				gameState.coinMultiplier += 0.1;
				return `Spin x${gameState.coinMultiplier.toFixed(1)}`;
			case 'plusMoneybags':
				ownedMoneybags = gameState.moneybags[moneybag.name].owned;
				gameState.moneybags[moneybag.name].owned = gameState.maxEachMoneybag;
				return `+${gameState.maxEachMoneybag - ownedMoneybags} ${moneybag.name}`;
			case 'bonusSnacks':
				gameState.bonusSnacks += 5;
				return '+5 Bonus Snacks';
			case 'flashSale':
				for (const mbName of Object.keys(gameState.moneybags)) {
					gameState.moneybags[mbName].flashSales += 1;
				}
				return 'Flash Sale!';
			case 'doubleSpinMultiplier':
				gameState.coinMultiplier += 0.2;
				return `Spin x${gameState.coinMultiplier.toFixed(1)}`;
			case 'unlockAutoSpin':
				return 'WIP';
			case 'autoSpinSpeed':
				return 'WIP';
		}
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
			const newCoins = Math.round(
				Math.random() * (choice.maxValue - choice.minValue + 1) + choice.minValue
			);
			gameState.coins += newCoins;
			addTotal += newCoins;
		}
	}

	coin('+', addTotal);

	return `+${addTotal}`;
};
