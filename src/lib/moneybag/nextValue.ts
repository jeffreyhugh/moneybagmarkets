import { gameState } from '$lib/gameState/gamestate.svelte';
import type { Demographics_t } from '$lib/gameState/headlines';
import type { Moneybag_t } from '$lib/gameState/moneybags';

export const nextValue = (currentValue: number, moneybag: Moneybag_t) => {
	if (gameState.moneybags[moneybag.name].flashSales > 0) {
		gameState.moneybags[moneybag.name].flashSales -= 1;
		return moneybag.market.min;
	}

	const midpoint =
		moneybag.market.lineWeight * currentValue +
		(1 - moneybag.market.lineWeight) * moneybag.market.target;

	const TMI = totalMarketImpacts(moneybag.applicableDemographics, moneybag.name);

	const eventWeightedMidpoint = midpoint * (1 + TMI);

	const sign = Math.random() >= 0.5 ? 1 : -1;
	const amount = Math.random() * moneybag.market.absoluteVolatility;

	const bonusAmount = amount * TMI;

	return Math.round(
		Math.max(
			Math.min(eventWeightedMidpoint + sign * amount + bonusAmount, moneybag.market.max),
			moneybag.market.min
		)
	);
};

const totalMarketImpacts = (demographics: Demographics_t[], mbName: string) => {
	let impactPercent = 0;

	for (const event of gameState.events) {
		for (const demTarget of event.demographicTargets) {
			if (demographics.includes(demTarget.demographic)) {
				impactPercent += demTarget.effect.value;
			}
		}

		for (const mbTarget of event.moneybagTargets) {
			if (mbTarget.moneybag === mbName) {
				impactPercent += mbTarget.effect.value;
			}
		}
	}

	return impactPercent / 100;
};
