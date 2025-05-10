import { IconLock } from '@tabler/icons-svelte';
import Barbell from '@tabler/icons-svelte/icons/barbell';
import Bottle from '@tabler/icons-svelte/icons/bottle';
import Bread from '@tabler/icons-svelte/icons/bread';
import BuildingAirport from '@tabler/icons-svelte/icons/building-airport';
import BuildingStore from '@tabler/icons-svelte/icons/building-store';
import CactusOff from '@tabler/icons-svelte/icons/cactus-off';
import Diamond from '@tabler/icons-svelte/icons/diamond';
import EggCracked from '@tabler/icons-svelte/icons/egg-cracked';
import Flask from '@tabler/icons-svelte/icons/flask';
import IceCream from '@tabler/icons-svelte/icons/ice-cream';
import type Icons from '@tabler/icons-svelte/icons/icons';
import Plant from '@tabler/icons-svelte/icons/plant';
import Receipt from '@tabler/icons-svelte/icons/receipt';
import RollerSkating from '@tabler/icons-svelte/icons/roller-skating';
import ShovelPitchforks from '@tabler/icons-svelte/icons/shovel-pitchforks';

import type { Demographics_t } from './headlines';
import { Demographics_t as DEM } from './headlines';

export type Powerup_t = [
	'doubleMoney',
	'tripleMoney',
	'plusTenMaxMoneybags',
	'spinMultiplier',
	'plusMoneybags',
	'bonusSnacks',
	'flashSale',
	'doubleSpinMultiplier',
	'unlockAutoSpin',
	'plusWorker'
];

export const powerupDescriptions: Record<Powerup_t[number], string> = {
	doubleMoney:
		'Double your current coin balance up to 200x the current market value of the moneybag.',
	tripleMoney:
		'Triple your current coin balance up to 300x the current market value of the moneybag.',
	plusTenMaxMoneybags: 'Increase the moneybag cap by 10.',
	spinMultiplier: 'Increase your permanent spin multiplier up to 2.5x.',
	plusMoneybags: 'Fill your moneybag cap instantly, for free.',
	bonusSnacks:
		'Earn 5 snacks. Each snack is consumed on use and gives an extra roll when opening your next moneybag.',
	flashSale: 'The next market tick for each moneybag will be the lowest possible value.',
	doubleSpinMultiplier: 'Increase your permanent spin multiplier up to 5x.',
	unlockAutoSpin: 'Unlock auto-spins.',
	plusWorker: 'Get another worker to automate tasks.'
};

export type Moneybag_t = {
	name: string;
	lore?: string;
	icon?: typeof Icons;
	applicableDemographics: Demographics_t[];
	colors: {
		text: string;
		from: string;
		via?: string;
		to: string;
		confetti: string[];
		sparkline: string;
		wheelColors: string[];
	};
	market: {
		updateOnMod: number;
		min: number;
		max: number;
		target: number;
		lineWeight: number; // 0-1, higher = more likely to drift from average
		absoluteVolatility: number; // max swing per tick
	};
	costToUnlock: number;
	open: (
		| {
				chance: number; // [0, 1]
				effect: 'add';
				minValue: number;
				maxValue: number;
		  }
		| {
				chance: number;
				effect: 'powerup';
				value: Powerup_t[number];
		  }
	)[];
};

const dirtPoorLandscaping: Moneybag_t = {
	name: 'Dirt Poor Landscaping',
	lore: 'Making our yard look presentable-ish since 1998. Always hiring entry-level positions.',
	icon: ShovelPitchforks,
	applicableDemographics: [
		DEM.AGE_MID,
		DEM.AGE_OLD,
		DEM.MONEY_MID,
		DEM.MONEY_RICH,
		DEM.TYPE_SERVICE
	],
	colors: {
		text: 'text-white',
		from: 'from-amber-950',
		to: 'to-amber-950',
		confetti: ['transparent'],
		sparkline: '#461901',
		wheelColors: ['#bb4d00', '#7b3306']
	},
	market: {
		updateOnMod: 100,
		min: 0,
		max: 0,
		target: 0,
		lineWeight: 0,
		absoluteVolatility: 0
	},
	costToUnlock: 0,
	open: [
		{
			chance: 0.95,
			effect: 'add',
			minValue: 5,
			maxValue: 15
		},
		{
			chance: 0.05,
			effect: 'add',
			minValue: 800,
			maxValue: 1200
		}
	]
};

