import Bottle from '@tabler/icons-svelte/icons/bottle';
import CactusOff from '@tabler/icons-svelte/icons/cactus-off';
import type Icons from '@tabler/icons-svelte/icons/icons';
import ShovelPitchforks from '@tabler/icons-svelte/icons/shovel-pitchforks';

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
	open: {
		chance: number; // [0, 1]
		effect: 'add';
		value: number;
	}[];
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
				value: 10
			},
			{
				chance: 0.05,
				effect: 'add',
				value: 1000
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
				value: 90
			},
			{
				chance: 0.3,
				effect: 'add',
				value: 120
			},
			{
				chance: 0.2,
				effect: 'add',
				value: 250
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
				value: 300
			},
			{
				chance: 0.3,
				effect: 'add',
				value: 400
			},
			{
				chance: 0.27,
				effect: 'add',
				value: 700
			},
			{
				chance: 0.03,
				effect: 'add',
				value: 9000
			}
		]
	}
];
