import type { Moneybag_t } from '../routes/moneybags';

export const weightedChoice = (
	open: Moneybag_t['open']
): [Moneybag_t['open'][0] | null, number] => {
	// Calculate the total weight
	const totalWeight = open.reduce((sum, choice) => sum + choice.chance, 0);

	// if (totalWeight !== 1) {
	// 	console.error('invalid total weight', open, totalWeight);
	// 	return [null, 0];
	// }

	// Generate a random number between 0 and totalWeight
	const random = Math.random() * totalWeight;

	// Iterate through the choices and find the weighted choice
	let cumulativeWeight = 0;
	const sorted = open.sort((a, b) => a.chance - b.chance);
	for (const choice of sorted) {
		cumulativeWeight += choice.chance;
		if (random < cumulativeWeight) {
			return [choice, random]; // Return the selected choice
		}
	}

	return [null, 0]; // Fallback, should not reach here if totalWeight > 0
};
