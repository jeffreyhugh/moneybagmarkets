export type Moneybag_t = {
	name: string;
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
		name: 'Basic',
		colors: {
			text: 'text-white',
			from: 'from-purple-800',
			to: 'to-purple-800',
			// confetti: ['#6e11b0'],
			confetti: ['transparent'],
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
		costToUnlock: 0,
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
		name: 'Jumpy',
		colors: {
			text: 'text-white',
			from: 'from-purple-800',
			to: 'to-purple-800',
			confetti: ['#6e11b0'],
			sparkline: '#e8e8e8',
			wheelColors: [
				'oklch(90.2% 0.063 306.703)',
				'oklch(71.4% 0.203 305.504)',
				'oklch(55.8% 0.288 302.321)'
			]
		},
		market: {
			updateOnMod: 3,
			min: 50,
			max: 200,
			target: 110,
			lineWeight: 0.5,
			absoluteVolatility: 100
		},
		costToUnlock: 1100,
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
	}
];