const pruneJuiceInc: Moneybag_t = {
	name: 'Prune Juice, Inc.',
	lore: 'Helping you go with the flow since 1946.',
	icon: Bottle,
	applicableDemographics: [DEM.AGE_OLD, DEM.MONEY_LOWER, DEM.MONEY_MID, DEM.TYPE_GOOD],
	colors: {
		text: 'text-white',
		from: 'from-purple-800',
		to: 'to-purple-800',
		confetti: ['#6e11b0'],
		sparkline: '#6e11b0',
		wheelColors: [
			'oklch(90.2% 0.063 306.703)',
			'oklch(71.4% 0.203 305.504)',
			'oklch(55.8% 0.288 302.321)'
		]
	},
	market: {
		updateOnMod: 5,
		min: 50,
		max: 200,
		target: 110,
		lineWeight: 0.5,
		absoluteVolatility: 50
	},
	costToUnlock: 100,
	open: [
		{
			chance: 0.5,
			effect: 'add',
			minValue: 70,
			maxValue: 110
		},
		{
			chance: 0.3,
			effect: 'add',
			minValue: 100,
			maxValue: 140
		},
		{
			chance: 0.2,
			effect: 'add',
			minValue: 200,
			maxValue: 300
		}
	]
};

const andersonCactusRemoval: Moneybag_t = {
	name: 'Anderson Cactus Removal',
	lore: 'We get you out of thorny situations.',
	icon: CactusOff,
	applicableDemographics: [DEM.AGE_MID, DEM.AGE_OLD, DEM.MONEY_RICH, DEM.TYPE_SERVICE],
	colors: {
		text: 'text-white',
		from: 'from-green-800',
		to: 'to-green-800',
		confetti: ['#016630'],
		sparkline: '#016630',
		wheelColors: [
			'oklch(92.5% 0.084 155.995)',
			'oklch(79.2% 0.209 151.711)',
			'oklch(62.7% 0.194 149.214)',
			'oklch(44.8% 0.119 151.328)'
		]
	},
	market: {
		updateOnMod: 7,
		min: 100,
		max: 1000,
		target: 450,
		lineWeight: 0.5,
		absoluteVolatility: 200
	},
	costToUnlock: 1100,
	open: [
		{
			chance: 0.4,
			effect: 'add',
			minValue: 270,
			maxValue: 330
		},
		{
			chance: 0.3,
			effect: 'add',
			minValue: 360,
			maxValue: 440
		},
		{
			chance: 0.27,
			effect: 'add',
			minValue: 650,
			maxValue: 750
		},
		{
			chance: 0.03,
			effect: 'add',
			minValue: 8000,
			maxValue: 10_000
		}
	]
};

