import Barbell from '@tabler/icons-svelte/icons/barbell';
import Bottle from '@tabler/icons-svelte/icons/bottle';
import BuildingAirport from '@tabler/icons-svelte/icons/building-airport';
import CactusOff from '@tabler/icons-svelte/icons/cactus-off';
import type Icons from '@tabler/icons-svelte/icons/icons';
import Plant from '@tabler/icons-svelte/icons/plant';
import ShovelPitchforks from '@tabler/icons-svelte/icons/shovel-pitchforks';

export type Powerup_t = ['doubleMoney', 'tripleMoney', 'plusTenMaxMoneybags', 'spinMultiplier'];

export type Moneybag_t = {
	name: string;
	icon?: typeof Icons;
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

export const moneybags: Moneybag_t[] = [
	{
		name: 'Dirt Poor Landscaping',
		icon: ShovelPitchforks,
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
	},
	{
		name: 'Prune Juice, Inc.',
		icon: Bottle,
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
	},
	{
		name: 'Anderson Cactus Removal',
		icon: CactusOff,
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
	},
	{
		name: 'Florals by Patricia',
		icon: Plant,
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
	},
	{
		name: 'Stronk Jim',
		icon: Barbell,
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
	},
	{
		name: 'Underground Airport (KNDR)',
		icon: BuildingAirport,
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
	}
];
