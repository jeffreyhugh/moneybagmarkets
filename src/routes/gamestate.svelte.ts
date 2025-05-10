import type { DateTime } from 'luxon';

import { MarketDataLastIndex } from '$lib/marketData';
import { nextValue } from '$lib/nextValue';

import defaultGameState from './defaultGameState.json';
import { type Moneybag_t, moneybags, type Powerup_t } from './moneybags';

export const ssr = false;

export type GameState_t = {
	tick: number;
	multiplier: {
		index: number;
		value: number;
	};
	coins: number;
	coinMultiplier: number;
	moneybags: {
		[name: Moneybag_t['name']]: {
			owned: number;
			marketHistory: [number, number, number, number, number];
			unlocked: boolean;
			flashSales: number;
			discoveries: {
				min: number | null;
				max: number | null;
				powerups: Array<Powerup_t[number]>;
			};
		};
	};
	lastRandomEvent: DateTime | null;
	maxEachMoneybag: number;
	bonusSnacks: number;
};

let pauseGame = $state(false);

const defaultPlusMoneybags = { ...defaultGameState } as unknown as GameState_t;
for (const moneybag of moneybags) {
	if (!(moneybag.name in defaultPlusMoneybags.moneybags)) {
		defaultPlusMoneybags.moneybags[moneybag.name] = {
			owned: 0,
			marketHistory: [
				moneybag.market.target,
				moneybag.market.target,
				moneybag.market.target,
				moneybag.market.target,
				moneybag.market.target
			],
			unlocked: false,
			flashSales: 0,
			discoveries: {
				min: null,
				max: null,
				powerups: []
			}
		};
	}
}

export const gameState = $state(
	JSON.parse(
		localStorage.getItem('gamestate') || JSON.stringify(defaultPlusMoneybags)
	) as GameState_t
);

setInterval(() => {
	if (pauseGame) {
		return;
	}

	gameState.tick += 1;
	for (const moneybag of moneybags) {
		writeLatest(moneybag);
	}

	if (gameState.tick % 5 === 0) {
		save();
	}
}, 1_000);

const writeLatest = (moneybag: Moneybag_t) => {
	if (gameState.tick % moneybag.market.updateOnMod !== 0) {
		return;
	}

	let snapshot: number[] = [];
	try {
		snapshot = $state.snapshot(gameState.moneybags[moneybag.name].marketHistory);
	} catch (e) {
		console.error(e);
		migrateGameState();
		return;
	}

	const next = nextValue(snapshot[MarketDataLastIndex], moneybag);

	snapshot.push(next);
	snapshot.shift();

	gameState.moneybags[moneybag.name].marketHistory =
		snapshot as GameState_t['moneybags']['']['marketHistory'];
};

const save = () => {
	localStorage.setItem('gamestate', JSON.stringify(gameState));
};

export const reset = () => {
	pauseGame = true;
	const yes = confirm('Are you sure? Your save data will be lost.');
	if (!yes) {
		pauseGame = false;
		return;
	}

	localStorage.removeItem('gamestate');
	window.location.reload();
};

export const migrateGameState = () => {
	pauseGame = true;

	console.log('Beginning migration');

	let dirty = false;

	for (const moneybag of moneybags) {
		if (!(moneybag.name in gameState.moneybags)) {
			console.log('Add: ', moneybag.name);
			dirty = true;
			gameState.moneybags[moneybag.name] = {
				owned: 0,
				marketHistory: [
					moneybag.market.target,
					moneybag.market.target,
					moneybag.market.target,
					moneybag.market.target,
					moneybag.market.target
				],
				unlocked: false,
				flashSales: 0,
				discoveries: {
					min: null,
					max: null,
					powerups: []
				}
			};
		}
	}

	for (const mbName of Object.keys(gameState.moneybags)) {
		if (moneybags.findIndex((mb) => mb.name === mbName) === -1) {
			console.log('Remove: ', mbName);
			dirty = true;
			delete gameState.moneybags[mbName];
		}
	}

	// add missing fields
	for (const mbName of Object.keys(gameState.moneybags)) {
		const moneybag = gameState.moneybags[mbName];
		if (
			JSON.stringify(Object.keys(moneybag).sort()) !==
			JSON.stringify(Object.keys(defaultGameState.moneybags['Dirt Poor Landscaping']).sort())
		) {
			for (const gsKey of Object.keys(gameState.moneybags[mbName])) {
				if (!(gsKey in defaultGameState.moneybags['Dirt Poor Landscaping'])) {
					// @ts-expect-error I promise this is type-safe
					delete gameState.moneybags[mbName][gsKey];
					console.log('Removed', gsKey, 'from', mbName);
					dirty = true;
				}
			}

			for (const defaultKey of Object.keys(defaultGameState.moneybags['Dirt Poor Landscaping'])) {
				if (!(defaultKey in gameState.moneybags[mbName])) {
					// @ts-expect-error I promise this is type-safe
					gameState.moneybags[mbName][defaultKey] =
						// @ts-expect-error I promise this is type-safe
						defaultGameState.moneybags['Dirt Poor Landscaping'][defaultKey];
					console.log('Added', defaultKey, 'to', mbName);
					dirty = true;
				}
			}
		}
	}
	if (
		JSON.stringify(Object.keys(gameState).sort()) !==
		JSON.stringify(Object.keys(defaultGameState).sort())
	) {
		for (const existingKey of Object.keys(gameState)) {
			if (!(existingKey in defaultGameState)) {
				// @ts-expect-error I promise this is type-safe
				delete gameState[existingKey];
				console.log('Removed', existingKey, 'from root gameState');
				dirty = true;
			}
		}

		for (const defaultKey of Object.keys(defaultGameState)) {
			if (!(defaultKey in gameState)) {
				// @ts-expect-error I promise this is type-safe
				gameState[defaultKey] = defaultGameState[defaultKey];
				console.log('Added', defaultKey, 'to root gameState');
				dirty = true;
			}
		}
	}

	save();
	if (dirty) {
		window.location.reload();
	} else {
		console.log('Nothing to do');
	}
	pauseGame = false;
};