const floralsByPatricia: Moneybag_t = {
	name: 'Florals by Patricia',
	lore: 'The most beautiful arrangements for weddings, funerals, and those nasty fights with your wife.',
	icon: Plant,
	applicableDemographics: [DEM.AGE_MID, DEM.AGE_OLD, DEM.MONEY_RICH, DEM.TYPE_SERVICE],
	colors: {
		text: 'text-white',
		from: 'from-fuchsia-600',
		to: 'to-fuchsia-800',
		confetti: ['#8a0194'],
		sparkline: '#8a0194',
		wheelColors: [
			'oklch(90.3% 0.076 319.62)',
			'oklch(74% 0.238 322.16)',
			'oklch(59.1% 0.293 322.896)',
			'oklch(45.2% 0.211 324.591)',
			'oklch(29.3% 0.136 325.661)'
		]
	},
	market: {
		updateOnMod: 10,
		min: 1200,
		max: 6900,
		target: 3000,
		lineWeight: 0.5,
		absoluteVolatility: 1500
	},
	costToUnlock: 14_000,
	open: [
		{
			chance: 0.4,
			effect: 'add',
			minValue: 1500,
			maxValue: 2100
		},
		{
			chance: 0.35,
			effect: 'add',
			minValue: 2750,
			maxValue: 3150
		},
		{
			chance: 0.15,
			effect: 'add',
			minValue: 4000,
			maxValue: 4600
		},
		{
			chance: 0.09,
			effect: 'add',
			minValue: 5000,
			maxValue: 7000
		},
		{
			chance: 0.01,
			effect: 'powerup',
			value: 'doubleMoney'
		}
	]
};

const stronkJim: Moneybag_t = {
	name: 'Stronk Jim',
	lore: 'Greg is not welcome back.',
	icon: Barbell,
	applicableDemographics: [
		DEM.AGE_YOUNG,
		DEM.AGE_MID,
		DEM.MONEY_LOWER,
		DEM.MONEY_MID,
		DEM.TYPE_ESTABLISHMENT
	],
	colors: {
		text: 'text-black',
		from: 'from-yellow-400',
		to: 'to-yellow-600',
		confetti: ['#facc15', '#ca8a04'],
		sparkline: '#facc15',
		wheelColors: [
			'oklch(94.5% 0.129 101.54)',
			'oklch(85.2% 0.199 91.936)',
			'oklch(68.1% 0.162 75.834)',
			'oklch(47.6% 0.114 61.907)',
			'oklch(42.1% 0.095 57.708)'
		]
	},
	market: {
		updateOnMod: 4,
		min: 2000,
		max: 4500,
		target: 3000,
		lineWeight: 0.7,
		absoluteVolatility: 1300
	},
	costToUnlock: 20_000,
	open: [
		{
			chance: 0.5,
			effect: 'add',
			minValue: 1500,
			maxValue: 1800
		},
		{
			chance: 0.27,
			effect: 'add',
			minValue: 1700,
			maxValue: 2100
		},
		{
			chance: 0.2,
			effect: 'add',
			minValue: 2000,
			maxValue: 2300
		},
		{
			chance: 0.03,
			effect: 'powerup',
			value: 'plusTenMaxMoneybags'
		}
	]
};

const undergroundAirport: Moneybag_t = {
	name: 'Underground Airport (KNDR)',
	lore: "Surely, nothing suspicious is going on here. This definitely isn't a secret airport for rich folks.",
	icon: BuildingAirport,
	applicableDemographics: [DEM.AGE_MID, DEM.AGE_OLD, DEM.MONEY_RICH, DEM.TYPE_ESTABLISHMENT],
	colors: {
		text: 'text-white',
		from: 'from-sky-700',
		to: 'to-blue-900',
		confetti: ['#0369a1', '#1e40af', '#1e3a8a'],
		sparkline: '#1e40af',
		wheelColors: [
			'oklch(54.6% 0.245 262.881)',
			'oklch(68.5% 0.169 237.323)',
			'oklch(25.7% 0.09 281.288)'
		]
	},
	market: {
		updateOnMod: 20,
		min: 1000,
		max: 20_000,
		target: 15_000,
		lineWeight: 0.3,
		absoluteVolatility: 4000
	},
	costToUnlock: 100_000,
	open: [
		{
			chance: 0.34,
			effect: 'add',
			minValue: 1,
			maxValue: 1
		},
		{
			chance: 0.33,
			effect: 'add',
			minValue: 1000,
			maxValue: 20_000
		},
		{
			chance: 0.33,
			effect: 'powerup',
			value: 'spinMultiplier'
		}
	]
};

