import type { Moneybag_t } from '../routes/moneybags';

export const nextValue = (currentValue: number, moneybag: Moneybag_t) => {
	const midpoint =
		moneybag.market.lineWeight * currentValue +
		(1 - moneybag.market.lineWeight) * moneybag.market.target;

	const sign = Math.random() >= 0.5 ? 1 : -1;
	const amount = Math.random() * moneybag.market.absoluteVolatility;

	return Math.round(
		Math.max(Math.min(midpoint + sign * amount, moneybag.market.max), moneybag.market.min)
	);
};
