import { coin } from '$lib/coinEvents.svelte';

import { gameState } from './gameState/gamestate.svelte';
import type { Moneybag_t } from './gameState/moneybags';
import { MarketDataLastIndex } from './moneybag/marketData';
import { numberFormatOptions } from './numberFormatOptions';

export const handleChoice = (moneybag: Moneybag_t, choice: Moneybag_t['open'][0]) => {
	if (choice.effect === 'add') {
		const newCoins = Math.round(
			(Math.random() * (choice.maxValue - choice.minValue + 1) + choice.minValue) *
				gameState.coinMultiplier
		);
		coin('+', newCoins);
		gameState.coins += newCoins;

		return `+${newCoins.toLocaleString(undefined, numberFormatOptions)}`;
	} else if (choice.effect === 'powerup') {
		let ownedMoneybags = 0;

		if (!(choice.value in gameState.moneybags[moneybag.name].discoveries.powerups)) {
			gameState.moneybags[moneybag.name].discoveries.powerups.push(choice.value);
		}

		let delta = 0;
		switch (choice.value) {
			case 'doubleMoney':
				delta = Math.min(
					gameState.coins,
					gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex] * 200
				);
				gameState.coins += delta;
				coin('+', delta);
				return 'x2';
			case 'tripleMoney':
				delta = Math.min(
					gameState.coins * 2,
					gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex] * 300
				);
				gameState.coins += delta;
				coin('+', delta);
				return 'x3';
			case 'plusTenMaxMoneybags':
				gameState.maxEachMoneybag += 10;
				return '+10 Max';
			case 'spinMultiplier':
				gameState.coinMultiplier = Math.min(2.5, gameState.coinMultiplier + 0.1);
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
				gameState.coinMultiplier = Math.min(5, gameState.coinMultiplier + 0.1);
				return `Spin x${gameState.coinMultiplier.toFixed(1)}`;
			case 'unlockAutoSpin':
				return 'WIP';
			case 'plusWorker':
				return 'WIP';
		}
	}

	return null;
};

export const handleChoices = (_moneybag: Moneybag_t, choices: (Moneybag_t['open'][0] | null)[]) => {
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