const fauxBrothersJewelry: Moneybag_t = {
	name: 'Faux Brothers Jewelry',
	lore: "Don't trust the name -- we're the real deal.",
	icon: Diamond,
	applicableDemographics: [DEM.AGE_MID, DEM.AGE_OLD, DEM.MONEY_RICH, DEM.TYPE_GOOD],
	colors: {
		text: 'text-white',
		from: 'from-cyan-600',
		to: 'to-cyan-800',
		confetti: ['#0891b2', '#155e75', '#0e7490'],
		sparkline: '#0891b2',
		wheelColors: [
			'oklch(91.7% 0.08 205.041)',
			'oklch(78.9% 0.154 211.53)',
			'oklch(60.9% 0.126 221.723)',
			'oklch(45% 0.085 224.283)',
			'oklch(30.2% 0.056 229.695)'
		]
	},
	market: {
		updateOnMod: 6,
		min: 3300,
		max: 35000,
		target: 16000,
		lineWeight: 0.35,
		absoluteVolatility: 6000
	},
	costToUnlock: 115_000,
	open: [
		{
			chance: 0.4,
			effect: 'add',
			minValue: 2200,
			maxValue: 3300
		},
		{
			chance: 0.32,
			effect: 'add',
			minValue: 7000,
			maxValue: 10000
		},
		{
			chance: 0.15,
			effect: 'add',
			minValue: 12000,
			maxValue: 16000
		},
		{
			chance: 0.11,
			effect: 'add',
			minValue: 14000,
			maxValue: 20000
		},
		{
			chance: 0.02,
			effect: 'powerup',
			value: 'plusMoneybags'
		}
	]
};

const gaslampGalleria: Moneybag_t = {
	name: 'Gaslamp Galleria',
	lore: 'This museum of gaslamps has got to be a front for something...',
	icon: BuildingStore,
	applicableDemographics: [DEM.AGE_MID, DEM.AGE_YOUNG, DEM.MONEY_MID, DEM.TYPE_ESTABLISHMENT],
	colors: {
		text: 'text-black',
		from: 'from-amber-300',
		via: 'via-yellow-400',
		to: 'to-orange-400',
		confetti: ['#fcd34d', '#fbbf24', '#fb923c'],
		sparkline: '#fcd34d',
		wheelColors: [
			'oklch(95.6% 0.19 85.51)',
			'oklch(88.6% 0.182 77.97)',
			'oklch(78.9% 0.191 67.99)',
			'oklch(66.2% 0.222 61.21)',
			'oklch(52.3% 0.212 56.31)'
		]
	},
	market: {
		updateOnMod: 5,
		min: 2000,
		max: 45000,
		target: 18000,
		lineWeight: 0.4,
		absoluteVolatility: 8000
	},
	costToUnlock: 125_000,
	open: [
		{
			chance: 0.38,
			effect: 'add',
			minValue: 1500,
			maxValue: 3200
		},
		{
			chance: 0.32,
			effect: 'add',
			minValue: 6000,
			maxValue: 9500
		},
		{
			chance: 0.16,
			effect: 'add',
			minValue: 12000,
			maxValue: 17000
		},
		{
			chance: 0.12,
			effect: 'add',
			minValue: 15000,
			maxValue: 22000
		},
		{
			chance: 0.02,
			effect: 'powerup',
			value: 'doubleMoney'
		}
	]
};

