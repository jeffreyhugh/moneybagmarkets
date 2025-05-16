import type { Moneybag_t } from '../gameState/moneybags';

export const weightedChoice = (
	open: Moneybag_t['open']
): [Moneybag_t['open'][0] | null, number] => {
	const totalWeight = open.reduce((sum, choice) => sum + choice.chance, 0);

	const random = Math.random() * totalWeight;

	let cumulativeWeight = 0;
	const sorted = open.sort((a, b) => a.chance - b.chance);
	for (const choice of sorted) {
		cumulativeWeight += choice.chance;
		if (random < cumulativeWeight) {
			return [choice, random];
		}
	}

	return [null, 0];
};
