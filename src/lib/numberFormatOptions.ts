export const numberFormatOptions: Intl.NumberFormatOptions = {
	notation: 'compact',
	compactDisplay: 'short',
	maximumFractionDigits: 2, // Cap at 2 decimal places
	minimumFractionDigits: 0, // Allow no decimals for whole numbers
	trailingZeroDisplay: 'stripIfInteger'
};