const elevenPMSnax: Moneybag_t = {
	name: '11PM Snax',
	lore: 'Your go-to satisfier for all midnight cravings.',
	icon: IceCream,
	applicableDemographics: [DEM.AGE_YOUNG, DEM.MONEY_LOWER, DEM.MONEY_MID, DEM.TYPE_GOOD],
	colors: {
		text: 'text-white',
		from: 'from-pink-700',
		to: 'to-rose-900',
		confetti: ['#db2777', '#be123c', '#9d174d'],
		sparkline: '#be185d',
		wheelColors: [
			'oklch(93.5% 0.084 10.1)',
			'oklch(78.4% 0.22 20.5)',
			'oklch(66.9% 0.24 355.3)',
			'oklch(48.2% 0.18 345.7)',
			'oklch(32.1% 0.13 330.1)'
		]
	},
	market: {
		updateOnMod: 5,
		min: 2500,
		max: 50000,
		target: 19000,
		lineWeight: 0.4,
		absoluteVolatility: 8500
	},
	costToUnlock: 135_000,
	open: [
		{
			chance: 0.4,
			effect: 'add',
			minValue: 1800,
			maxValue: 3500
		},
		{
			chance: 0.3,
			effect: 'add',
			minValue: 6000,
			maxValue: 9000
		},
		{
			chance: 0.18,
			effect: 'add',
			minValue: 10000,
			maxValue: 17000
		},
		{
			chance: 0.1,
			effect: 'add',
			minValue: 18000,
			maxValue: 25000
		},
		{
			chance: 0.02,
			effect: 'powerup',
			value: 'bonusSnacks'
		}
	]
};

const pawnDome: Moneybag_t = {
	name: 'Pawn Dome',
	lore: 'A grungy pawn shop. Nothing to see here.',
	icon: Receipt,
	applicableDemographics: [DEM.AGE_YOUNG, DEM.AGE_MID, DEM.MONEY_LOWER, DEM.TYPE_ESTABLISHMENT],
	colors: {
		text: 'text-white',
		from: 'from-neutral-700',
		to: 'to-yellow-900',
		confetti: ['#78716c', '#a16207', '#854d0e'],
		sparkline: '#a16207',
		wheelColors: [
			'oklch(92% 0.1 85)',
			'oklch(74% 0.18 78)',
			'oklch(60% 0.22 70)',
			'oklch(44% 0.17 60)',
			'oklch(30% 0.11 45)'
		]
	},
	market: {
		updateOnMod: 6,
		min: 3000,
		max: 60000,
		target: 23000,
		lineWeight: 0.5,
		absoluteVolatility: 9000
	},
	costToUnlock: 150_000,
	open: [
		{
			chance: 0.42,
			effect: 'add',
			minValue: 2000,
			maxValue: 4000
		},
		{
			chance: 0.3,
			effect: 'add',
			minValue: 7000,
			maxValue: 10000
		},
		{
			chance: 0.16,
			effect: 'add',
			minValue: 12000,
			maxValue: 18000
		},
		{
			chance: 0.1,
			effect: 'add',
			minValue: 20000,
			maxValue: 26000
		},
		{
			chance: 0.02,
			effect: 'powerup',
			value: 'flashSale'
		}
	]
};

const midnightOilPress: Moneybag_t = {
	name: 'Midnight Oil Press',
	lore: 'The finest olive oil for the most discerning palettes.',
	icon: Flask,
	applicableDemographics: [DEM.AGE_MID, DEM.MONEY_MID, DEM.MONEY_RICH, DEM.TYPE_GOOD],
	colors: {
		text: 'text-white',
		from: 'from-emerald-800',
		via: 'via-emerald-600',
		to: 'to-green-900',
		confetti: ['#065f46', '#059669', '#047857'],
		sparkline: '#10b981',
		wheelColors: [
			'oklch(90% 0.1 160)',
			'oklch(75% 0.18 155)',
			'oklch(60% 0.2 150)',
			'oklch(45% 0.15 145)',
			'oklch(30% 0.1 140)'
		]
	},
	market: {
		updateOnMod: 8,
		min: 5000,
		max: 75000,
		target: 28000,
		lineWeight: 0.4,
		absoluteVolatility: 10000
	},
	costToUnlock: 175_000,
	open: [
		{
			chance: 0.38,
			effect: 'add',
			minValue: 3000,
			maxValue: 5000
		},
		{
			chance: 0.3,
			effect: 'add',
			minValue: 8000,
			maxValue: 12000
		},
		{
			chance: 0.18,
			effect: 'add',
			minValue: 15000,
			maxValue: 22000
		},
		{
			chance: 0.12,
			effect: 'add',
			minValue: 25000,
			maxValue: 35000
		},
		{
			chance: 0.02,
			effect: 'powerup',
			value: 'tripleMoney'
		}
	]
};

const grandmasAlgorithmicBakery: Moneybag_t = {
	name: "Grandma's Algorithmic Bakery",
	lore: "The calming scent of fresh bread fills the hipster study area. Unfortunately, it's not enough to mask the smell of the hackathon in the corner.",
	icon: Bread,
	applicableDemographics: [DEM.AGE_YOUNG, DEM.AGE_MID, DEM.MONEY_MID, DEM.TYPE_GOOD],
	colors: {
		text: 'text-black',
		from: 'from-amber-200',
		via: 'via-amber-100',
		to: 'to-amber-300',
		confetti: ['#fde68a', '#fcd34d', '#fbbf24'],
		sparkline: '#f59e0b',
		wheelColors: [
			'oklch(95% 0.12 85)',
			'oklch(88% 0.15 80)',
			'oklch(80% 0.18 75)',
			'oklch(70% 0.2 70)',
			'oklch(55% 0.18 65)'
		]
	},
	market: {
		updateOnMod: 6,
		min: 8000,
		max: 90000,
		target: 35000,
		lineWeight: 0.6,
		absoluteVolatility: 12000
	},
	costToUnlock: 210_000,
	open: [
		{
			chance: 0.35,
			effect: 'add',
			minValue: 5000,
			maxValue: 8000
		},
		{
			chance: 0.3,
			effect: 'add',
			minValue: 10000,
			maxValue: 15000
		},
		{
			chance: 0.2,
			effect: 'add',
			minValue: 20000,
			maxValue: 28000
		},
		{
			chance: 0.13,
			effect: 'add',
			minValue: 30000,
			maxValue: 40000
		},
		{
			chance: 0.02,
			effect: 'powerup',
			value: 'doubleSpinMultiplier'
		}
	]
};

const neonRollerRink: Moneybag_t = {
	name: 'Neon Roller Rink',
	lore: 'Where the wheels never stop -- and neither do the lawsuits.',
	icon: RollerSkating,
	applicableDemographics: [
		DEM.AGE_YOUNG,
		DEM.AGE_MID,
		DEM.MONEY_LOWER,
		DEM.MONEY_MID,
		DEM.TYPE_ESTABLISHMENT
	],
	colors: {
		text: 'text-black',
		from: 'from-purple-400',
		via: 'via-pink-400',
		to: 'to-rose-400',
		confetti: ['#c084fc', '#f472b6', '#fb7185'],
		sparkline: '#e879f9',
		wheelColors: [
			'oklch(90% 0.18 330)',
			'oklch(80% 0.2 310)',
			'oklch(70% 0.22 290)',
			'oklch(60% 0.2 270)',
			'oklch(45% 0.15 250)'
		]
	},
	market: {
		updateOnMod: 5,
		min: 10000,
		max: 100000,
		target: 42000,
		lineWeight: 0.7,
		absoluteVolatility: 15000
	},
	costToUnlock: 250_000,
	open: [
		{
			chance: 0.4,
			effect: 'add',
			minValue: 8000,
			maxValue: 12000
		},
		{
			chance: 0.3,
			effect: 'add',
			minValue: 15000,
			maxValue: 22000
		},
		{
			chance: 0.15,
			effect: 'add',
			minValue: 25000,
			maxValue: 35000
		},
		{
			chance: 0.13,
			effect: 'add',
			minValue: 40000,
			maxValue: 50000
		},
		{
			chance: 0.02,
			effect: 'powerup',
			value: 'unlockAutoSpin'
		}
	]
};

const crackedPlumbing: Moneybag_t = {
	name: 'Cracked Plumbing',
	lore: "Our rates are fair, our pipes are tight... and yes, we've heard the jokes.",
	icon: EggCracked,
	applicableDemographics: [
		DEM.AGE_MID,
		DEM.AGE_OLD,
		DEM.MONEY_MID,
		DEM.MONEY_RICH,
		DEM.TYPE_SERVICE
	],
	colors: {
		text: 'text-white',
		from: 'from-blue-700',
		via: 'via-blue-800',
		to: 'to-blue-900',
		confetti: ['#1d4ed8', '#1e40af', '#1e3a8a'],
		sparkline: '#3b82f6',
		wheelColors: [
			'oklch(90% 0.1 250)',
			'oklch(75% 0.15 245)',
			'oklch(60% 0.2 240)',
			'oklch(45% 0.18 235)',
			'oklch(30% 0.12 230)'
		]
	},
	market: {
		updateOnMod: 4,
		min: 15000,
		max: 120000,
		target: 50000,
		lineWeight: 0.65,
		absoluteVolatility: 18000
	},
	costToUnlock: 300_000,
	open: [
		{
			chance: 0.35,
			effect: 'add',
			minValue: 10000,
			maxValue: 15000
		},
		{
			chance: 0.3,
			effect: 'add',
			minValue: 20000,
			maxValue: 30000
		},
		{
			chance: 0.2,
			effect: 'add',
			minValue: 35000,
			maxValue: 45000
		},
		{
			chance: 0.13,
			effect: 'add',
			minValue: 50000,
			maxValue: 65000
		},
		{
			chance: 0.02,
			effect: 'powerup',
			value: 'tripleMoney'
		}
	]
};

const theVault: Moneybag_t = {
	name: 'The Vault™',
	lore: "You've finally made it to the ultra-exclusive club. Welcome to the 1% -- may you stay richer than the 99%.",
	icon: IconLock,
	applicableDemographics: [DEM.AGE_MID, DEM.AGE_OLD, DEM.MONEY_RICH, DEM.TYPE_ESTABLISHMENT],
	colors: {
		text: 'text-white',
		from: 'from-gray-900',
		via: 'via-gray-800',
		to: 'to-gray-700',
		confetti: ['#111827', '#1f2937', '#374151'],
		sparkline: '#6b7280',
		wheelColors: [
			'oklch(95% 0.01 260)',
			'oklch(80% 0.02 260)',
			'oklch(65% 0.03 260)',
			'oklch(50% 0.04 260)',
			'oklch(30% 0.05 260)'
		]
	},
	market: {
		updateOnMod: 15,
		min: 40000,
		max: 80000,
		target: 60000,
		lineWeight: 0.2,
		absoluteVolatility: 5000
	},
	costToUnlock: 500_000,
	open: [
		{
			chance: 0.5,
			effect: 'add',
			minValue: 500,
			maxValue: 1000
		},
		{
			chance: 0.3,
			effect: 'add',
			minValue: 2000,
			maxValue: 5000
		},
		{
			chance: 0.15,
			effect: 'add',
			minValue: 8000,
			maxValue: 12000
		},
		{
			chance: 0.045,
			effect: 'add',
			minValue: 30000,
			maxValue: 40000
		},
		{
			chance: 0.005,
			effect: 'powerup',
			value: 'plusWorker'
		}
	]
};

export const moneybags: Moneybag_t[] = [
	dirtPoorLandscaping,
	pruneJuiceInc,
	andersonCactusRemoval,
	floralsByPatricia,
	stronkJim,
	undergroundAirport,
	fauxBrothersJewelry,
	gaslampGalleria,
	elevenPMSnax,
	pawnDome,
	midnightOilPress,
	grandmasAlgorithmicBakery,
	neonRollerRink,
	crackedPlumbing,
	theVault
];
